import { Button, Stack, Alert, Spinner, List, ListItem, ListIcon, OrderedList, UnorderedList, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { PARTNER_DATA } from './partner_data.js';

/**
 * list partners in new-->old order
 * https://www.convertsimple.com/convert-csv-to-javascript-array/ for current data storage of partners
*/

export const PartnerList = (props) => {
    let i = 0;
    const handlePartnerClick = (e, _companyName, _contactType, _tempURL, _emailjsID) => {
        e.preventDefault();
        props.handlePartnerClick(_companyName, _contactType, _tempURL, _emailjsID);
    }
    let partnerButtonsArray = []
    const PartnerButtons = PARTNER_DATA.forEach(index => {

        let thisId = index.COMPANY_ID;
        let thisCompanyName = PARTNER_DATA[thisId].COMPANY_NAME;
        let thisContactType = PARTNER_DATA[thisId].CONTACT_TYPE;
        let thisTempURL = PARTNER_DATA[thisId].TEMP_URL_REQUEST_ID;
        let thisEmailJsId = PARTNER_DATA[thisId].EMAILJS_SERVICE_ID;
        let thisImage = PARTNER_DATA[thisId].IMAGE_PATH;

        partnerButtonsArray.push(
            <ListItem>
                <Button leftIcon={<Image boxSize='32px' src={thisImage}/>} colorScheme='green' onClick={e => handlePartnerClick(e, thisCompanyName,thisContactType,thisTempURL,thisEmailJsId)}>{thisCompanyName}</Button>
            </ListItem>
        ) 
    })

    return(
        <List  spacing={3} align={'center'}>{partnerButtonsArray}</List>
    )


}