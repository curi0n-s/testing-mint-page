import { useMoralis } from 'react-moralis'
import { Button, Heading, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
// import { useState } from 'react';


  
export const AuthEth = () => {
    const { authenticate, isAuthenticating, authError } = useMoralis();

    return (
        <Stack spacing={6}>
            {authError && (
                <Alert
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='130px'
                >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Authentication has Failed
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    {authError.message}
                </AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
            )}
            <Heading mt={6} mb={6} textAlign="center" size="xl"></Heading>
            <Button colorScheme="blue" isLoading={isAuthenticating} onClick={ () => authenticate({ type: 'eth', signingMessage:"Authenticating GFC Membership" }) }>Authenticate: Ethereum</Button>
            {/* <Text textAlign="center"><em>or</em></Text>
            <SignUp />
            <Text textAlign="center"><em>or</em></Text>
            <Login /> */}
        </Stack>
    )

};

// --- ELDER CODE from https://www.youtube.com/watch?v=iSAqAUi2yIw&ab_channel=MoralisWeb3 ---

// const SignUp = () => {

//     const {signup} = useMoralis();
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();

//     return (
//     <Stack spacing={3}>
//     <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
//     <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
//     <Button onClick={ () => signup(email, password, email) }>Sign up</Button>
//     </Stack>
//     )
// }
  
  
// const Login = () => {

//     const {login} = useMoralis();
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();

//     return (
//     <Stack spacing={3}>
//         <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
//         <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
//         <Button onClick={ () => login(email, password) }>Login</Button>
//     </Stack>
//     )
// }