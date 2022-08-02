import { Button, Heading, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import axios from 'axios';
import { useState, useEffect, memo } from 'react';

export const GetMemoURL =  memo( () => {

    console.log('GetMemoURL Render!');
    // const [link, setLink] = useState(0);

    // useEffect(() => {
    //     axios.get( `https://php-url-request.herokuapp.com/web/index.php` )
    //     .then( (response) => { setLink(response.data); window.open(response.data); } ); 
    // }, []);

    const handleClick = (e) => {
        e.preventDefault();
        axios.get( `https://php-url-request.herokuapp.com/web/index.php` )
        .then( (response) => { window.open(response.data); } ); 
    }

    return (
        <Stack spacing={6}>
            <Button onClick={handleClick}>Get Single-Use Link</Button>
        </Stack>
    )

},[]);
