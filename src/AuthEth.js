import { Button, Heading, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useContractRead 
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CheckBalanceWrapper } from './CheckBalanceWrapper';

export const AuthEth = (props) => {
  
  const [isHookActive, setIsHookActive] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [balanceHasBeenUpdated, setBalanceHasBeenUpdated] = useState(false);
    
  console.log(`Balance has been updated: ${balanceHasBeenUpdated}`)


  const {address, isConnected} = useAccount({
    onConnect(){
      //await balance of GFC NFT
      setIsHookActive(true);
    }
  })

  useEffect(()=>{
    // console.log(`USER BALANCE: ${userBalance}`)
    if(userBalance>0){
      // console.log("user balance greater than 0")
      props.sendData(true); 
      props.setAuthenticatedUser(address);
      // setIsHookActive(false);
    } else{      
      props.sendData(false); 
;     console.log("no balance")}
  },[balanceHasBeenUpdated])
  
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector(),
  })



  return (
      <Stack spacing={6}>
          {/* <Heading mt={6} mb={6} textAlign="center" size="xl"></Heading> */}
          
          {isConnected && isHookActive && <CheckBalanceWrapper userAddress={address} setUserBalance={setUserBalance} balanceHasBeenUpdated={setBalanceHasBeenUpdated} />}

          <Button colorScheme="blue" onClick={() => connect()}>Authenticate: Ethereum</Button>

      </Stack>
  )

};
