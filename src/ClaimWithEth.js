import { useMoralis, useWeb3Contract } from 'react-moralis'
import { Button, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Input, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { userInfo } from 'os';
import { nftAddress, nftAbi } from './contract';

import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);


const sampleMessage = "hellow orld";
const sampleBytes32 = "0x5a3e2966b720560e58d08f22ed048ec485564612d062e928a78b085c328e52d1";

async function claimNft(user, isAuthenticated) {
    if(isAuthenticated){
        try {    
            const contract = new web3.eth.Contract(nftAbi, nftAddress);
            console.log(`contract: ${contract}`);
            const response = await contract.methods
                .altoid(sampleMessage, sampleBytes32)
                .send({
                    to: nftAddress,
                    from: user.get("ethAddress"), 
                    value: "3000000000000000"
                });
            console.log(response);
            const tokenId = response.events.Transfer.returnValues.tokenId;
        } catch {
            alert("Error");
        }
    } else {
        alert("Login first!");
    }
}

export const ClaimWithEth = () => {
    const { authenticate, isAuthenticated, isAuthenticating, authError, user } = useMoralis();
    console.log(`isAuthenticated: ${isAuthenticated}`);
    console.log(`user: ${user.get("ethAddress")}`);

    return (
        <Stack spacing={6}>
            {authError && (
                <Alert
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='130px'
                >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Authentication has Failed
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    {authError.message}
                </AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
            )}
            {(user.get("ethAddress")==undefined) ? <Button colorScheme="orange" isLoading={isAuthenticating} onClick={ () => authenticate({ type: 'eth', signingMessage:"Global Fit Club NFT Claim" }) }>Authenticate: Ethereum</Button> : <Button colorScheme="orange" onClick={ () => claimNft(user,isAuthenticated) }>Claim NFT</Button>}

        </Stack>
    )

};

// const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract({
//     abi: nftAbi,
//     contractAddress: nftAddress,
//     functionName: "altoid",
//     params: {
//         payableAmount: "3000000000000000",
//         _message: "hello", 
//         _finalHash: "0x5a3e2966b720560e58d08f22ed048ec485564612d062e928a78b085c328e52d1"
//     }
// })