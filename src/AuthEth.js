import { Button, Heading, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { useState } from 'react';
import { ethers } from 'ethers';


  
export const AuthEth = async () => {
    
    const [walletAddress, setWalletAddress] = useState("");
    const [provider, setProvider] = useState("");
    
    async function requestAccount() {
        console.log('Requesting account...');
    
        // Check if Meta Mask Extension exists 
        if(window.ethereum) {
          console.log('detected');
    
          try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setWalletAddress(accounts[0]);
          } catch (error) {
            console.log('Error connecting...');
          }
    
        } else {
          alert('Meta Mask not detected');
        }
    }
    
    // Create a provider to interact with a smart contract
    async function connectWallet() {
        if(typeof window.ethereum !== 'undefined') {
          await requestAccount();
    
          let thisProvider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(thisProvider);
        }
    }

    return (
        <Stack spacing={6}>
            {/* {authError && (
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
            )} */}
            <Heading mt={6} mb={6} textAlign="center" size="xl"></Heading>

            <Button colorScheme="blue">Authenticate: Ethereum</Button>
            {/* <Text textAlign="center"><em>or</em></Text>
            <SignUp />
            <Text textAlign="center"><em>or</em></Text>
            <Login /> */}
        </Stack>
    )

};
