import { Heading, Button, Stack, HStack, Alert, Spinner, Image, Box, Text, Input } from '@chakra-ui/react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'
import {useContractReads, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi'
import { useEffect, useState } from 'react';
import { FT_ABI, FT_ADDRESS } from "./config"
import { ethers } from 'ethers';
import Iframe from 'react-iframe'
import './iframe.css';
import { SwapWidget, darkTheme } from '@uniswap/widgets/dist/index.js'
import '@uniswap/widgets/dist/fonts.css'


export const TokenBalanceAndClaimWidget = (props) => {
    
    const [userBalance, setUserBalance] = useState(0);
    const [claimableBalance, setClaimableBalance] = useState(0);
    const [updateTxnSuccessState, setUpdateTxnSuccessState] = useState(false);
    const [claimTxnSuccessState, setClaimTxnSuccessState] = useState(false);
    const [sliderValue, setSliderValue] = useState(100)

    const handleChange = (e) => {
        console.log("handleChange entered")
        console.log(`claim value set: ${ethers.utils.parseUnits(((sliderValue*claimableBalance)/100).toString(),18)}`)
        writeClaim({
            recklesslySetUnpreparedArgs: [ethers.utils.parseUnits(((sliderValue*claimableBalance)/100).toString(),18)],
            recklesslySetUnpreparedOverrides: {
                from: props.userAddr,
            }            
        })    
    }

    const tokenBase = 10**18;

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
      }

    // const { config, status } = usePrepareContractWrite({
    //     address: "0xb2c7405ce19de737697f5335EE9B043b3962F1EE",//FT_ADDRESS,
    //     abi: FT_ABI,
    //     functionName: 'initiateClaim',
    //     args: [1000000000],//[claimValue],
    //     overrides: {
    //         from: "0xcee4D01BFb1c75cc8EF255946a996B15e3A2731E",//props.userAddr,
    //     },
    //     enabled: false,

    // })


    const { data: updateData, error: updateError, isError: updateIsError, isIdle: updateIsIdle, write: writeUpdate, isLoading: updateIsLoading } = useContractWrite({
        mode: 'recklesslyUnprepared',
        functionName: 'updateClaimableBalance',     
        address: FT_ADDRESS,
        abi: FT_ABI,
        enabled: false 
    })


    const {isSuccess: waitUpdateIsSuccess, isLoading: waitUpdateIsLoading, isFetching: updateIsFetching, refetch: refetchUpdate} = useWaitForTransaction({
        confirmations: 2,
        hash: updateData?.hash,
        onSuccess(){
            setUpdateTxnSuccessState(true);
        }
    })

    
    const { data: claimData, error: claimError, isError: claimIsError, isIdle: claimIsIdle, write: writeClaim, isLoading: claimIsLoading } = useContractWrite({
        mode: 'recklesslyUnprepared', //lol yes i am
        functionName: 'claimTokens',     
        address: FT_ADDRESS,
        abi: FT_ABI,
        enabled: false 
    })


    const {isSuccess: waitClaimIsSuccess, isLoading: waitClaimIsLoading, isFetching: claimIsFetching, refetch: refetchClaim} = useWaitForTransaction({
        confirmations: 2,
        hash: claimData?.hash,
        onSuccess(){
            setClaimTxnSuccessState(true);
        }
    })



    useContractReads({
        contracts: [
            {
                address: FT_ADDRESS,
                abi: FT_ABI,
                functionName: 'balanceOf',
                args: [props.userAddr],
            },
            {
                address: FT_ADDRESS,
                abi: FT_ABI,
                functionName: 'userClaimableBalance',
                args: [props.userAddr],
            },
        ],
        watch: true,
        cacheOnBlock: true,
        cacheTime: 2_000,
        enabled: true,
        onSuccess(data){
            console.log(`message`)
            setUserBalance(parseInt(data[0]._hex,16)/tokenBase);
            setClaimableBalance(parseInt(data[1]._hex,16)/tokenBase);
        
        },
        onError(data){
            console.log(`message`)
        }
    })

    const disabledConds = !writeUpdate || updateIsLoading || waitUpdateIsLoading || updateIsFetching || !writeClaim || claimIsLoading || waitClaimIsLoading || claimIsFetching
    const isLoadingConds = updateIsLoading||waitUpdateIsLoading||updateIsFetching || claimIsLoading||waitClaimIsLoading||claimIsFetching
    const UNISWAP_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
    const jsonRpcUrlMap = { 
        5: ['https://goerli.infura.io/v3/f45ec1b38a7941229ee4ee8a49bf4e1c']
    }
    return(
        <Stack spacing={6} direction='row'>
            <Box p={5} shadow='md' borderWidth='1px'>
                <Stack spacing={6}>
                    
                    <Heading size='md'>
                        Claimable Balance: {claimableBalance.toFixed(2)}
                    </Heading>
                    
                    <Box pt={6} pb={2}>
                        <Slider aria-label='slider-ex-6' defaultValue={100} onChange={(val) => setSliderValue(val)}>
                            <SliderMark value={25} {...labelStyles}>
                            25%
                            </SliderMark>
                            <SliderMark value={50} {...labelStyles}>
                            50%
                            </SliderMark>
                            <SliderMark value={75} {...labelStyles}>
                            75%
                            </SliderMark>
                            <SliderMark
                            value={sliderValue}
                            textAlign='center'
                            // color='white'
                            mt='-10'
                            ml='-5'
                            w='12'
                            >
                            {((sliderValue*claimableBalance)/100).toFixed(2)}
                            </SliderMark>
                            <SliderTrack>
                            <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box>
                    <Heading size='sm'>% of Balance to Claim</Heading>


                    <Button disabled={disabledConds} isLoading={isLoadingConds} loadingText='Processing Claim...' onClick={handleChange}>
                        Transfer Selected Balance to Wallet
                    </Button> 

                    <Button disabled={disabledConds} isLoading={isLoadingConds} loadingText='Updating Claimable Balance...' onClick={() => writeUpdate({
                        recklesslySetUnpreparedOverrides: {
                            from: props.userAddr,
                        }
                    })}>Update Claimable Balance (~10 min)</Button> 
                        

                </Stack>
            </Box> 

            <Box p={5} shadow='md' borderWidth='1px'>
                <Stack spacing={6}>
                    <Heading size='md'>
                        Wallet Balance: {userBalance.toFixed(2)}
                    </Heading>  
                    <Box>
                        <SwapWidget
                            theme={darkTheme}
                            jsonRpcUrlMap={jsonRpcUrlMap}
                            // provider={ethers}
                            tokenList={UNISWAP_TOKEN_LIST}
                            defaultInputTokenAddress={'NATIVE'}
                            defaultInputAmount={0.08}
                            defaultOutputTokenAddress={'0xcCe44eA800266AA0562eA54da087c7b90a31eCB1'}
                        />
                        <Iframe
                            class="scaled-frame"
                            src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=0.08&inputCurrency=ETH&outputCurrency=0xcCe44eA800266AA0562eA54da087c7b90a31eCB1"
                            height="660px"
                            width="500px"
                            border="10px"
                            style="
                            border: 0;
                            margin: 0 auto;
                            margin-bottom: .5rem;
                            display: block;
                            border-radius: 10px;
                            max-width: 960px;
                            min-width: 300px;
                            "

                        />
                    </Box> 
                    {/* <Button>Trade on Uniswap</Button>
                    <Button>Trade on SushiSwap</Button>
                    <Button>View on Etherscan</Button>
                    <Button>GFC Marketplace</Button> */}
                </Stack>
            </Box>       
        </Stack>
    )

}