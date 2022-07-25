import { Button, Heading, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import axios from 'axios';
import { useState, useEffect, memo } from 'react';

// export const GetSingleUseLink = () => {
    
//     const [link, setLink] = useState('');

//     useEffect(() => {
//         axios.get( `https://php-url-request.herokuapp.com/web/index.php` )
//         .then( (response) => { setLink(response.data)} ); 
//     }, []);

//     if (!link) return null;
//     if (link) window.open(link);

//     return (
//         <Stack spacing={6}>
//             <Heading mt={6} mb={6} textAlign="center" size="xl"> Link: { link } </Heading>
//         </Stack>
//     )

// };

// export const GetSingleUseLinkMemo = memo(GetSingleUseLink);

export const GetMemoURL =  memo( () => {

    console.log('GetMemoURL Render!');
    const [link, setLink] = useState(0);

    useEffect(() => {
        axios.get( `https://php-url-request.herokuapp.com/web/index.php` )
        .then( (response) => { setLink(response.data); window.open(response.data); } ); 
    }, []);

    if (!link) return null;

    return (
        <Stack spacing={6}>
            <Heading mt={6} mb={6} textAlign="center" size="xl"> Link: { link } </Heading>
        </Stack>
    )
},[]);
