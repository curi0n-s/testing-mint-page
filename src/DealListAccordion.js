import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Image,
    Stack,
    Heading
  } from '@chakra-ui/react'

  import { PARTNER_DATA } from './partner_data.js';

  export const DealListAccordion = (props) => {
   
    const handlePartnerClick = (e, _companyName, _contactType, _tempURL, _emailjsID) => {
        e.preventDefault();
        props.handlePartnerClick(_companyName, _contactType, _tempURL, _emailjsID);
        // props.setPartnerButtonWasClicked(false);

    }

    let partnerDescriptionArray = []
    PARTNER_DATA.forEach(index => {
        let thisContactTypeString;
        let thisId = index.COMPANY_ID;
        let thisCompanyName = PARTNER_DATA[thisId].COMPANY_NAME;
        let thisContactType = PARTNER_DATA[thisId].CONTACT_TYPE;
        let thisTempURL = PARTNER_DATA[thisId].TEMP_URL_REQUEST_ID;
        let thisEmailJsId = PARTNER_DATA[thisId].EMAILJS_SERVICE_ID;
        let thisImage = PARTNER_DATA[thisId].IMAGE_PATH;
        let thisDescription = PARTNER_DATA[thisId].DESCRIPTION;
        let thisDealType = PARTNER_DATA[thisId].DEAL_TYPE;
        let thisDiscountPercentage = PARTNER_DATA[thisId].DISCOUNT_PERCENTAGE;
        let thisDiscountedItem = PARTNER_DATA[thisId].DISCOUNTED_ITEM;
        let thisExpiration = PARTNER_DATA[thisId].EXPIRATION;
        let thisIsExpired = PARTNER_DATA[thisId].IS_EXPIRED;
        let thisAccordionColor = thisIsExpired ? 'red.100' : 'green.100';

        let thisDealString;
        if(thisDealType==="Discount"){ thisDealString = `${thisDiscountPercentage}% ${thisDealType} on ${thisDiscountedItem}` }
        else{ thisDealString = `${thisDealType} on ${thisDiscountedItem}` }


        if(thisContactType==="0"){thisContactTypeString = "Single-Use Link"}
        else {thisContactTypeString = "Email Form"}

        partnerDescriptionArray.push(
            <AccordionItem>
                <h2>
                <AccordionButton _expanded={{ bg: thisAccordionColor, color:'gray.700'}}>
                    <Box flex='1' textAlign='left'><Heading size='md'>{thisCompanyName}</Heading> {thisDealString},  {thisContactTypeString}, Expires: {thisExpiration} </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>            
                <AccordionPanel pb={4}>
                    <Stack spacing={6} align="center">  
                        <p>{thisDescription} </p>
                        <Button leftIcon={<Image boxSize='32px' src={thisImage}/>} colorScheme='gray' onClick={e => handlePartnerClick(e, thisCompanyName,thisContactType,thisTempURL,thisEmailJsId)} isDisabled={thisIsExpired}>Access Deal</Button>
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        ) 
    })


    return(
        <Accordion allowMultiple allowToggle w='100%'>{partnerDescriptionArray}</Accordion>
    )

  }