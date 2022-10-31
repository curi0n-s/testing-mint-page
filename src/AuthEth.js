import { Button, Stack, Alert, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import {
  useAccount,
  useConnect
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CheckBalanceWrapper } from './CheckBalanceWrapper';

export const AuthEth = (props) => {
  
  const [isHookActive, setIsHookActive] = useState(false);
  const [userSilverBalance, setUserSilverBalance] = useState(0);
  const [userGoldBalance, setUserGoldBalance] = useState(0);
  const [balanceHasBeenUpdated, setBalanceHasBeenUpdated] = useState(false);
    
  console.log(`Balance has been updated (Silver, Gold): ${balanceHasBeenUpdated}, ${userSilverBalance}, ${userGoldBalance}`)


  const {address, isConnected} = useAccount({
    onConnect(){
      //await balance of GFC NFT
      setIsHookActive(true);
    }
  })

  useEffect(()=>{
    // console.log(`USER BALANCE: ${userBalance}`)
    if(userSilverBalance>0 || userGoldBalance>0){
      // console.log("user balance greater than 0")
      props.sendData(true); 
      props.setAuthenticatedUser(address);
      
      // setIsHookActive(false);
    } else{      
      props.sendData(false); 
;     console.log("no balance")}
  },[balanceHasBeenUpdated])
  
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  })



  return (
      <Stack spacing={6} align={"center"}>
          {isConnected && isHookActive && <CheckBalanceWrapper userAddress={address} setUserSilverBalance={setUserSilverBalance} setUserGoldBalance={setUserGoldBalance} balanceHasBeenUpdated={setBalanceHasBeenUpdated} />}
          <Button colorScheme="blue" onClick={() => {connect()}}>Authenticate: Ethereum</Button>
          {isLoading && <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                          />
          }
          {(balanceHasBeenUpdated&&userSilverBalance===0&&userGoldBalance===0) && <Alert mt={6} mb={6} textAlign="center" size="xl">Unable to Authenticate!</Alert> }

      </Stack>

  )

};
