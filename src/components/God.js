import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { 
    ETHER_CONVERSION_URL, 
    GRAPH_URL, 
    HYYPE_URL, 
    IMG_URL, 
    NETWORK_ETH, 
    ETHERSCAN_URL, 
    WRONG_NETWORK_MSG, 
    NUM_TO_TEXT, 
    LOG_MAP,
    hyypeClientID
} from '../utils/constants'
import { formatEtherString, timeAgo } from '../utils/numberFormat'
import { ReactComponent as Ethereum } from '../assets/ethereum.svg';
import { ReactComponent as ChevronDown } from '../assets/chevron_down.svg';
import { ReactComponent as Hyype } from '../assets/hyype.svg';

import { ethers } from 'ethers';
import axios from 'axios';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import ImageLazy from './ImageLazy';

import { PopupContext } from '../contexts/PopupContext';
import { WalletContext } from '../contexts/WalletContext';
import { MarketplaceContext } from '../contexts/MarketplaceContext';

import Loader from './Loader';
import MarketplaceHeader from './MarketplaceHeader';

import GodStyles from '../styles/GodStyles';

// Have info use contract functions if user logged in, fall back to graph otherwise
// For buttons use contract functions
// For logs use the graph

const NFT = () => {
    const { 
        setPopup, 
        txHash 
    } = useContext(PopupContext);
    const { 
        account, 
        network, 
        provider, 
        idolMainContractAddress, idolMainContract, 
        marketplaceContract, marketplaceContractAddress, 
        walletFinished, 
        walletLoaded
    } = useContext(WalletContext);
    const { 
        Traits, 
        layerMap 
    } = useContext(MarketplaceContext);
    const params = useParams();

    const [loading, setLoading] = useState(true)
    const [etherConversion, setEtherConversion] = useState(null)

    // Marketplace Approval Check
    const [isApproved, setIsApproved] = useState(false)

    const [owner, setOwner] = useState('')
    const [accountIsOwner, setAccountIsOwner] = useState(null)

    const [isForSale, setIsForSale] = useState(false)
    const [currentPriceEth, setCurrentPriceEth] = useState(0);
    const [currentSaleToAddress, setCurrentSaleToAddress] = useState('');

    const [lastBoughtPriceEth, setLastBoughtPriceEth] = useState(0);

    const [hasBid, setHasBid] = useState(false)
    const [currentBidEth, setCurrentBidEth] = useState(0);
    const [currentBidFromAddress, setCurrentBidFromAddress] = useState('');
    const [accountHasCurrentBid, setAccountHasCurrentBid] = useState(false)

    const [hyypeFeed, sethyypeFeed] = useState(null);
    const [dropdownShowHyype, setDropdownShowHyype] = useState(true)

    const [transactionHistory, setTransactionHistory] = useState(null);
    const [dropdownShowLogs, setDropdownShowLogs] = useState(true)

    const [showBuy, setShowBuy] = useState(false);

    async function getEtherConversion() {
        const response = await axios.get(ETHER_CONVERSION_URL)
        setEtherConversion(response.data)
    }

    function getShortAddress(address) {
        const shortAddress = address.slice(2)

        const firstFour = shortAddress.slice(0, 4)
        const lastFour = shortAddress.slice(-4)

        return (
            <span>{firstFour}...{lastFour}</span>
        )
    }

    function getPriceDisplay(wei) {
        const ether = parseFloat(ethers.utils.formatEther(wei))

        return (
            <p>
                {
                    ether &&
                    <>
                        <Ethereum /> 
                        <span className='price-value'>{formatEtherString(ether)}</span>
                    </>
                }
            </p>
        )
    }

    function getPriceDisplayCard() {
        let etherLastOffered = null;
        let etherLastBought = null;
        let etherTopBid = null;

        if (isForSale && currentPriceEth > 0) {
            etherLastOffered = currentPriceEth
        }

        if (lastBoughtPriceEth > 0) {
            etherLastBought = lastBoughtPriceEth
        }

        if (hasBid && currentBidEth > 0) {
            etherTopBid = currentBidEth
        }

   
        return (
            <>
                <p>
                    {
                        etherLastOffered &&
                        <>
                            <span className='price-title'>Price</span>
                            <Ethereum /> 
                            <span className='price-value'>{formatEtherString(etherLastOffered)}</span>
                            {/* {
                                currentSaleToAddress &&
                                <span>Only offered to{currentSaleToAddress}</span>
                            } */}
                        </>
                    }
                </p>

                <p className='last-bought'>
                    {
                        etherLastBought &&
                        <>
                            <span className='price-title'>Last</span>
                            <Ethereum /> 
                            <span className='price-value'>{formatEtherString(etherLastBought)}</span>
                        </>
                    }
                </p>

                <p className='top-bid'>
                    {
                        etherTopBid &&
                        <>
                            <span className='price-title'>Top Bid</span>
                            <Ethereum /> 
                            <span className='price-value'>{formatEtherString(etherTopBid)}</span>
                        </>
                    }
                </p>
            </>
        )
    }
    

    async function loadContract() {
        if (account && provider) {
            if (parseInt(network) === NETWORK_ETH) {
                if (idolMainContract && marketplaceContract) {
                    let isApproved = null;
                    let godOwner = null;
                    let godInfo = null;
                    let godBid = null;

                    try {
                        isApproved = await idolMainContract.isApprovedForAll(account.toLowerCase(), marketplaceContractAddress)
                    } catch(err) {
                        console.log('Idol page isapproved errorr', err)
                    }

                    try {
                        godOwner = await idolMainContract.ownerOf(params.godId)
                    } catch(err) {
                        console.log('Idol page godOwner errorr', err)
                    }
                   
                    try {
                        godInfo = await marketplaceContract.godListings(params.godId)

                        godBid = await marketplaceContract.godBids(params.godId)
                    } catch(err) {
                        console.log('Idol page load contract error', err)
                    }

                    const godForSale = godInfo.minValue > 0;
                    const godHasBid = godBid.value > 0;

                    if (godOwner) {
                        setOwner(godOwner)

                        if (account.toUpperCase() === godOwner.toUpperCase()) {
                            setAccountIsOwner(true)
                        } else {
                            setAccountIsOwner(false)
                        }

                        // Check godlisting seller is same as owner or else not for sale
                        if (godInfo.seller.toUpperCase() !== godOwner.toUpperCase()) {
                            setIsForSale(false)
                        } else {
                            setIsForSale(godForSale)
                        }
                    }
                   
                    setIsApproved(isApproved)
                    setCurrentPriceEth(ethers.utils.formatEther(godInfo.minValue))

                    setHasBid(godHasBid)
                    setCurrentBidEth(ethers.utils.formatEther(godBid.value))
                    setCurrentBidFromAddress(godBid.bidder)

                    if (godHasBid && godBid.bidder.toUpperCase() === account.toUpperCase()) {
                        setAccountHasCurrentBid(true)
                    }

                    if (godForSale) {
                        if (godInfo.onlySellTo !== '0x0000000000000000000000000000000000000000') {
                            setCurrentSaleToAddress(godInfo.onlySellTo)

                            if (godInfo.onlySellTo.toUpperCase() === account.toUpperCase()) {
                                setShowBuy(true)
                            }
                        } else {
                            setShowBuy(true)
                        }
                    }
                   
                    // Add event listeners
                }
            } else {
                console.log(WRONG_NETWORK_MSG)
            }
        }
    }

    
    const godDetailsQuery = `
        query GodDetails {
            gods(where: {id: ${params.godId}}) {
                owner {
                    id
                }
                forSale
                forSalePublic
                lastOfferedPrice
                lastOfferedTo {
                    id
                }
                lastBoughtPrice
                hasBid
                lastBid
                lastBidder {
                    id
                }
            }
        }
    `;

    const logHistoryQuery = `
        query Logs {
            logActivities(where: {idolId: ${params.godId}}, orderBy: timestamp, orderDirection: asc) {
                id
                idolId
                from
                to
                value
                timestamp
                logType
            }
        }
    `;


    const client = new ApolloClient({
        uri: GRAPH_URL,
        cache: new InMemoryCache(),
    })


    async function runQuery() {
        try {
            const detailResponse = await client.query({
                query: gql(godDetailsQuery),
            });

            const nftData = detailResponse.data['gods'][0];

            const logsResponse = await client.query({
                query: gql(logHistoryQuery),
            });

            const logData = logsResponse.data['logActivities'];

            if (!account) {
                setOwner(nftData.owner.id)
            }
          
            if (nftData && logData) {
                // Set for sale rendering
                if (!account && nftData.forSale) {
                    const priceEth = parseFloat(ethers.utils.formatEther(nftData.lastOfferedPrice));
                    const toAddress = nftData.lastOfferedTo.id;

                    if (nftData.forSale) {
                        setIsForSale(true)
                        setCurrentPriceEth(priceEth)
                        if (toAddress !== '0x0000000000000000000000000000000000000000') {
                            setCurrentSaleToAddress(toAddress)

                            if (toAddress === account) {
                                setShowBuy(true)
                            }
                        } else {
                            setShowBuy(true)
                        }
                    } else if (!nftData.forSale && nftData.forSalePublic && account === toAddress) {
                        setCurrentPriceEth(priceEth)
                        if (toAddress !== '0x0000000000000000000000000000000000000000') {
                            setCurrentSaleToAddress(toAddress)
                        }
                    }
                }

                if (nftData.lastBoughtPrice) {
                    setLastBoughtPriceEth(nftData.lastBoughtPrice)
                    setLastBoughtPriceEth(parseFloat(ethers.utils.formatEther(nftData.lastBoughtPrice)))
                }

                // Valid bid if hasBid and bidder is not current owner
                if (!account && nftData.hasBid && nftData.lastBid && nftData.lastBidder && nftData.owner && nftData.lastBidder.id !== nftData.owner.id) {
                    const wei = nftData.lastBid
                    const priceEth = parseFloat(ethers.utils.formatEther(wei));
                        
                    setHasBid(true)
                    setCurrentBidEth(priceEth)
                    setCurrentBidFromAddress(nftData.lastBidder.id)
                }

                // Log Data clean
                // 3 - Buys skips any Unlist and Transfer after
                // 4 - Unlist
                // 5 - Transfer
              
                const logDataClean = []
                let lastBuyTimestamp = null;
                for (let log of logData) {
                    const timestamp = log.timestamp;
                    const logType = log.logType;

                    if (logType === '3') {
                        lastBuyTimestamp = timestamp;
                    }

                    if (logType === '4' || logType === '5') {
                        if (timestamp === lastBuyTimestamp) {
                            continue;
                        }                        
                    }

                    logDataClean.push(log)
                }

                setTransactionHistory(logDataClean.reverse())
            }
        } catch (err) {
            console.log('God page graph error', err)
        }
    }


    function getTransactionRow(transaction) {

        let from = null;
        let to = null;
        let value = null;


        if (transaction.from) {
            from = transaction.from;
        }

        if (transaction.to) {
            to = transaction.to;
        }

        if (transaction.value) {
            value = getPriceDisplay(transaction.value.toString())
        }

        const dateObj = new Date(parseInt(transaction.timestamp) * 1000);
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear() % 100;

        const date = `${month}-${day}-${year}`

        return (
            <>
                <td>{LOG_MAP[transaction.logType]}</td>
                <td>{value}</td>
                <td>
                    <a 
                        href={`${ETHERSCAN_URL}address/${from}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >{from}</a>
                </td>
                <td>
                    <a 
                        href={`${ETHERSCAN_URL}address/${to}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >{to}</a>
                </td>
                <td>{date}</td>
            </>
        )
    }

    function getAttributes() {
        return (
            <>
                {
                    Object.keys(layerMap).map(layer => (
                        <article
                            className='trait-wrapper'
                            key={layer}
                        >
                            <p className='trait-title'>{layer === 'Amount of Attributes' ? 'Attributes' : `${layer}`}</p>

                            {
                                layer === 'Amount of Attributes' &&
                                <>
                                    <p className='trait-percentage attr-count'>
                                        <span className='trait'>{NUM_TO_TEXT[Traits.gods[params.godId][layer]]}</span>

                                        <span className='percentage'>{Traits.traitCount[Traits.gods[params.godId][layer]].percentage}%</span>
                                    </p>
                                </>
                            }

                            {
                                layer !== 'Amount of Attributes' && Traits.gods[params.godId][layer] !== null &&
                                <>
                                    <p className='trait-percentage'>
                                        <span className='trait'>{Traits.gods[params.godId][layer]}</span>

                                        <span className='percentage'>{Traits.traits[layer][Traits.gods[params.godId][layer]].percentage}%</span>
                                    </p> 

                                    <p className={Traits.traits[layer][Traits.gods[params.godId][layer]].rarity.toLowerCase()}>{Traits.traits[layer][Traits.gods[params.godId][layer]].rarity}</p>
                                </>
                            }
                        </article>
                    ))

                }
            </>
        )
    }

    async function runHyypeQuery() {
        try {
            const response = await axios.get(`${HYYPE_URL}/lores?searchKey=${idolMainContractAddress.toLowerCase()}-${params.godId}`, {
                headers: {
                  'client-id': hyypeClientID
                }
            })
        
            if (response && response.data) {
                sethyypeFeed(response.data)
            }

            setLoading(false)

        } catch (err) {
            console.log('God page hyppe query error', err)
        }
    }



    async function loadGod() {
        await getEtherConversion()
        await loadContract()
        await runQuery()
        await runHyypeQuery()
        setLoading(false)
    }

    useEffect(() => {
        if (walletFinished) {
            loadGod()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletFinished, walletLoaded])

    return (
        <GodStyles>
            <MarketplaceHeader />

            <section className='card-content-wrapper'>

                <section className='card-hyype-wrapper'>

                    <article className='card'>
                        <ImageLazy
                            src={`${IMG_URL}${params.godId}.jpg`} 
                            alt={`Idol ${params.godId}`}
                        />
                        
                        <section className='card-info'>
                            <a  
                                className='card-title'
                                href={`${ETHERSCAN_URL}nft/${idolMainContractAddress}/${params.godId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >Idol #{params.godId}</a>

                            <article className='price-wrapper'>
                                {
                                    getPriceDisplayCard()
                                }  
                            </article>
                        </section>
                    </article>

                    {
                        !loading &&
                        <section className='hyype-wrapper'>
                            <button
                                className={`${dropdownShowHyype? 'active':''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDropdownShowHyype(!dropdownShowHyype);
                                }}
                            >
                                <p className='title'><Hyype /> Lore</p>
                                
                                <ChevronDown />
                            </button>

                            <section
                                className={`hyype-feed ${dropdownShowHyype ? 'active':''}`}
                            >
                                <p className='hyype-connect'>Connect your wallet on <a href={`https://hyy.pe`} target="_blank" rel="noopener noreferrer">hyy.pe</a> to add lore to your Idols. Learn more <a href={`https://docs.hyy.pe`}target="_blank" rel="noopener noreferrer">here</a>.</p>

                                <ul>
                                    {
                                        hyypeFeed && hyypeFeed.length > 0 ? 
                                        hyypeFeed.map(post => 
                                            <li
                                                key={post._id}
                                            >
                                                <section className='hyype-post-profile'>
                                                    <ImageLazy
                                                        src={`${post.author.verifiedProfileImage ? post.author.verifiedProfileImage.cachedMedia.imageUrl : post.author.profilePhotoUrl}`} 
                                                        alt={`${post.author.userName}`}
                                                    />
                                                    <div className='author-timestamp-wrapper'>
                                                        <p>{post.author.userName}</p>
                                                        <span>·</span>
                                                        <p className='timestamp'>{timeAgo(post.updatedAt)}</p>
                                                    </div>
                                                </section>

                                                <section className='hyype-post-main'>
                                                    <p>{post.previewText}</p>

                                                    {
                                                        post.previewImageUrl !== 'none' &&
                                                        <ImageLazy
                                                            src={`${post.previewImageUrl}`} 
                                                            alt={`${post.previewText}`}
                                                        />
                                                    }
                                                </section>

                                                <a 
                                                    href={`https://hyy.pe/lore/${post._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >Read More</a>
                                            </li>
                                        ): <li className='no-feed'>No lore yet</li>
                                    }
                                </ul>
                            </section>
                        </section>
                    }
                </section>
                
                {
                    loading &&
                    <Loader />
                }

                {
                    !loading &&
                    <>
                        <section className='content'>
                            {
                                walletLoaded && account &&
                                <section className='marketplace-buttons'>
                                    {
                                        accountIsOwner === false && isForSale && showBuy &&
                                        <button
                                            className='btn-buy'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (txHash) {
                                                    setPopup({
                                                        type: 'transaction'
                                                    })
                                                    return;
                                                }
                                                setPopup({
                                                    type: 'buy',
                                                    id: params.godId,
                                                    value: currentPriceEth,
                                                    etherConversion
                                                })
                                            }}
                                        >Buy Now</button>
                                    }

                                    {
                                        accountIsOwner === false &&
                                        <button
                                            className='btn-bid'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (txHash) {
                                                    setPopup({
                                                        type: 'transaction'
                                                    })
                                                    return;
                                                }
                                                setPopup({
                                                    type: 'bid',
                                                    id: params.godId,
                                                    value: currentBidEth ? currentBidEth : 0,
                                                    showWithdraw: accountHasCurrentBid,
                                                    listPrice: currentPriceEth ? currentPriceEth: 0,
                                                    etherConversion
                                                })
                                            }}
                                        >{accountHasCurrentBid ? 'Modify Offer' : 'Make Offer'}</button>
                                    }

                                    {
                                        accountIsOwner === true &&
                                        <button
                                            className='btn-transfer'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (txHash) {
                                                    setPopup({
                                                        type: 'transaction'
                                                    })
                                                    return;
                                                }
                                                setPopup({
                                                    type: 'transfer',
                                                    id: params.godId
                                                })
                                            }}
                                        >Transfer</button>
                                    }

                                    {
                                        accountIsOwner === true &&
                                        <button
                                            className='btn-list'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (txHash) {
                                                    setPopup({
                                                        type: 'transaction'
                                                    })
                                                    return;
                                                }
                                                if (!isApproved) {
                                                    setPopup({
                                                        type: 'marketplace-approve'
                                                    })
                                                    return;
                                                }
                                                setPopup({
                                                    type: 'offer',
                                                    id: params.godId,
                                                    value: currentPriceEth,
                                                    showDelist: isForSale,
                                                    etherConversion
                                                })
                                            }}
                                        >List / Delist</button>
                                    }

                                    {
                                        accountIsOwner === true && hasBid &&
                                        <button
                                            className='btn-accept'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (txHash) {
                                                    setPopup({
                                                        type: 'transaction'
                                                    })
                                                    return;
                                                }
                                                if (!isApproved) {
                                                    setPopup({
                                                        type: 'marketplace-approve'
                                                    })
                                                    return;
                                                }
                                                setPopup({
                                                    type: 'bidaccept',
                                                    id: params.godId,
                                                    value: currentBidEth,
                                                    etherConversion 
                                                })
                                            }}
                                        >Accept Bid</button>
                                    }
                                </section>
                            }
                            

                            <section className='attributes-wrapper'>
                                <article className='owned-by'>
                                    <p>Owned by</p>

                                    <a  
                                        href={`${ETHERSCAN_URL}address/${owner}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >{getShortAddress(owner)}</a>
                                </article>

                                {
                                    getAttributes()
                                }
                            </section>    

                            {
                                transactionHistory &&
                                <section className='logs'>
                                    <button
                                        className={`${dropdownShowLogs? 'active':''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDropdownShowLogs(!dropdownShowLogs);
                                        }}
                                    >
                                        <p className='title'>Transaction History</p>
                                        
                                        <ChevronDown />
                                    </button>

                                    <section
                                        className={`logs-table ${dropdownShowLogs ? 'active':''}`}
                                    >
                                        <article>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th>Event</th>
                                                        <th>Price</th>
                                                        <th>From</th>
                                                        <th>To</th>
                                                        <th>Date</th>
                                                    </tr>
                                            
                                                    {
                                                        transactionHistory && transactionHistory.map(transaction => 
                                                            <tr
                                                                key={transaction.id}
                                                            >
                                                                {getTransactionRow(transaction)}
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </article>
                                    </section>
                                </section>
                            }
                        </section>

                    </>
                }
            </section>
            
        </GodStyles>
    )
}

export default NFT;