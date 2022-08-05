import { useMoralis } from 'react-moralis'
import { Button, Stack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/layout'
import { AuthEth } from './AuthEth';
import { GetMemoURL } from './GetSingleUseLink';
import { EmailInterface } from './EmailInterface';
import { EmailInterface2 } from './EmailInterface2';

import { Canvas } from '@react-three/fiber';
import styled from "styled-components";
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import logo from './gfclogo.png'
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  
  const { isAuthenticated, logout } = useMoralis();
  const [linkButtonIsClicked, setLinkButtonIsClicked] = useState(false);
  const [emailButtonIsClicked, setEmailButtonIsClicked] = useState(false);

  if(isAuthenticated){

    // const contract = new Web3.eth.Contract(nftAbi, nftAddress);
    // const response = await contract.methods.altoid().send();

    const handleClickSingleUseLink = (e) => {
      e.preventDefault();
      setLinkButtonIsClicked(true);
      axios.get( `https://php-url-request.herokuapp.com/web/index.php` )
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
      <Stack spacing={3} align="center">  
        <a href="#" id="logo" onclick="document.location.href;return false;" >
          <img src={logo} alt="logo" height="100" width="100" />
        </a>
        
        <Heading mt={6} mb={6} textAlign="center" size="2xl">Global Fit Club Holder Dashboard</Heading>  
        <Heading mt={6} mb={6} textAlign="center" size="xl">Single-Use Link Utilized</Heading>   

        <Button onClick={handleBackFromLink}>Back</Button>
        <Button onClick={() => logout()}>Logout</Button>

    
      </Stack>
      )
    } else if(emailButtonIsClicked) {
      return(
        <Stack spacing={3} align="center">  
        <a href="#" id="logo" onclick="document.location.reload;return false;" >
          <img src={logo} alt="logo" height="100" width="100" />
        </a>          
        <Heading mt={6} mb={6} textAlign="center" size="2xl">Global Fit Club Holder Dashboard</Heading>
          {/* <GetMemoURL /> */}
          
          <EmailInterface2 />
          
          <Button onClick={handleBackFromEmail}>Back</Button>

          <Button onClick={() => logout()}>Logout</Button>


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
        <Stack spacing={3} align="center">  
          <a href="#" id="logo" onclick="document.location.href;return false;" >
            <img src={logo} alt="logo" height="100" width="100" />
          </a>          
          <Heading mt={6} mb={6} textAlign="center" size="2xl">Global Fit Club Holder Dashboard</Heading>
          {/* <GetMemoURL /> */}
          
          <Button onClick={handleClickSingleUseLink}>Partner Company 1 (Single-Use Link)</Button>
          <Button onClick={handleClickEmailLink}>Partner Company 2 (Email Form)</Button>

          <Button onClick={() => logout()}>Logout</Button>
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
    <Stack spacing={3} align="center"> 
      <a href="#" id="logo" onclick="document.location.href;return false;" >
        <img src={logo} alt="logo" height="100" width="100" />
      </a>      
      <Heading mt={6} mb={6} textAlign="center" size="2xl">Global Fit Club Membership Verification</Heading>
      <Heading mt={6} mb={6} textAlign="center" size="xl">Single-use Partner Links</Heading>
      <AuthEth />
      <Wrapper className="app">
        <Canvas className="canvas" height="500px">
          <OrbitControls enableZoom={false}/>
          <ambientLight intensity={0.6} />
          <directionalLight position={[-2,5,2]} intensity={1} />
          {/* <Model /> */}
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
