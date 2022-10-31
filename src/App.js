import { Button, Stack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/layout'
import { Canvas } from '@react-three/fiber';
import styled from "styled-components";
import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

//locals
import { TEMPORARY_URL_REQUEST } from "./config"
import { AuthEth } from './AuthEth';
import { EmailInterface } from './EmailInterface';
import Model from './Model';
import logo from './gfclogo.png'
import { OneTimeLinkConfirmation } from "./OneTimeLinkConfirmation";
import { PartnerList } from "./PartnerList";


function App() {
  
  const [csvData, setCsvData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authdUser, setAuthdUser] = useState("");

  const [partnerButtonWasClicked, setPartnerButtonWasClicked] = useState(false);

  const [linkButtonIsClicked, setLinkButtonIsClicked] = useState(false);
  const [emailButtonIsClicked, setEmailButtonIsClicked] = useState(false); 
  
  useAccount({
    onDisconnect(){
      setIsAuthenticated(false);
    }
  })

  const { disconnect } = useDisconnect()

  //===========================================================================
  // RENDERING
  //===========================================================================

  if(isAuthenticated){

    const handleClickSingleUseLink = (e) => {
      e.preventDefault();
      setLinkButtonIsClicked(true);
      axios.get( TEMPORARY_URL_REQUEST )
      .then( (response) => { window.open(response.data); } ); 
    }

    const handleClickEmailLink = (e) => {
      e.preventDefault();
      setEmailButtonIsClicked(true);
    }

    const handlePartnerClick = (e) => {
      e.preventDefault();
      setPartnerButtonWasClicked(true);
    }

    const handleBackFromEmail = (e) => {
      e.preventDefault();
      setEmailButtonIsClicked(false);
    }

    // const handleBackFromLink = (e) => {
    //   e.preventDefault();
    //   setLinkButtonIsClicked(false);
    // }

    if(linkButtonIsClicked){      
      return(
        <OneTimeLinkConfirmation setLinkButtonIsClicked={setLinkButtonIsClicked}/>
      )
    } else if(emailButtonIsClicked) {
      return(
        <Stack spacing={6} align="center">  
        <a href="#" id="logo" onclick="document.location.reload;return false;" >
          <img src={logo} alt="logo" height="100" width="100" />
        </a>          
        <Heading mt={6} mb={6} textAlign="center" size="2xl">Member Dashboard</Heading>         
          <EmailInterface userAddress={authdUser}/>
          <Button onClick={handleBackFromEmail}>Back</Button>
          <Wrapper className="app">
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
          
          <PartnerList handlePartnerClick={handlePartnerClick}/>         

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
      {/* <Heading mt={6} mb={6} textAlign="center" size="xl">Connect to Authenticate</Heading> */}
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

