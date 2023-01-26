import React, { useContext, useState, useEffect } from 'react';
import { 
    ETHER_CONVERSION_URL, 
    GRAPH_URL, 
    NETWORK_ETH, 
    WRONG_NETWORK_MSG, 
    ETHERSCAN_URL 
} from '../utils/constants';
import { formatEtherString, formatEtherToUSD } from '../utils/numberFormat';
import { ReactComponent as Logo } from '../assets/logo_small.svg';

import { ethers } from 'ethers';
import axios from 'axios';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import Loader from './Loader';

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';
import { MarketplaceContext } from '../contexts/MarketplaceContext';

import StakeStyles from '../styles/StakeStyles';

const Stake = () => {
    const { 
        setPopup, 
        setTxHash, 
        txHash 
    } = useContext(PopupContext);
    const { 
        account, 
        network, 
        provider, 
        idolMainContractAddress, 
        tokenContractAddress, tokenContract, 
        marketplaceContract, marketplaceContractAddress, 
        virtueEthRewardsContract, 
        liquidityPoolContract,
        walletLoaded 
    } = useContext(WalletContext);
    const { 
        volumeTradedQuery
    } = useContext(MarketplaceContext);

    const [loading, setLoading] = useState(true); 
    const [etherConversion, setEtherConversion] = useState(null)

    // Staking Summary 
    const [totalVirtueStaked, setTotalVirtueStaked] = useState('?')
    const [totalRevenue, setTotalRevenue] = useState('?')
    const [ethAPR, setEthAPR] = useState(0)
    const [APRstreaming, setAPRstreaming] = useState(0)
    const [totalAPR, setTotalAPR] = useState('?')

    // Staking Vars
    const [allowance, setAllowance] = useState(null);

    const [userIDOL, setUserIDOL] = useState(0);
    const [userIDOLStaked, setUserIDOLStaked] = useState(0);

    const [stakeMode, setStakeMode] = useState('stake')

    const [idolAmount, setIdolAmount] = useState('');

    const [errorMsgStake, setErrorMsgStake] = useState('');

    // Rewards
    const [pendingEthReward, setPendingEthReward] = useState('?')
    const [pendingExternalEthReward, setPendingExternalEthReward] = useState('?')

    async function getEtherConversion() {
        const response = await axios.get(ETHER_CONVERSION_URL)
        setEtherConversion(response.data)
    }

    async function handleAmountChange(e) {
        const validNumber = new RegExp(/^\d*\.?\d*$/);
        if (validNumber.test(e.target.value)) {
            setIdolAmount(e.target.value)
        }
    }

    async function sendRequestStake() {
        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

            try {
                let tx;

                if (stakeMode === 'stake') {
                    tx = await contractWithSigner.increaseVirtueStake(ethers.utils.parseEther(idolAmount.toString()))
                } else {
                    tx = await contractWithSigner.decreaseVirtueStake(ethers.utils.parseEther(idolAmount.toString()))
                }
                
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
                console.log('stake request error', err)

                setErrorMsgStake('Please enter a valid $VIRTUE amount')
            }
        }
    }

    async function sendRequestEthClaimAndUpdate() {
        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

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
                console.log('eth claim error', err)
            }
        }
    }

    async function sendRequestExternalEthClaimAndUpdate() {
        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

            try {
                const tx = await contractWithSigner.claimExtraRewards(account)

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
                console.log('external eth claim error', err)
            }
        }
    }

    async function sendRequestApprove() {
        if (account && tokenContract) {
            const signer = provider.getSigner()
            const contractWithSigner = tokenContract.connect(signer);

            try {
                const tx = await contractWithSigner.approve(marketplaceContractAddress, ethers.constants.MaxUint256)
                
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
                console.log('stake request approve error', err)
            }
        }
    }



    function returnGodBoughtQuery(timestamp) {
        if (timestamp) {
            return `
                query GodBoughts {
                    godBoughts(first: 1, orderBy: timestamp, orderDirection: desc, where:{timestamp_lte: ${timestamp}}) {
                        cumulativeETH
                    }
                }
            `
        } else {
            return `
                query GodBoughts {
                    godBoughts(first: 1, orderBy: timestamp, orderDirection: desc) {
                        cumulativeETH
                    }
                }
            `
        }
       
    }

    const client = new ApolloClient({
        uri: GRAPH_URL,
        cache: new InMemoryCache(),
    })

    // Stats
    async function runQuery() {
        // Volume Traded
        let volTradedRes;
        // Staking APR
        const timestampCurrent = new Date().getTime()/1000;
        const timestampStart = Math.round(timestampCurrent - 604800);
        let ethAPR = null;
        let APRstream = null;
        let totalAPR = null;

        try {
            // Volume Traded
            const response = await client.query({
                query: gql(volumeTradedQuery)
            });

            const responseData = response.data.godBoughtAlls;

            if (responseData.length) {
                volTradedRes = parseFloat(ethers.utils.formatEther(responseData[0].value));
            }

            // Used to get ETH APR
            const responseCurrent = await client.query({
                query: gql(returnGodBoughtQuery() ),
            });

            const responseStart = await client.query({
                query: gql(returnGodBoughtQuery(timestampStart)),
            });

            const responseCurrentData = responseCurrent.data.godBoughts[0];
            const responseStartData = responseStart.data.godBoughts[0];

            if (!responseCurrentData) {
                // console.log('not enough sales data for APR')
            } else {
                if (responseCurrentData && responseCurrentData.cumulativeETH && tokenContract && liquidityPoolContract && virtueEthRewardsContract &&marketplaceContract) {
                    let cumulativeETHDiff = responseCurrentData.cumulativeETH;
                    if (responseStartData) {
                        cumulativeETHDiff -= responseStartData.cumulativeETH
                    }
    
                    const cumulativeETHDiffFormat = ethers.utils.formatEther(cumulativeETHDiff);
    
                    const idolBondAmount = await tokenContract.getVirtueBondAmt(ethers.utils.parseEther(".01"));
    
                    const idolBondAmountFormat = ethers.utils.formatEther(idolBondAmount)

                    let numTimes = idolBondAmountFormat;

                    const getdy = await liquidityPoolContract.get_dy(0, 1, ethers.BigNumber.from("10000000000000000"))

                    const getdyFormat = ethers.utils.formatEther(getdy)

                    if (getdyFormat > numTimes) {
                        numTimes = getdyFormat;
                    }
    
                    ethAPR = (cumulativeETHDiffFormat * 100) * numTimes * 52 * 100;

                    // Used to get Streaming APR
                    const rewardRate = await virtueEthRewardsContract.rewardRate();

                    const totalVirtueStake = await marketplaceContract.getTotalVirtueStake();

                    APRstream = (parseFloat(ethers.utils.formatEther(rewardRate)) * 3155760000 * numTimes * 100) / (parseFloat(ethers.utils.formatEther(totalVirtueStake)))                    
                }
            }
            
            if (volTradedRes) {
                setTotalRevenue(volTradedRes * 0.075)
            }

            if (ethAPR >= 0) {
                setEthAPR(ethAPR)
            }

            if (APRstream >= 0) {
                setAPRstreaming(APRstream)
            }

            // Add ETH APR with Streaming APR to get total APR
            if (ethAPR >= 0 && APRstream >= 0) {
                totalAPR = addAPR(ethAPR, APRstream)
                setTotalAPR(totalAPR)
            }
        } catch (err) {
            console.log('Stake graph error ', err)
        }
    }

    async function loadStake() {
        if (account && provider) {
            if (parseInt(network) === NETWORK_ETH) {
                if (tokenContract && marketplaceContract && virtueEthRewardsContract) {
                    try {
                        // Stats
                        const totalVirtueStakedRes = await tokenContract.balanceOf(marketplaceContractAddress)
                        
                        // User Vars
                        const allowanceAddress = await tokenContract.allowance(account, marketplaceContractAddress)

                        if (allowanceAddress.toString() === '0') {
                            setAllowance(false)
                        } else {
                            setAllowance(true)
                        }

                        const userIdol = await tokenContract.balanceOf(account)

                        const userIdolStaked = await marketplaceContract.getUserVirtueStake(account)

                        const pendingEthReward = await marketplaceContract.getPendingETHGain(account)

                        const pendingExternalEthReward = await virtueEthRewardsContract.earned(account)

                        // Stats
                        setTotalVirtueStaked(ethers.utils.formatEther(totalVirtueStakedRes))

                        // User Vars
                        setUserIDOL(ethers.utils.formatEther(userIdol))
                        setUserIDOLStaked(ethers.utils.formatEther(userIdolStaked))
                        setPendingEthReward(ethers.utils.formatEther(pendingEthReward))
                        setPendingExternalEthReward(ethers.utils.formatEther(pendingExternalEthReward))

                        // Add event listeners

                        setLoading(false)
                    } catch(err) {
                        console.log('stake load contract error', err)
                    }
                }
            } else {
                console.log(WRONG_NETWORK_MSG)
            }
        }
    }

    function addAPR(ethAPR, APRstreaming) {
        const eth = parseFloat(ethAPR);
        const APRstream = parseFloat(APRstreaming);

        return (eth + APRstream).toFixed(2);
    }

    async function loadStakeQuery() {
        await getEtherConversion()
        await loadStake()
        await runQuery()
    }

    useEffect(() => {
        if (walletLoaded) {
            loadStakeQuery()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletLoaded])

    return (
        <StakeStyles>
            {
                account === null ? (
                    <p className='please-connect'>Please Connect Your Wallet To Access $VIRTUE Staking + Rewards</p>
                ) :
                (
                    <>
                        {
                            loading &&
                            <Loader />
                        }

                        {
                            !loading &&
                            <>
                                <section className='summary-stake'>
                                    <article>
                                        <p className='title'>Total $VIRTUE Staked</p>
                                        <p>{totalVirtueStaked === '?' ? '?' : formatEtherString(totalVirtueStaked, 2)}</p>
                                        <p className='tooltip'>Total number of $VIRTUE tokens staked</p>
                                    </article>

                                    <article>
                                        <p className='title'>Total Staking Income</p>
                                        <p>{totalRevenue === '?' ? '?' : formatEtherString(totalRevenue)}Ξ</p>
                                        <p className='tooltip'>Cumulative amount of ETH paid to $VIRTUE stakers since inception</p>
                                    </article>

                                    <article>
                                        <p className='title'>Est. APR</p>
                                        <p>{totalAPR}%</p>
                                        <p className='tooltip'>Annualized APR estimate of staking $VIRTUE based on the last 7 days of trading activity. $VIRTUE price for calculating the APR estimate is based on the cheaper of the Curve LP and the bonding curve.</p>
                                    </article>

                                    <article>
                                        <p className='title'>Your $VIRTUE Staked</p>
                                        <p>{userIDOLStaked === '?' ? '?' : formatEtherString(userIDOLStaked)}</p>
                                    </article>
                                </section>

                                <section className='staking-rewards-wrapper'>
                                    <section className='staking-wrapper'>
                                        <section className='staking'>
                                            <div className='buttons-wrapper'>
                                                <button
                                                    className={`${ stakeMode === 'stake' ? "active-link" : ''}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setErrorMsgStake(null)
                                                        setStakeMode('stake')
                                                    }}
                                                >
                                                    Stake
                                                </button>
                                                <button
                                                    className={`${ stakeMode === 'unstake' ? "active-link" : ''}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setErrorMsgStake(null)
                                                        setStakeMode('unstake')
                                                    }}
                                                >
                                                    Unstake
                                                </button>
                                                <button
                                                    className={`${ stakeMode === 'info' ? "active-link" : ''}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setErrorMsgStake(null)
                                                        setStakeMode('info')
                                                    }}
                                                >
                                                    Info
                                                </button>
                                            </div>

                                            {
                                                stakeMode !== 'info' &&
                                                <>
                                                    <p className='stake-description'>{stakeMode === 'stake' ? "By staking $VIRTUE, you're earning a share of the 7.5% commission charged on IDOL NFT trades." : "Unstake your $VIRTUE token. Note that unstaked $VIRTUE does not earn anything."}</p>

                                                    <p className='errors'>{errorMsgStake}</p>

                                                    <section className='stake-form'>
                                                        <div className='input-wrapper'>
                                                            <input
                                                                id='idolAmount'
                                                                type='text' 
                                                                placeholder='0'
                                                                value={idolAmount}
                                                                onChange={handleAmountChange}
                                                            />
                                                            <label htmlFor='idolAmount'>
                                                                <p>{stakeMode === 'stake' ? "Amount of $VIRTUE tokens to deposit and stake": "Amount of $VIRTUE tokens to unstake"}</p>
                                                            </label>

                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (stakeMode === 'stake') {
                                                                        setIdolAmount(userIDOL)
                                                                    } else if (stakeMode === 'unstake') {
                                                                        setIdolAmount(userIDOLStaked)
                                                                    }
                                                                }}
                                                            >Max</button>

                                                            <Logo />
                                                        </div>

                                                        <p className='available'><span>Available= {stakeMode === 'stake' ? userIDOL : userIDOLStaked} $VIRTUE</span></p>

                                                        <section        
                                                            className='stake-form-buttons'
                                                        >
                                                            <button
                                                                className='approve-button'
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    sendRequestApprove();
                                                                }}
                                                                disabled={allowance !== false}
                                                            >APPROVE</button>

                                                            <button
                                                                className='stake-button'
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (stakeMode === 'stake') {
                                                                        if (idolAmount > userIDOL) {
                                                                            setErrorMsgStake('Please enter a valid $VIRTUE amount')
                                                                            return;
                                                                        }
                                                                    } else if (stakeMode === 'unstake') {
                                                                        if (idolAmount > userIDOLStaked) {
                                                                            setErrorMsgStake('Please enter a valid $VIRTUE amount')
                                                                            return;
                                                                        }
                                                                    }
                                                                    sendRequestStake();
                                                                }}
                                                                disabled={allowance !== true}
                                                            >{stakeMode === 'stake' ? 'STAKE $VIRTUE':'UNSTAKE $VIRTUE'}</button>
                                                        </section>
                                                        
                                                        <p className='disclaimer'>Note: Both Staking &amp; Unstaking $VIRTUE will automatically claim any pending rewards</p>
                                                    </section>
                                                </>
                                            }
                                        </section>

                                        {
                                            stakeMode === 'info' &&
                                            <section className='staking-info'>
                                                <p>Main Contract address</p>
                                                <a 
                                                    href={`${ETHERSCAN_URL}address/${idolMainContractAddress}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >{idolMainContractAddress}</a>

                                                <p>Marketplace Address</p>
                                                <a 
                                                    href={`${ETHERSCAN_URL}address/${marketplaceContractAddress}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >{marketplaceContractAddress}</a>

                                                <p>$VIRTUE Token Address</p>
                                                <a 
                                                    href={`${ETHERSCAN_URL}address/${tokenContractAddress}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >{tokenContractAddress}</a>
                                            </section>
                                        }
                                    </section>

                                    <section className='rewards-wrapper'>
                                        <section className='rewards'>
                                            <p className='title'>Rewards from Staked $VIRTUE</p>

                                            <section>
                                                <p className='reward-title'>Native Marketplace Rewards</p>

                                                <article>
                                                    <p>{pendingEthReward === '?' ? '?' : <>{formatEtherString(pendingEthReward, 5)} ETH {formatEtherToUSD(etherConversion, pendingEthReward)}</>}</p>

                                                    {
                                                        pendingEthReward > 0 &&
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (txHash) {
                                                                    setPopup({
                                                                        type: 'transaction',
                                                                    })
                                                                    return;
                                                                }
                                                                sendRequestEthClaimAndUpdate();
                                                            }}
                                                        >Claim</button>
                                                    }
                                                </article>
                                            </section>

                                            <section>
                                                <p className='reward-title'>External Marketplace Rewards</p>

                                                <article>
                                                    <p>{pendingExternalEthReward === '?' ? '?' : <>{formatEtherString(pendingExternalEthReward, 5)} ETH {formatEtherToUSD(etherConversion, pendingExternalEthReward)}</>}</p>

                                                    {
                                                        pendingExternalEthReward > 0 &&
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (txHash) {
                                                                    setPopup({
                                                                        type: 'transaction',
                                                                    })
                                                                    return;
                                                                }
                                                                sendRequestExternalEthClaimAndUpdate();
                                                            }}
                                                        >Claim</button>
                                                    }
                                                </article>
                                            </section>

                                        </section>
                                    </section>
                                </section>
                            </>
                        }
                    </> 
                )
            }

            
        </StakeStyles>
    )
}

export default Stake;