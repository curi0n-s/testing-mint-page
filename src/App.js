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
  Image
} from '@chakra-ui/react'

//locals
import logo from './pendings.png'
import { NFT_ADDRESS, NFT_ABI, NFT_CHAINID } from './config.js'


function App() {

  let [amountMinted, setAmountMinted] = useState(0);
  let [mintSuccess, setMintSuccess] = useState(false);
  let [isMinting, setIsMinting] = useState(false);
  const buttonBg = useColorModeValue("rgb(255, 255, 255)","rgb(255, 255, 255)")
  const buttonText = useColorModeValue("rgb(3, 3, 3)","rgb(3, 3, 3)")

  const { colorMode, toggleColorMode } = useColorMode()
  useEffect(() => {
    if(colorMode === "light"){
      toggleColorMode()
    }
  }, [])


  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { address, connector, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const { chain } = useNetwork();
  const { chains, error: switchNetworkError, isLoading: switchNetworkIsLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  const handleInitiateClaim = (e) => {
      console.log("handleInitiateClaim entered")
      e.preventDefault();
      if(chain.chainId !== NFT_CHAINID){
          switchNetwork(NFT_CHAINID)
      }

      writeClaim({
          recklesslySetUnpreparedOverrides: {
              from: address,
          }            
      })    
  }


  const { data: claimData, error: claimError, isError: claimIsError, isIdle: claimIsIdle, write: writeClaim, isLoading: claimIsLoading } = useContractWrite({
      mode: 'recklesslyUnprepared', //lol yes i am
      functionName: 'mint',     
      address: NFT_ADDRESS,
      abi: NFT_ABI,
      enabled: false, 
      chainId: NFT_CHAINID,
  })

  const {isSuccess: waitClaimIsSuccess, isLoading: waitClaimIsLoading, isFetching: claimIsFetching, refetch: refetchClaim} = useWaitForTransaction({
      confirmations: 2,
      hash: claimData?.hash,
      onSuccess(){
          setMintSuccess(true);
      }
  })

  useContractReads({
    contracts: [
        {
            address: NFT_ADDRESS,
            abi: NFT_ABI,
            functionName: 'getAmountMinted',
            args: [address],
        },
    ],
    watch: true,
    cacheOnBlock: true,
    cacheTime: 2_000,
    enabled: true,
    onSuccess(data){
        console.log(`message`)
        setAmountMinted(parseInt(data[0]._hex,16));        
    },
    onError(data){
        console.log(`message`)
    }
  })

  //===========================================================================
  // RENDERING
  //===========================================================================


  return (
    <Stack spacing={6} align="center"> 
     
        <Image mt={"20px"} align="center" width="80%" src={logo} />
    

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
            <Image 
              maxW={{ base: '100%', sm: '300px' }}
              align={"center"} 
              src={"https://media3.giphy.com/media/tA4R6biK5nlBVXeR7w/giphy.gif?cid=790b76116355b815c67362ecb970a6e3ece310cd16f384ae&rid=giphy.gif&ct=g"}
              borderRadius="20px"
            />
            
              <Text align={"center"} fontSize="lg" fontWeight="bold">It all started with a pending transaction.</Text>
              <Text align={"center"} fontSize="lg" fontWeight="bold">A force of energy that began our journey from an idea to an empire.</Text>
              <Text align={"center"} fontSize="lg" fontWeight="bold">Energy moves from one peer to another.</Text>
              <Text align={"center"} fontSize="lg" fontWeight="bold">Degenerates dance around the endless spiral of greed and fear.</Text>
              <Box >   
                <Text align={"center"} mt={"20px"} fontSize="lg" fontWeight="bold">Mint Price: 0.02 ETH</Text>           
                <Text align={"center"} mt={"10px"} mb={"20px"} fontSize="lg" fontWeight="bold">Amount Minted: {amountMinted}</Text>
              </Box>
              {!isConnected ?

                connectors.map((connector) => (
                    <Button
                      width={133}
                      disabled={false}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      bgColor={buttonBg}
                    >
                      Connect
                    </Button>
                  )) :

                  connectors.map((connector) => (
                    <Button
                      width={133}
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => handleInitiateClaim()}
                      bgColor={buttonBg}
                      textColor={buttonText}
                    >
                      { mintSuccess ? (isMinting ? <Spinner /> : "Success!") : "Mint" }
                    </Button>
                  ))
                
                }
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

