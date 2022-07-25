import { useMoralis } from 'react-moralis'
import { Button, Stack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/layout'
import { AuthEth } from './AuthEth';
import { GetMemoURL } from './GetSingleUseLink';
import { Canvas } from '@react-three/fiber';
import styled from "styled-components";
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import logo from './gfclogo.png'
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  
  const { isAuthenticated, logout } = useMoralis();
  
  if(isAuthenticated){

    // const contract = new Web3.eth.Contract(nftAbi, nftAddress);
    // const response = await contract.methods.altoid().send();

    return(
      <Stack spacing={3} align="center">  
        <img src={logo} alt="logo" height="100" width="100" />
        <Heading mt={6} mb={6} textAlign="center" size="2xl">Global Fit Club Membership Verification</Heading>
        <Heading mt={6} mb={6} textAlign="center" size="xl">Verified! Redirecting...</Heading>
        <GetMemoURL />
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


  return (
    <Stack spacing={3} align="center"> 
      <img src={logo} alt="logo" height="100" width="100"/>
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
