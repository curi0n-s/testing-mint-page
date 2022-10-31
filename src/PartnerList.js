import { Button, Stack, Alert, Spinner, List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { PARTNER_DATA } from './partner_data.js';

/**
 * list partners in new-->old order
 * https://www.convertsimple.com/convert-csv-to-javascript-array/ for current data storage of partners
*/

export const PartnerList = (props) => {
    let i = 0;
    const handlePartnerClick = (e) => {
        // e.preventDefault();
        props.handlePartnerClick();
    }
    let partnerButtonsArray = []
    const PartnerButtons = PARTNER_DATA.forEach(index => {
        let thisID = index.COMPANY_ID;
        partnerButtonsArray.push(
            <ListItem>
                <Button onClick={console.log("handle click here!!")}>{PARTNER_DATA[thisID].COMPANY_NAME}</Button>
            </ListItem>
        ) 
    })

    return(
        <List  spacing={3} align={'center'}>{partnerButtonsArray}</List>
    )


}