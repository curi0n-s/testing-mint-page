import { Button, Heading, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { useState } from 'react';
import { ethers } from 'ethers';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

  
export const AuthEth = () => {
    
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({connector: new InjectedConnector()})


  return (
      <Stack spacing={6}>
          <Heading mt={6} mb={6} textAlign="center" size="xl"></Heading>

          <Button colorScheme="blue" onClick={() => connect()}>Authenticate: Ethereum</Button>

      </Stack>
  )

};
