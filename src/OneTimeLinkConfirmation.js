import { Button, Stack, Alert, Spinner, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { PARTNER_DATA } from './partner_data.js';
import logo from './gfclogo.png'
/**
 * landing page for clicking one-time-use link to partner discount
*/

export const OneTimeLinkConfirmation = (props) => {

    const handleBackFromLink = (e) => {
        // e.preventDefault();
        props.setLinkButtonIsClicked(false);   
        props.setEmailButtonIsClicked(false);
    }

    return(
        <Stack spacing={6} align="center">  
            <a href="#" id="logo" onclick="document.location.href;return false;" >
            <img src={logo} alt="logo" height="100" width="100" />
            </a>
            <Heading mt={6} mb={6} textAlign="center" size="2xl">Member Dashboard</Heading>  
            <Heading mt={6} mb={6} textAlign="center" size="xl">Single-Use Link Utilized</Heading>   
            <Button onClick={handleBackFromLink}>Back</Button>   
        </Stack>
    )

}