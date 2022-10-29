import { Button, Stack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/layout'
import { AuthEth } from './AuthEth';
import { EmailInterface2 } from './EmailInterface2';

import { Canvas } from '@react-three/fiber';
import styled from "styled-components";
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import logo from './gfclogo.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {ethers} from 'ethers';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function App() {
  
  // add persistent authentication later
  const oneTimeLinkURL = `https://php-url-request.herokuapp.com/web/index.php`
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [linkButtonIsClicked, setLinkButtonIsClicked] = useState(false);
  const [emailButtonIsClicked, setEmailButtonIsClicked] = useState(false); 
  const [authdUser, setAuthdUser] = useState("");

 console.log(`IS AUTHENTICATED?: ${isAuthenticated}`)
  useAccount({
    onDisconnect(){
      setIsAuthenticated(false);
    }
  })
  const { disconnect } = useDisconnect()

  let address = "test"

  //===========================================================================
  // RENDERING
  //===========================================================================

  if(isAuthenticated){

    const handleClickSingleUseLink = (e) => {
      e.preventDefault();
      setLinkButtonIsClicked(true);
      axios.get( oneTimeLinkURL )
      .then( (response) => { window.open(response.data); } ); 
    }

    const handleClickEmailLink = (e) => {
      e.preventDefault();
      setEmailButtonIsClicked(true);
    }

    const handleBackFromEmail = (e) => {
      e.preventDefault();
      setEmailButtonIsClicked(false);
    }

    const handleBackFromLink = (e) => {
      e.preventDefault();
      setLinkButtonIsClicked(false);
    }

    if(linkButtonIsClicked){      
      return(
      <Stack spacing={6} align="center">  
        <a href="#" id="logo" onclick="document.location.href;return false;" >
          <img src={logo} alt="logo" height="100" width="100" />
        </a>
        
        <Heading mt={6} mb={6} textAlign="center" size="2xl">Member Dashboard</Heading>  
        <Heading mt={6} mb={6} textAlign="center" size="xl">Single-Use Link Utilized</Heading>   

        <Button onClick={handleBackFromLink}>Back</Button>
        {/* <Button onClick={() => disconnect()}>Disconnect</Button> */}

    
      </Stack>
      )
    } else if(emailButtonIsClicked) {
      return(
        <Stack spacing={6} align="center">  
        <a href="#" id="logo" onclick="document.location.reload;return false;" >
          <img src={logo} alt="logo" height="100" width="100" />
        </a>          
        <Heading mt={6} mb={6} textAlign="center" size="2xl">Member Dashboard</Heading>         
          <EmailInterface2 userAddress={authdUser}/>
          <Button onClick={handleBackFromEmail}>Back</Button>
          {/* <Button onClick={() => disconnect()}>Disconnect</Button> */}
          <Wrapper className="app">
          <Canvas className="canvas" height="500px">
            <OrbitControls enableZoom={false}/>
            <ambientLight intensity={0.6} />
            <directionalLight position={[-2,5,2]} intensity={1} />
            {/* <Model /> */}
          </Canvas>
        </Wrapper>  
        </Stack>
      )
    } else {
      return(
        <Stack spacing={6} align="center">  
          <a href="#" id="logo" onclick="document.location.href;return false;" >
            <img src={logo} alt="logo" height="100" width="100" />
          </a>          
          <Heading mt={6} mb={6} textAlign="center" size="2xl">Member Dashboard</Heading>

          {/* <GetMemoURL /> */}
          
          <Button onClick={handleClickSingleUseLink}>Partner Company 1 (Single-Use Link)</Button>
          <Button onClick={handleClickEmailLink}>Partner Company 2 (Email Form)</Button>

          <Button onClick={() => disconnect()}>Disconnect</Button>
          <Wrapper className="app">
          <Canvas className="canvas" height="500px">
            <OrbitControls enableZoom={false}/>
            <ambientLight intensity={0.6} />
            <directionalLight position={[-2,5,2]} intensity={1} />
            {/* <Model /> */}
          </Canvas>
        </Wrapper>  
        </Stack>
      )
    }
  }


  return (
    <Stack spacing={6} align="center"> 
      <a href="#" id="logo" onclick="document.location.href;return false;" >
        <img src={logo} alt="logo" height="100" width="100" />
      </a>      
      <Heading mt={6} mb={6} textAlign="center" size="2xl">Member Dashboard</Heading>
      <Heading mt={6} mb={6} textAlign="center" size="xl">Connect to Authenticate</Heading>
      <AuthEth setAuthenticatedUser={setAuthdUser} sendData={setIsAuthenticated}/>
      <Wrapper className="app">
        <Canvas className="canvas" height="500px">
          <OrbitControls enableZoom={false}/>
          <ambientLight intensity={0.6} />
          <directionalLight position={[-2,5,2]} intensity={1} />
          <Model />
        </Canvas>
      </Wrapper>
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
