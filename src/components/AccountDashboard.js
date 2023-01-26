import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { 
    ETHER_CONVERSION_URL, 
    STETH_CONVERSION_URL, 
    GRAPH_URL, 
    IMG_URL, 
    NETWORK_ETH, 
    WRONG_NETWORK_MSG 
} from '../utils/constants';
import { formatEtherString, formatEtherToUSD } from '../utils/numberFormat';
import { ReactComponent as Ethereum } from '../assets/ethereum.svg';

import { ethers } from 'ethers';
import axios from 'axios';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import Loader from './Loader';
import ImageLazy from './ImageLazy';

import { PopupContext } from '../contexts/PopupContext';
import { WalletContext } from '../contexts/WalletContext';

import AccountStyles from '../styles/AccountStyles';

const Account = () => {
    const { 
        setPopup, 
        setTxHash, 
        txHash 
    } = useContext(PopupContext);
    const { 
        account, 
        network, 
        provider, 
        idolMainContract, 
        tokenContract, 
        marketplaceContract, marketplaceContractAddress, 
        stethContract, 
        walletLoaded 
    } = useContext(WalletContext);

    // How many NFTs to grab
    const IDOLS_RESULTS_LIMIT = 100;
    const BIDS_RESULTS_LIMIT = 1000;

    const [loading, setLoading] = useState(true);    
    const [etherConversion, setEtherConversion] = useState(null)
    const [stethConversion, setStethConversion] = useState(null)

    // Marketplace Approval Check
    const [isApproved, setIsApproved] = useState(false)

    // Stats
    const [userIDOLStaked, setUserIDOLStaked] = useState('?');

    // Rewards
    const [pendingStethReward, setPendingStethReward] = useState('?')
    const [pendingWithdrawals, setPendingWithdrawals] = useState(0);

    // Bids Reloading
    const [bidsReceivedLoading, setBidsReceivedLoading] = useState(true);
    const [bidsPlacedLoading, setBidsPlacedLoading] = useState(true);

    // NFTs
    const [nftsOwnedCount, setNftsOwnedCount] = useState('?');
    const [nftsForSale, setNftsForSale] = useState('?');

    const [nftBidsReceived, setNftBidsReceived] = useState([]);
    const [nftBidsPlaced, setNftBidsPlaced] = useState([])

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [results, setResults] = useState(null);


    async function getEtherConversion() {
        const response = await axios.get(ETHER_CONVERSION_URL)
        setEtherConversion(response.data)
    }

    async function getSTETHConversion() {
        const response = await axios.get(STETH_CONVERSION_URL)

        if (response.data && response.data.USD) {
            setStethConversion(response.data)
            return response.data.USD;
        }
    }

    async function sendRequestStethClaimAndUpdate() {
        if (account && idolMainContract) {
            const signer = provider.getSigner()
            const contractWithSigner = idolMainContract.connect(signer);

            try {
                const tx = await contractWithSigner.claimEthRewards(account)

                setTxHash(tx.hash)
                setPopup({
                    type: 'transaction',
                })

                const receipt = await tx.wait();

                if (receipt && receipt.status === 1) {
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                }

            } catch(err) {
                console.log('claim steth error', err)
            }
        }
    }

    async function sendRequestMarketplaceWithdraw() {
        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

            try {
                const tx = await contractWithSigner.withdrawPendingFunds()

                setTxHash(tx.hash)
                setPopup({
                    type: 'transaction',
                })

                const receipt = await tx.wait();

                if (receipt && receipt.status === 1) {
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                }

            } catch(err) {
                console.log('marketplace withdraw error', err)
            }
        }
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


    function getBidReceivedRow(nft) {
        const value = getPriceDisplay(nft.lastBid.toString())
        const popupValue = ethers.utils.formatEther(nft.lastBid);

        const dateObj = new Date(parseInt(nft.lastBidTimestamp) * 1000);
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear() % 100;

        const date = `${month}-${day}-${year}`

        return (
            <>
                <td>#{nft.id}</td>
                <td>{value}</td>
                <td><p>{nft.lastBidder.id}</p></td>
                <td>{date}</td>
                <td>
                    <button
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
                                id: nft.id,
                                value: popupValue,
                                etherConversion 
                            })
                        }}
                    >Accept</button>
                </td>
            </>
        )
    }

    function getBidPlacedRow(nft) {
        const value = getPriceDisplay(nft.lastBid.toString())
        const popupValue = ethers.utils.formatEther(nft.lastBid);
        let popupListPrice = null;
        if (nft.forSalePublic) {
            popupListPrice = ethers.utils.formatEther(nft.lastOfferedPrice);
        }

        const dateObj = new Date(parseInt(nft.lastBidTimestamp) * 1000);
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear() % 100;

        const date = `${month}-${day}-${year}`

        return (
            <>
                <td>#{nft.id}</td>
                <td>{value}</td>
                <td>{date}</td>
                <td>
                    <button
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
                                id: nft.id,
                                value: popupValue ? popupValue : 0,
                                showWithdraw: true,
                                listPrice: popupListPrice ? popupListPrice: 0,
                                etherConversion
                            })
                        }}
                    >Modify</button>
                </td>
            </>
        )
    }

    function getPriceDisplayCard(god) {
        let etherLastOffered = null;
        let etherLastBought = null;
        let etherTopBid = null;

        if (god.forSalePublic && god.lastOfferedPrice > 0 ) {
            etherLastOffered = parseFloat(ethers.utils.formatEther(god.lastOfferedPrice))
        }

        if (god.lastBoughtPrice > 0) {
            etherLastBought = parseFloat(ethers.utils.formatEther(god.lastBoughtPrice))
        }

        if (god.hasBid && god.lastBidder && god.owner && god.lastBidder.id !== god.owner.id) {
            etherTopBid = parseFloat(ethers.utils.formatEther(god.lastBid))
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
                if (idolMainContract && tokenContract && marketplaceContract && stethContract) {
                    try {
                        // Marketplace Approval Check
                        let isApproved = null;
                        isApproved = await idolMainContract.isApprovedForAll(account.toLowerCase(), marketplaceContractAddress)

                        // Get NFTs
                        const nftCount = await idolMainContract.balanceOf(account)

                        // Stats
                        const userIdolStaked = await marketplaceContract.getUserVirtueStake(account)

                        // User Vars
                        const pendingStethReward = await idolMainContract.getPendingStethReward(account)
                        const pendingWithdrawals = await marketplaceContract.pendingWithdrawals(account)


                        // Marketplace Approval Check
                        setIsApproved(isApproved)

                        // Stats
                        setUserIDOLStaked(ethers.utils.formatEther(userIdolStaked))
                        setNftsOwnedCount(nftCount.toString())

                        // User Vars
                        setPendingStethReward(ethers.utils.formatEther(pendingStethReward))
                        setPendingWithdrawals(ethers.utils.formatEther(pendingWithdrawals))

                        // Add event listeners
                    } catch(err) {
                        console.log('account dashboard fetch contract error', err)
                    }
                }
            } else {
                console.log(WRONG_NETWORK_MSG)
            }
        }
    }

    const accountGodsQuery = `
        query AccountGodDetails($first: Int, $skip: Int) {
            gods(first: $first, skip: $skip, where: {ownerID: "${account.toLowerCase()}"}, orderBy: forSalePublic, orderDirection: desc) {
                id
                ownerID
                owner {
                    id
                }
                forSalePublic
                lastOfferedPrice
                lastBoughtPrice
                hasBid
                lastBid
                lastBidder {
                    id
                }
                lastBidTimestamp
            }
        }
    `;

    const accountBidsReceivedQuery = `
        query AccountGodDetails($first: Int, $skip: Int) {
            gods(first: $first, skip: $skip, where: {hasBid: true, ownerID: "${account.toLowerCase()}", lastBidderID_not: "${account.toLowerCase()}"}) {
                id
                ownerID
                owner {
                    id
                }
                forSalePublic
                lastOfferedPrice
                hasBid
                lastBid
                lastBidderID
                lastBidder {
                    id
                }
                lastBidTimestamp
            }
        }
    `;

    const accountBidsPlacedQuery = `
        query AccountGodDetails($first: Int, $skip: Int) {
            gods(first: $first, skip: $skip, where: {hasBid: true, ownerID_not: "${account.toLowerCase()}", lastBidderID: "${account.toLowerCase()}"}) {
                id
                ownerID
                owner {
                    id
                }
                forSalePublic
                lastOfferedPrice
                hasBid
                lastBid
                lastBidderID
                lastBidder {
                    id
                }
                lastBidTimestamp
            }
        }
    `;

    const client = new ApolloClient({
        uri: GRAPH_URL,
        cache: new InMemoryCache(),
    })

    async function runQueries() {
        await updateIdolsOwned(1)
        await updateBidsReceived()
        await updateBidsPlaced()
    }

    async function updateIdolsOwned(pageNumber) {
        try {
            // NFTs
            const response = await client.query({
                query: gql(accountGodsQuery),
                variables: {
                    first: IDOLS_RESULTS_LIMIT,
                    skip: (pageNumber-1)*IDOLS_RESULTS_LIMIT
                },
            });
            
            if (response && response.data['gods'].length ) {
                const godsOwned = response.data['gods']
                let listedCount = 0;
                for (let god of godsOwned) {
                    if (god.forSalePublic) {
                        listedCount += 1;
                    }
                }

                setCurrentPage(pageNumber)
                setResults(godsOwned)
                setNftsForSale(listedCount)
                setLoading(false)
            }
        } catch (err) {
            console.log('account dashboard fetch graph', err)
        }
    }


    async function updateBidsReceived() {
        setBidsReceivedLoading(true)

        try {
            // NFTs
            const response = await client.query({
                query: gql(accountBidsReceivedQuery),
                variables: {
                    first: BIDS_RESULTS_LIMIT,
                    skip: 0
                },
            });
            
            if (response && response.data['gods'].length ) {
                const bidsReceived = response.data['gods']

                setNftBidsReceived(bidsReceived)
            }
            setBidsReceivedLoading(false)
        } catch (err) {
            console.log('bids received graph error', err)
        }
    }

    async function updateBidsPlaced() {
        setBidsPlacedLoading(true)

        try {
            // NFTs
            const response = await client.query({
                query: gql(accountBidsPlacedQuery),
                variables: {
                    first: BIDS_RESULTS_LIMIT,
                    skip: 0
                },
            });
            
            if (response && response.data['gods'].length ) {
                const bidsPlaced= response.data['gods']

                setNftBidsPlaced(bidsPlaced)
            }
            setBidsPlacedLoading(false)
        } catch (err) {
            console.log('bids placed graph error', err)
        }
    }

    async function loadDashboard() {
        await getEtherConversion()
        await getSTETHConversion() 
        await loadContract()
        await runQueries()
        setLoading(false)
    }

    useEffect(() => {
        if (walletLoaded) {
             loadDashboard()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletLoaded])

    return (
        <AccountStyles
            className='dashboard'
        >
            {
                loading &&
                <Loader />
            }
            
            {
                !loading &&
                <>
                    <section className='stats'>
                        <article>
                            <Link to={`/marketplace`}>
                                <p className='title'>IDOLs Owned</p>
                                <p>{nftsOwnedCount}</p>
                            </Link>
                        </article>

                        <article>
                            <Link to={`/marketplace`}>
                                <p className='title'>IDOLs Listed</p>
                                <p>{nftsForSale}</p>
                            </Link>
                        </article>

                        <article>
                            <Link to={`/stake`}>
                                <p className='title'>Your $VIRTUE Staked</p>
                                <p>{userIDOLStaked === '?' ? '?' : formatEtherString(userIDOLStaked)}</p>
                            </Link>
                        </article>
                    </section>


                    <section className='claim-wrapper'>

                        <article className='claim-steth'>
                            <p className='title'>stETH Earned</p>

                            <section>
                                <p className='reward-title'>IDOL Rewards</p>

                                <article>
                                    <p>{pendingStethReward === '?' ? '?' : <>{formatEtherString(pendingStethReward, 5)} stETH {formatEtherToUSD(stethConversion, pendingStethReward)}</>}</p>

                                    {
                                        pendingStethReward > 0 &&
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (txHash) {
                                                    setPopup({
                                                        type: 'transaction',
                                                    })
                                                    return;
                                                }
                                                sendRequestStethClaimAndUpdate();
                                            }}
                                        >Claim</button>
                                    }
                                </article>
                            </section>
                        </article>

                        <article className='claim-eth'>
                            <p className='title'>ETH Earned</p>
                            
                            <section>
                                <p className='reward-title'>Marketplace Sale Proceeds</p>

                                <article>
                                    <p>{pendingWithdrawals === '?' ? '?' : <>{formatEtherString(pendingWithdrawals, 5)} ETH {formatEtherToUSD(etherConversion, pendingWithdrawals)}</>}</p>

                                    {
                                        pendingWithdrawals > 0 &&
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (txHash) {
                                                    setPopup({
                                                        type: 'transaction',
                                                    })
                                                    return;
                                                }
                                                sendRequestMarketplaceWithdraw();
                                            }}
                                        >Claim</button>
                                    }
                                </article>
                            </section>


                        </article>

                    </section>

                    <section className='bids-wrapper'>

                        <article className='bids-on-your-gods'>
                            <section className='title-refresh-wrapper'>
                                <p className='title'>Bids on your IDOLs</p>
                                <button
                                    className={bidsReceivedLoading ? 'loading' : undefined}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        updateBidsReceived()
                                    }}
                                ><img src='/images/refresh.png' alt='Refresh Bids on Your Idols' /></button>
                            </section>

                            {
                                !bidsReceivedLoading &&
                                <section>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>ID</th>
                                                <th>Bid Price</th>
                                                <th>From</th>
                                                <th>Date</th>
                                                <th></th>
                                            </tr>

                                            {
                                                nftBidsReceived.length > 0 &&
                                                nftBidsReceived.map(nft => (
                                                    <tr
                                                        key={nft.id}
                                                    >
                                                        {getBidReceivedRow(nft)}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </section>
                            }
                        </article>

                        <article className='your-bids-on-gods'>

                            <section className='title-refresh-wrapper'>
                                <p className='title'>Your Bids on Marketplace IDOLs</p>
                                <button
                                    className={bidsPlacedLoading ? 'loading' : undefined}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        updateBidsPlaced()
                                    }}
                                ><img src='/images/refresh.png' alt='Refresh Your Bids On Idols' /></button>
                            </section>

                            {
                                !bidsPlacedLoading &&
                                <section>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>ID</th>
                                                <th>Bid Price</th>
                                                <th>Date</th>
                                                <th></th>
                                            </tr>

                                            {
                                                nftBidsPlaced.length > 0 &&
                                                nftBidsPlaced.map(nft => (
                                                    <tr
                                                        key={nft.id}
                                                    >
                                                        {getBidPlacedRow(nft)}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </section>
                            }
                        </article>

                    </section>

                    
                    {
                        results &&
                        <>
                            <ul className='results'>
                                {
                                    results.map(god => 
                                        <li
                                            key={god.id}
                                        >
                                            <Link to={`/idols/${god.id}`}>
                                                <ImageLazy
                                                    src={`${IMG_URL}${god.id}.jpg`} 
                                                    alt={`Idol ${god.id}`}
                                                />
                                                
                                                <section className='card-info'>
                                                    <article className='title-list-wrapper'>
                                                        <p className='card-title'>Idol #{god.id}</p>
                                                        <div className={god.forSalePublic ? 'listed' : 'unlisted'}>{god.forSalePublic ? 'LISTED' : 'UNLISTED'}</div>
                                                    </article>

                                                    <article className='price-wrapper'>
                                                        {
                                                            getPriceDisplayCard(god)
                                                        }            
                                                    </article>
                                                </section>
                                            </Link>
                                            
                                        </li>
                                    )
                                }
                            </ul>

                            {
                                nftsOwnedCount > IDOLS_RESULTS_LIMIT &&
                                <section className='pagination'>
                                    {
                                        currentPage !== 1 &&
                                        <button
                                            onClick={() => {
                                                setLoading(true)
                                                updateIdolsOwned(currentPage-1)
                                            }}
                                            disabled={loading}
                                        >&lt; Previous</button>
                                    }

                                    <p>Page {currentPage}</p>

                                    {
                                        (nftsOwnedCount > ( ((currentPage - 1) * IDOLS_RESULTS_LIMIT) + results.length)) &&
                                        <button
                                            onClick={() => {
                                                setLoading(true)
                                                updateIdolsOwned(currentPage+1)
                                            }}
                                            disabled={loading}
                                        >Next &gt;</button>
                                    }
                                </section>
                            }
                        </>
                    }     
                </>
            }
           
        </AccountStyles>
    )
}

export default Account;