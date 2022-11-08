import { AspectRatio, Heading, Button, Stack, HStack, Alert, Spinner, Image,Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, } from '@chakra-ui/react'
import { lazy } from 'react';
import { USER_ACTIVITY } from './0x8eaFB616e4519578195b32C2d5e07578F2E1cB87.js'

export const UserProfile = (props) => {

        let userAddress = props.userAddress;
        let userTier = props.userTier;
        let thisImage = (userTier === "placeholder") ? './gfcpass.png' : './gfcpass.png'; //maybe later include an interactive model of the tier of membership they have
        let userDataFileExtension = '.js';
        console.log(`./${userAddress}${userDataFileExtension}`)

        //EITHER DYNAMIC IMPORT A FILE OR GET FROM API the info required to display a list of the user's previous activity
        
        // // HOW TO DO???? maybe use API get instead!!
        // let userProfileFile;
        // let SetUserProfileFile = async () => {
        //     userProfileFile = await import(`./${userAddress}${userDataFileExtension}`);
        // }
        
        // SetUserProfileFile();

        
        let userTxnArray = USER_ACTIVITY.ACTIVITY;
        console.log(userTxnArray)
        let userTxnArrayLength = userTxnArray.length;
        let userActivityFields = [
            "Date Accessed", "Partner ID", "Payment"
        ]
                    

        let tableContentsArray = []
        for(let i = 0; i<userTxnArrayLength; i++){
            tableContentsArray.push(
                <Tr>
                    <Td>{userTxnArray[i].DATE_ACCESSED}</Td>
                    <Td>{userTxnArray[i].PARTNER_ID}</Td>
                    <Td>{userTxnArray[i].PAYMENT}</Td>
                </Tr>
            ) 
        }            

        return(
        <Stack spacing={6} align="center">             
            <Image src={thisImage} maxW='300px' />
            <Heading size='lg'>User: {userAddress}</Heading>
            <TableContainer>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Td>{userActivityFields[0]}</Td>
                            <Td>{userActivityFields[1]}</Td>
                            <Td>{userActivityFields[2]}</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                       {tableContentsArray} 
                    </Tbody>
                </Table>
            </TableContainer>
        </Stack>
        )
}
