import {useContractReads} from 'wagmi'
import { useEffect, useState } from 'react';
import { NFT_ABI, NFT_ADDRESS } from "./nft_config"
// add check of balance for each tier of 1155! i.e. include checkTier function in contract.

export const CheckBalanceWrapper = (props) => {
    
    useContractReads({
        contracts: [
            {
                address: NFT_ADDRESS,
                abi: NFT_ABI,
                functionName: 'balanceOf',
                args: [props.userAddress, 1],
            },
            {
                address: NFT_ADDRESS,
                abi: NFT_ABI,
                functionName: 'balanceOf',
                args: [props.userAddress, 2],
            },
        ],
        enabled: true,
        onSuccess(data){
            props.setUserSilverBalance(parseInt(data[0]._hex,16))
            props.setUserGoldBalance(parseInt(data[1]._hex,16))
            props.balanceHasBeenUpdated(true)
        },
        onError(data){
            console.log(`CONTRACT-READ-ERROR[0]: ${data[0].message}`)
            console.log(`CONTRACT-READ-ERROR[1]: ${data[1].message}`)
        }
    })

    return null;
}