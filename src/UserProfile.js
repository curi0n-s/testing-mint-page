import { AspectRatio, Heading, Button, Stack, HStack, Alert, Spinner, Image } from '@chakra-ui/react'


    export const UserProfile = (props) => {

        let userAddress = props.userAddress;
        let userTier = props.userTier;
        let thisImage = './gfcpass.png'; //maybe later include an interactive model of the tier of membership they have
    return(
        <Stack spacing={6} align="center">             
            <Image src={thisImage} maxW='300px' />
            <Heading size='lg'>User: {userAddress}</Heading>
            <p>What else to add here? Maybe user activity if possible, though this may be off-chain. Also consider reading from a registry of confirmed orders as an activity tracker...</p>
        </Stack>
        )
  }