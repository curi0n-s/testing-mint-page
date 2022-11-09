import { Heading, Button, Stack, HStack, Alert, Spinner, Image, Box, Text, Input } from '@chakra-ui/react'
import {useContractReads, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi'
import { useEffect, useState } from 'react';
import { FT_ABI, FT_ADDRESS } from "./config"
import { ethers } from 'ethers';

export const TokenBalanceAndClaimWidget = (props) => {
    
    const [userBalance, setUserBalance] = useState(0);
    const [claimableBalance, setClaimableBalance] = useState(0);
    const [txnSuccessState, setTxnSuccessState] = useState(false);
    const [claimValue, setClaimValue] = useState('');
    const handleChange = (event) => {
        setClaimValue(event.target.value)
    }
    const tokenBase = 10**18;

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

    useEffect(()=>{

    },[])

    const { data, error, isError, isIdle, write, isLoading } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: '0xb2c7405ce19de737697f5335EE9B043b3962F1EE',//FT_ADDRESS,
        abi: FT_ABI,
        functionName: 'mintERC20',     
        enabled: false 
    })


    const {isSuccess, isLoading: waitIsLoading, isFetching, refetch} = useWaitForTransaction({
        confirmations: 2,
        hash: data?.hash,
        onSuccess(){
            setTxnSuccessState(true);
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
            setClaimableBalance(parseInt(data[1]._hex,16));
        
        },
        onError(data){
            console.log(`message`)
        }
    })


    return(
        <Stack spacing={6} direction='row'>
                <Box p={5} shadow='md' borderWidth='1px'>
                    <Stack spacing={6}>
                        <Heading size='md'>
                            Wallet Balance: {userBalance}
                        </Heading>   
                        <Button>Trade on Uniswap</Button>
                        <Button>GFC Marketplace</Button>
                    </Stack>
                </Box>
                
                <Box p={5} shadow='md' borderWidth='1px'>
                    <Stack spacing={6}>
                        <Heading size='md'>
                            Claimable Balance: {claimableBalance}
                        </Heading>
                        <>
                        <Input
                            value={claimValue}
                            onChange={handleChange}
                            placeholder='Number of Tokens to Claim'
                            size='sm'
                        />
                        </>
                        {!isSuccess ? <Button disabled={!write || isLoading || waitIsLoading || isFetching} isLoading={isLoading||waitIsLoading||isFetching} loadingText='Updating Claimable Balance' onClick={() => write({
                            recklesslySetUnpreparedArgs: [(props.userAddr).toString(), ethers.utils.parseUnits(claimValue,18)],
                            recklesslySetUnpreparedOverrides: {
                              from: props.userAddr,
                            }
                            })}>Update Claimable Balance (~10 min)</Button> : <Button colorScheme={'green'} >Claim Successful!</Button>
                        } 
                        <Button>Transfer Claimable Balance to Wallet</Button> 
                    </Stack>
                </Box>        
        </Stack>
    )

}