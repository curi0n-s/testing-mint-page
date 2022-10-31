import { Button, Heading, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import axios from 'axios';
import { useState, useEffect, memo } from 'react';
import { TEMPORARY_URL_REQUEST } from "./config";

export const GetMemoURL =  memo( () => {

    console.log('GetMemoURL Render!');

    const handleClick = (e) => {
        e.preventDefault();
        axios.get( TEMPORARY_URL_REQUEST )
        .then( (response) => { window.open(response.data); } ); 
    }

    return (
        <Stack spacing={6}>
            <Button onClick={handleClick}>Get Single-Use Link</Button>
        </Stack>
    )

},[]);
