import { Button, Stack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/layout'
import styled from "styled-components";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { 
  useConnect, 
  useAccount, 
  useEnsName, 
  useEnsAvatar, 
  useDisconnect, 
  useSwitchNetwork, 
  useContractReads, 
  useContractWrite,
  useWaitForTransaction,
  useNetwork
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Text, 
  useColorMode,
  Box,
  Flex,
  useColorModeValue ,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

//locals
import { ENDPOINT, NFT_ADDRESS, NFT_ABI, NFT_CHAINID } from './config.js'


function App() {

  let [amountMinted, setAmountMinted] = useState(0);
  let [mintSuccess, setMintSuccess] = useState(false);
  let [isMinting, setIsMinting] = useState(false);
  let [mintQuantity, setMintQuantity] = useState(1);
  let [mintPriceInWei, setMintPriceInWei] = useState("69420000000000000");
  let [mintPriceInEther, setMintPriceInEther] = useState("0.069420");
  let [displayEthPrice, setDisplayEthPrice] = useState(0.069420);
  let [thisLeaf, setThisLeaf] = useState(0);
  let [thisProof, setThisProof] = useState(0);
  let [thisIsOnWL, setThisIsOnWL] = useState(false);
  let [errorText, setErrorText] = useState("");

  const buttonBg = useColorModeValue("rgb(255, 255, 255)","rgb(255, 255, 255)")
  const buttonText = useColorModeValue("rgb(3, 3, 3)","rgb(3, 3, 3)")

  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    if(colorMode === "light"){
      toggleColorMode()
    }
  }, [])

  useEffect(()=>{   
    //prevent default
    fetch(ENDPOINT+'whitelistCheck/'+address)
        .then(response1 => response1.json())
        .then(response1 => {
            console.log("response1: ", response1)
            console.log("typeof response1:" , typeof response1.verdict)
            setThisIsOnWL(response1.verdict);
            if(response1.verdict){
                fetch(ENDPOINT+'merkleStuff/'+address)
                .then(response2 => response2.json())
                .then(response2 => {
                    console.log("response2: ", response2)
                    setThisLeaf(response2.leaf);
                    setThisProof(response2.proof);
                })   
            }
        })    
        .catch(err => console.error(err));
  },[])

  useEffect(()=>{    
    console.log("address changed")
      fetch(ENDPOINT+'whitelistCheck/'+address)
          .then(response1 => response1.json())
          .then(response1 => {
              console.log("response1: ", response1)
              console.log("typeof response1:" , typeof response1.verdict)
              setThisIsOnWL(response1.verdict);
              if(response1.verdict){
                  fetch(ENDPOINT+'merkleStuff/'+address)
                  .then(response2 => response2.json())
                  .then(response2 => {
                      console.log("response2: ", response2.proof)
                      setThisLeaf(response2.leaf);
                      setThisProof(response2.proof);
                  })   
              }
          })    
          .catch(err => console.error(err));
  },[address])


  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { address, connector, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const { chain } = useNetwork();
  const { chains, error: switchNetworkError, isLoading: switchNetworkIsLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  const handleInitiateClaim = (e) => {
      console.log("handleInitiateClaim entered")
      // e.preventDefault();
      if(chain.chainId !== NFT_CHAINID){
          switchNetwork(NFT_CHAINID)
      }

      writeClaim({
          recklesslySetUnpreparedOverrides: {
              from: address,
              value: mintPriceInWei,
          }            
      })    
  }

  const handleInitiateWhitelistMint = (e) => {
    console.log("handleWhitelistMint entered")
    e.preventDefault();
    if(chain.chainId !== NFT_CHAINID){
        switchNetwork(NFT_CHAINID)
    }
    writeClaimWL({
        recklesslySetUnpreparedOverrides: {
            from: address,
            value: mintPriceInWei,
            // args: [1,1],
        }            
    })    
}

  const handleMintQuantityChange = (value) => {
      setMintQuantity(value);
      setDisplayEthPrice((value * mintPriceInEther).toFixed(3));
  }

  const { data: claimData, error: claimError, isError: claimIsError, isIdle: claimIsIdle, write: writeClaim, isLoading: claimIsLoading } = useContractWrite({
      mode: 'recklesslyUnprepared', //lol yes i am
      functionName: 'mintPublic',   
      args: [],  
      address: NFT_ADDRESS,
      abi: NFT_ABI,
      enabled: false, 
      chainId: NFT_CHAINID,
      onError(error){
        console.log("error: ", error)
        setErrorText(`Public: ${error.error.message}`)
      }
  })

  const {isSuccess: waitClaimIsSuccess, isLoading: waitClaimIsLoading, isFetching: claimIsFetching, refetch: refetchClaim} = useWaitForTransaction({
      confirmations: 2,
      hash: claimData?.hash,
      onSuccess(){
          setMintSuccess(true);
      }
  })

  //merkle mint
  const { data: claimDataWL, error: claimErrorWL, isError: claimIsErrorWL, isIdle: claimIsIdleWL, write: writeClaimWL, isLoading: claimIsLoadingWL } = useContractWrite({
    mode: 'recklesslyUnprepared', //lol yes i am
    functionName: 'mintWhitelist',     
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    enabled: false, 
    chainId: NFT_CHAINID,
    args: [thisProof, thisLeaf],
    onError(error){
        console.log("error: ", error)
        setErrorText(`You're likely not on the whitelist or have minted your limit.`)
    }
  })

  useContractReads({
    contracts: [
        {
            address: NFT_ADDRESS,
            abi: NFT_ABI,
            functionName: 'getTotalMintedSoFar',
            args: [],
        },
        {
          address: NFT_ADDRESS,
          abi: NFT_ABI,
          functionName: 'publicMintPrice',
          args: [],
        },
    ],
    // watch: true,
    enabled: true,
    onSuccess(data){
        setAmountMinted(parseInt(data[0]._hex,16));     
        let data1 = parseInt(data[1]._hex,16);
        setMintPriceInWei(data1.toString());
        setMintPriceInEther(ethers.utils.formatEther ((parseInt(data[1]._hex,16)).toString())); 
        setDisplayEthPrice((mintQuantity * ethers.utils.formatEther ((parseInt(data[1]._hex,16)).toString())).toFixed(4));
        console.log(`mintprice in wei: ${mintPriceInWei}`)       
        console.log(`mintprice in ether: ${mintPriceInEther}`)       
    },
    onError(data){
        console.log(data.message)
        setErrorText(data.message);
    }
  })

  //===========================================================================
  // RENDERING
  //===========================================================================


  return (
    <Stack spacing={6} align="center"> 
     
        <Text mt={"40px"} fontSize="72px" fontWeight="bold" textAlign="center" color="white">Mint Test Page</Text>

      <Heading mt={6} mb={6} textAlign="center" size="md">
      </Heading>
      <Box>
        <Card 
          align="center" 
          direction={{ base: 'column', sm: 'column' }}
          overflow='hidden'
          variant='outline'
          borderRadius='20px'
          maxW={{ base: '60%', sm: '800px' }}
          >
          <CardBody>
            <Stack mt={"20px"} align='center'>

              <Box >   
                <Text align={"center"} mt={"20px"} fontSize="lg" fontWeight="bold">Mint Price: {mintPriceInEther} ETH</Text>           
                <Text align={"center"} mt={"10px"} mb={"20px"} fontSize="lg" fontWeight="bold">Amount Minted: {amountMinted} / N</Text>
              </Box>

              {!isConnected ?

                connectors.map((connector) => (
                    <Button
                      width={300}
                      disabled={false}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      bgColor={buttonBg}
                      textColor={buttonText}
                    >
                      Connect
                    </Button>
                  )) :

                  connectors.map((connector) => (
                    <><Button
                      width={300}
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={handleInitiateClaim}
                      bgColor={buttonBg}
                      textColor={buttonText}
                    >
                      { mintSuccess ? (isMinting ? <Spinner /> : "Success!") : `Mint ${mintQuantity} for ${mintPriceInEther} ETH` }
                    </Button>

                    <Button
                      width={300}
                      disabled={!connector.ready}
                      key={connector.id+1}
                      onClick={handleInitiateWhitelistMint}
                      bgColor={buttonBg}
                      textColor={buttonText}
                    >
                      { mintSuccess ? (isMinting ? <Spinner /> : "Success!") : `Whitelist Mint ${mintQuantity} for ${mintPriceInEther} ETH` }
                    </Button></>

                  ))
                
                }
                <Text align={"center"} mt={"20px"} color="tomato" fontSize="lg" fontWeight="bold">{errorText}</Text>
            </Stack>
          </CardBody>  
        </Card>

      </Box>
      {/* <footer>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </footer> */}
    {/* <Heading mt={6} mb={6} textAlign="center" size="sm">TOS Link Here</Heading>           */}

    </Stack>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;

  canvas {
    height: 500px;
  }
`;

