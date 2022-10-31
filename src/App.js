import { Button, Stack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/layout'
import { Canvas } from '@react-three/fiber';
import styled from "styled-components";
import { OrbitControls } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
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
  const [companyName, setCompanyName] = useState("");
  const [contactType, setContactType] = useState("");
  const [tempURL, setTempURL] = useState("");
  const [emailJsId, setEmailJsId] = useState("");


  const [linkButtonIsClicked, setLinkButtonIsClicked] = useState(false);
  const [emailButtonIsClicked, setEmailButtonIsClicked] = useState(false); 
  
  useAccount({
    onDisconnect(){
      setIsAuthenticated(false);
    }
  })

// taken from https://usehooks.com/usePrevious/
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

function useEffectAllDepsChange(fn, deps) {
  const prevDeps = usePrevious(deps);
  const changeTarget = useRef();

  useEffect(() => {
    // nothing to compare to yet
    if (changeTarget.current === undefined) {
      changeTarget.current = prevDeps;
    }

    // we're mounting, so call the callback
    if (changeTarget.current === undefined) {
      return fn();
    }

    // make sure every dependency has changed
    if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
      changeTarget.current = deps;

      return fn();
    }
  }, [fn, prevDeps, deps]);
}
  useEffectAllDepsChange(()=>{
    let inputVal = false;
    if(partnerButtonWasClicked){inputVal = true;}
    setEmailButtonIsClicked(inputVal);
  }, [partnerButtonWasClicked])

  const { disconnect } = useDisconnect()

  //===========================================================================
  // RENDERING
  //===========================================================================

  if(isAuthenticated){

    const handlePartnerClick = (_companyName, _contactType, _tempURL, _emailjsID) => {
      // console.log(`IN PARENT, CONTACT_TYPE, EMAILJS_ID: ${_companyName} ${_contactType} ${_emailjsID}`);
      
      setPartnerButtonWasClicked(true);
      setCompanyName(_companyName);
      setContactType(_contactType);
      setTempURL(_tempURL);
      setEmailJsId(_emailjsID);

      if(_contactType==="1"){
        console.log(emailJsId)
      } else {
        setLinkButtonIsClicked(true);
        console.log("ONE_TIME_LINK_TRIGGERED")
        // axios.get( TEMPORARY_URL_REQUEST )
        // .then( (response) => { window.open(response.data); } ); 
      }

    }
        
    if(linkButtonIsClicked){      
      return(
        <Stack spacing={6} align="center">  
          <OneTimeLinkConfirmation setPartnerButtonWasClicked={setPartnerButtonWasClicked} setLinkButtonIsClicked={setLinkButtonIsClicked} setEmailButtonIsClicked={setEmailButtonIsClicked} />
        </Stack>
      )
    } else if(emailButtonIsClicked) {
      return(
        <Stack spacing={6} align="center">  
          <a href="#" id="logo" onclick="document.location.reload;return false;" >
            <img src={logo} alt="logo" height="100" width="100" />
          </a>          
          <Heading mt={6} mb={6} textAlign="center" size="2xl">Member Dashboard</Heading>         
        <EmailInterface setPartnerButtonWasClicked={setPartnerButtonWasClicked} userAddress={authdUser} emailJsId={emailJsId} setEmailButtonIsClicked={setEmailButtonIsClicked}/>
        </Stack>
      )
    } else {
      return(
        <Stack spacing={6} align="center">  
          <a href="#" id="logo" onclick="document.location.href;return false;" >
            <img src={logo} alt="logo" height="100" width="100" />
          </a>          
          <Heading mt={6} mb={6} textAlign="center" size="2xl">Member Dashboard</Heading>
          <Heading mt={6} mb={6} textAlign="center" size="sm">Access Holder-only Deals for these Partners:</Heading>          
          <PartnerList handlePartnerClick={handlePartnerClick}/>         

          <Button colorScheme="blue" onClick={() => disconnect()}>Disconnect</Button>
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

