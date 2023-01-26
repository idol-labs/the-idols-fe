import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { formatEtherString } from '../utils/numberFormat';
import { ReactComponent as LogoBlue } from '../assets/logo_blue.svg';
import { ReactComponent as Ethereum } from '../assets/ethereum.svg';

import { ethers } from 'ethers';
import { gql } from '@apollo/client';

import { MarketplaceContext } from '../contexts/MarketplaceContext';

import MarketplaceHeaderStyles from '../styles/MarketplaceHeaderStyles';

const MarketplaceHeader = () => {
    const { 
        statsQueryArray,
        client,
    } = useContext(MarketplaceContext);

    // Stats
    const [forSaleCount, setForSaleCount] = useState('?')
    const [ownerCount, setOwnerCount] = useState('?')
    const [floorPrice, setFloorPrice] = useState('?')
    const [volumeTraded, setVolumeTraded] = useState('?')

    async function runStatsQuery() {
        let forSaleResult = null
        let ownerCountResult = null;
        let floorPriceResult = null;
        let volTradedResult = null;

        // Cleanup
        for (let query of statsQueryArray) {
            try {
                // For Sale Count 
                if (query === statsQueryArray[0]) {
                    const response = await client.query({
                        query: gql(query)
                    });

                    const responseData = response.data.godListedAlls;

                    if (responseData.length) {
                        forSaleResult = responseData[0].value;
                    }
                } else if (query === statsQueryArray[1]) {
                    const response = await client.query({
                        query: gql(query)
                    });

                    const responseData = response.data.ownerAlls;

                    if (responseData.length) {
                        ownerCountResult = responseData[0].value
                    }
                } else if (query === statsQueryArray[2]) {
                    // Floor Price
                    const response = await client.query({
                        query: gql(query)
                    });

                    const responseData = response.data.gods;

                    if (responseData.length) {
                        floorPriceResult = parseFloat(ethers.utils.formatEther(responseData[0].lastOfferedPrice))
                    }
                } else if (query === statsQueryArray[3]) {
                    // Volume Traded
                    const response = await client.query({
                        query: gql(query)
                    });

                    const responseData = response.data.godBoughtAlls;

                    if (responseData.length) {
                        let volTradedRes = responseData[0].value
                        volTradedResult = parseFloat(ethers.utils.formatEther(volTradedRes)).toFixed(4)
                    }
                }
               
               
            } catch (err) {
                console.log('Marketplace Stats graph error', err)
            }
        }

        // Set results
        if (forSaleResult ) {
            setForSaleCount(forSaleResult)
        }
        if (ownerCountResult) {
            setOwnerCount(ownerCountResult)
        }
        if (floorPriceResult) {
            setFloorPrice(floorPriceResult)
        }
        if (volTradedResult) {
            setVolumeTraded(volTradedResult)
        }
    }

    useEffect(() => {
        runStatsQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <MarketplaceHeaderStyles>
            <LogoBlue />

            <h1>Idols Marketplace</h1>

            <section className='stats'>
                <article>
                    <Link to={`/marketplace`}>
                        <p>{forSaleCount}</p>
                        <p>Idols Listed</p>
                    </Link>
                </article>

                {/* <article>
                    <p>{ownerCount}</p>
                    <p>Unique Owners</p>
                </article> */}

                <article>
                    <p><Ethereum /> {floorPrice === '?' 
                    ? '?' : formatEtherString(floorPrice)}</p>
                    <p>Floor Price</p>
                </article>

                <article className='stat-total-sales'>
                    <Link to={`/activity`}>
                        <p><Ethereum /> {volumeTraded === '?' ? '?' : formatEtherString(volumeTraded)}</p>
                        <p>Total Sales</p>
                        <p className='activity-link'>Sales Activity</p>
                    </Link>
                </article>
            </section>
            
        </MarketplaceHeaderStyles>
    )
}

export default MarketplaceHeader;