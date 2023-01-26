import React, { useContext, useState, useEffect } from 'react';
import { 
    STETH_CONVERSION_URL, 
    NETWORK_ETH, 
    WRONG_NETWORK_MSG 
} from '../utils/constants';
import { formatUSD, formatEtherString, formatUSDString } from '../utils/numberFormat';
import { ReactComponent as Logo } from '../assets/logo_small.svg';
import { ReactComponent as Lido } from '../assets/lido.svg';

import { ethers } from 'ethers';
import axios from 'axios';

import Loader from './Loader';

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';

import FAQ_PART from './FAQ_PART';

import BondStyles from '../styles/BondStyles';

const Bond = () => {
    const { 
        setPopup, 
        setTxHash, 
        txHash 
    } = useContext(PopupContext);
    const { 
        account, 
        network, 
        provider, 
        idolMainContractAddress, idolMainContract, 
        tokenContract, 
        stethContract, 
        walletLoaded 
    } = useContext(WalletContext);

    const [loading, setLoading] = useState(true); 
    const [stethConversion, setStethConversion] = useState(null)

    // Bonding Summary 
    const [treasuryBalance, setTreasuryBalance] = useState('?')
    const [treasuryValue, setTreasuryValue] = useState('?')

    const [idolExchangeRate, setIdolExchangeRate] = useState('?');

    // Bonding Vars
    const [userETH, setUserETH] = useState(0);
    const [userSTETH, setUserSTETH] = useState(0);
    const [userIDOL, setUserIDOL] = useState(0);

    const [allowance, setAllowance] = useState(null);
    const [stethAmount, setStethAmount] = useState(0);
    const [idolBond, setIdolBond] = useState(0);

    const [bondMode, setBondMode] = useState('eth')

    const [errorMsgBond, setErrorMsgBond] = useState('');


    async function getSTETHConversion() {
        const response = await axios.get(STETH_CONVERSION_URL)

        if (response.data && response.data.USD) {
            setStethConversion(response.data)
            return response.data.USD;
        } 
    }

    async function handleStethAmountChange(e) {
        const validNumber = new RegExp(/^\d*\.?\d*$/);
        if (validNumber.test(e.target.value)) {
            setStethAmount(e.target.value)

            try {
                const idolBond = await tokenContract.getVirtueBondAmt(ethers.utils.parseEther(e.target.value))

    
                setIdolBond(ethers.utils.formatEther(idolBond))
    
            } catch(err) {
                console.log('steth amount change error', err)
            }
        }
    }

    async function handleStethMax(max) {
        setStethAmount(max)

        try {
            const idolBond = await tokenContract.getVirtueBondAmt(ethers.utils.parseEther(max))


            setIdolBond(ethers.utils.formatEther(idolBond))

        } catch(err) {
            console.log('steth max change error', err)
        }
    }


    async function sendRequestApprove() {
        if (account && idolMainContract && stethContract) {
            const signer = provider.getSigner()
            const contractWithSigner = stethContract.connect(signer);

            try {
                const tx = await contractWithSigner.approve(idolMainContract.address, ethers.constants.MaxUint256)
                
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
                console.log('bond request approve error', err)

                setErrorMsgBond('Something went wrong with your approval')
            }
        }
    }

    async function loadBond() {
        if (account && provider) {
            if (parseInt(network) === NETWORK_ETH) {
                if (idolMainContract && tokenContract && stethContract) {
                    try {
                        // Stats
                        const treasuryBalanceRes = await idolMainContract.stethPrincipalBalance()

                        const stethConversionRes = await getSTETHConversion();

                        const treasuryValueRes = ethers.utils.formatEther(treasuryBalanceRes) * stethConversionRes;

                        // User Vars
                        const balanceETH = await provider.getBalance(account)

                        const balanceSTETH = await stethContract.balanceOf(account)

                        const userIdol = await tokenContract.balanceOf(account)

                        const exchangeRate = await tokenContract.getVirtueBondAmt(ethers.utils.parseEther("1"))

                        const allowanceAddress = await stethContract.allowance(account, idolMainContract.address)

                        if (allowanceAddress.toString() === '0') {
                            setAllowance(false)
                        } else {
                            setAllowance(true)
                        }

                        // Stats
                        setTreasuryBalance(ethers.utils.formatEther(treasuryBalanceRes))
                        setTreasuryValue(treasuryValueRes)

                        // User Vars
                        setUserETH(ethers.utils.formatEther(balanceETH))
                        setUserSTETH(ethers.utils.formatEther(balanceSTETH))
                        setUserIDOL(ethers.utils.formatEther(userIdol))
                        setIdolExchangeRate(ethers.utils.formatEther(exchangeRate));

                        // Add event listeners

                        setLoading(false)
                    } catch(err) {
                        console.log('bond load contract', err)
                    }
                }
            } else {
                console.log(WRONG_NETWORK_MSG)
            }
        }
    }

    async function loadBondQuery() {
        await loadBond()
    }

    useEffect(() => {
        if (walletLoaded) {
            loadBondQuery()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletLoaded])

    return (
        <BondStyles>
            {
                account === null ? (
                    <p className='please-connect'>Please Connect Your Wallet To Bond</p>
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
                                <section className='summary-bond'>
                                    <article className='balance'>
                                        <p className='title'>Principal Treasury Balance</p>
                                        <p className='data'>
                                            <Lido />
                                            <span>
                                                {treasuryBalance === '?' ? '?' : formatEtherString(treasuryBalance, 0)}
                                            </span>
                                        </p>
                                        <p className='tooltip'>Amount of stETH in the Idol Treasury</p>
                                    </article>

                                    <article>
                                        <p className='title'>Treasury Value</p>
                                        <p>${treasuryValue === '?' ? '?' : formatUSDString(treasuryValue)}</p>
                                        <p className='tooltip'>USD Value of Idol Treasury</p>
                                    </article>

                                    <article>
                                        <a 
                                            href="https://www.coingecko.com/en/coins/lido-staked-ether"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <p className='title'>stETH Price</p>
                                            <p>{stethConversion ? `${formatUSD(stethConversion.USD)}` : null}</p>
                                        </a>
                                    </article>
                                </section>

                                <section className='bonding-faq-wrapper'>
                                    <section className='bonding'>
                                        <div className='buttons-wrapper'>
                                            <button
                                                className={`${ bondMode === 'eth' ? "active-link" : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setErrorMsgBond(null)
                                                    setBondMode('eth')
                                                }}
                                            >ETH</button>
                                            <button
                                                className={`${ bondMode === 'steth' ? "active-link" : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setErrorMsgBond(null)
                                                    setBondMode('steth')
                                                }}
                                            >stETH</button>
                                        </div>

                                        <p className='errors'>{errorMsgBond}</p>

                                        <section className='bond-form'>
                                            <div className='input-wrapper'>
                                                <input
                                                    id='stethInput'
                                                    type='text' 
                                                    value={stethAmount}
                                                    onChange={handleStethAmountChange}
                                                />
                                                <label htmlFor='stethInput'>
                                                    <p>Amount of {bondMode === 'eth' ? 'ETH': 'stETH'} to bond</p>
                                                </label>

                                                {
                                                    bondMode === 'steth' &&
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleStethMax(userSTETH)
                                                        }}
                                                    >Max</button>
                                                }

                                                <Logo />
                                            </div>
                                        </section>

                                        <p className='available'><span>Available= {bondMode === 'eth' ? `${userETH} ETH` : `${userSTETH} stETH`}</span></p>

                                        <section className='bonding-results'>
                                            <p className='title'>You Will Receive:</p>
                                            <p>{formatEtherString(idolBond)} $VIRTUE</p>

                                            <p className='title'>Exchange Rate:</p>
                                            <p>1 {bondMode === 'eth' ? 'ETH' : 'stETH'} = {idolExchangeRate === '?' ? '?' : formatEtherString(idolExchangeRate)} $VIRTUE</p>

                                            <p className='title'>Current $VIRTUE Balance:</p>
                                            <p>{userIDOL} $VIRTUE</p>
                                        </section>

                                        <section        
                                            className='bonding-form-buttons'
                                        >
                                            {                           
                                                bondMode === 'steth' &&
                                                <button
                                                    className='approve-button'
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        sendRequestApprove();
                                                    }}
                                                    disabled={allowance !== false}
                                                >APPROVE</button>
                                            }
                                           

                                            <button
                                                className='bond-button'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (stethAmount <= 0) {
                                                        return;
                                                    }
                                                    if (txHash) {
                                                        setPopup({
                                                            type: 'transaction'
                                                        })
                                                        return;
                                                    }
                                                    setPopup({
                                                        type: 'bond',
                                                        value: stethAmount,
                                                        mode: bondMode
                                                    })
                                                }}
                                                disabled={bondMode === 'steth' && allowance !== true}
                                            >BOND {bondMode === 'eth' ? 'ETH' : 'stETH'}</button>
                                        </section>            
                                    </section>

                                    <section className='faq'>
                                        <FAQ_PART
                                            question={'What is VIRTUE?'}
                                            answer={<p>$VIRTUE token is a standard ERC20 token on the Ethereum Blockchain. Find out more <a href='https://docs.theidols.io/usdvirtue-token' target="_blank"
                                            rel="noopener noreferrer">here</a>.</p>}
                                            show={true}
                                        />

                                        <FAQ_PART
                                            question={'Is there liquidity for VIRTUE?'}
                                            answer={<p>Yes. You can trade VIRTUE on this curve.fi v2 pool <a href='https://curve.fi/factory-crypto/50' target="_blank"
                                            rel="noopener noreferrer">here</a></p>}
                                            show={false}
                                        />

                                        <FAQ_PART
                                            question={'What is stETH?'}
                                            answer={<p>stETH is a token that represents staked ether in Lido, combining the value of initial deposit + staking rewards. Get some <a href='https://stake.lido.fi/?ref=0x82AF9d2Ea81810582657f6DC04B1d7d0D573F616' target="_blank"
                                            rel="noopener noreferrer">here</a></p>}
                                            show={false}
                                        />

                                        <FAQ_PART
                                            question={'I have some stETH or ETH. What now?'}
                                            answer={<p>You’re ready to bond either stETH or ETH for VIRTUE!<br/>&nbsp;1. Select the ‘ETH’ or ‘stETH’ tab<br/>&nbsp;2. Input amount to bond<br/>&nbsp;3. Click ‘Approve’<br/>&nbsp;4. Click ‘Bond stETH’ / ‘Bond ETH’ to confirm.</p>}
                                            show={false}
                                        />
                                    </section>
                                </section>
                            </>
                        }
                    </> 
                )
            }

            
        </BondStyles>
    )
}

export default Bond;