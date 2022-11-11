import { Heading, Button, Stack, HStack, Alert, Spinner, Image,Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, } from '@chakra-ui/react'
import { lazy } from 'react';
import { TokenBalanceAndClaimWidget } from './TokenBalanceAndClaimWidget'


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

        // Setup Token Balance, Claim Functions, Transaction History

        
        let userPartnerTxnArray = USER_ACTIVITY.PARTNER_ACTIVITY;
        let userPartnerTxnArrayLength = userPartnerTxnArray.length;
        let userPartnerActivityFields = [
            "Date Accessed", "Partner Name", "Payment"
        ]
        let userClaimTxnArray = USER_ACTIVITY.CLAIM_ACTIVITY;
        let userClaimTxnArrayLength = userClaimTxnArray.length;
        let userClaimActivityFields = [
            "Claim Date", "GFCT Claimed", "USD Value at Time of Claim"
        ]
                    

        let tablePartnerContentsArray = []
        for(let i = 0; i<userPartnerTxnArrayLength; i++){
            tablePartnerContentsArray.push(
                <Tr>
                    <Td>{userPartnerTxnArray[i].DATE_ACCESSED}</Td>
                    <Td>{userPartnerTxnArray[i].PARTNER_NAME}</Td>
                    <Td>{userPartnerTxnArray[i].PAYMENT}</Td>
                </Tr>
            ) 
        }   
        
        let tableClaimContentsArray = [];
        for(let i=0; i<userClaimTxnArrayLength; i++){
            tableClaimContentsArray.push(
                <Tr>
                    <Td>{userClaimTxnArray[i].CLAIM_DATE}</Td>
                    <Td>{userClaimTxnArray[i].CLAIM_GFCT_AMOUNT}</Td>
                    <Td>{userClaimTxnArray[i].USD_VALUE_AT_CLAIM}</Td>
                </Tr>
            )
        }

        return(
        <Stack spacing={6} align="center">             
        
            <Heading size='lg'>User: {userAddress}</Heading>

            <HStack spacing={6} align="center">
                {/* <Image src={thisImage} maxW='300px' /> */}
                <TokenBalanceAndClaimWidget userAddr={userAddress}/>
            </HStack>

            <HStack spacing={6} align="center">
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Td>{userPartnerActivityFields[0]}</Td>
                                <Td>{userPartnerActivityFields[1]}</Td>
                                <Td>{userPartnerActivityFields[2]}</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {tablePartnerContentsArray} 
                        </Tbody>
                    </Table>
                </TableContainer>
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Td>{userClaimActivityFields[0]}</Td>
                                <Td>{userClaimActivityFields[1]}</Td>
                                <Td>{userClaimActivityFields[2]}</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {tableClaimContentsArray} 
                        </Tbody>
                    </Table>
                </TableContainer>
            </HStack>
        </Stack>
        )
}
