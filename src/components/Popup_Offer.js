import React, { useContext, useEffect, useState, useRef } from 'react';
import { formatEtherToUSD } from '../utils/numberFormat';
import { ReactComponent as Ethereum } from '../assets/ethereum.svg';

import { ethers } from 'ethers';

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';

import PopupStyles from '../styles/PopupStyles';

const PopupOffer = () => {
    const { 
        popup, setPopup, 
        setTxHash 
    } = useContext(PopupContext);
    const { 
        account, 
        network, 
        provider, 
        marketplaceContract 
    } = useContext(WalletContext);

    const nodePopup = useRef();

    const [confirmPhase, setConfirmPhase] = useState(false);

    const [value, setValue] = useState(0);
    const [toAddress, setToAddress] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    async function handleValueChange(e) {
        const validNumber = new RegExp(/^\d*\.?\d*$/);
        if (validNumber.test(e.target.value)) {
            setValue(e.target.value)
        }
    }

    async function handleToAddressChange(e) {
        const validAddress = new RegExp(/^[0-9a-fx]*$/i);
        if (validAddress.test(e.target.value)) {
            setToAddress(e.target.value)
        }
    }

    // Popup Handle Clicks
    const handleClick = (e) => {
        if (nodePopup.current && nodePopup.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setPopup(null);
    };

    async function sendRequestOffer(id) {
        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

            try {

                let tx;
                if (toAddress) {
                    tx = await contractWithSigner.postGodListingForAddress(id, ethers.utils.parseEther(value), toAddress)
                } else {
                    tx = await contractWithSigner.postGodListing(id, ethers.utils.parseEther(value))
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
                console.log('list offer error', err)

                setErrorMsg('Please enter a valid to address or leave blank')
            }
        }
    }

    async function sendRequestOfferWithdraw(id) {
        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

            try {
                const tx = await contractWithSigner.removeGodListing(id)

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
                console.log('withdraw offer error', err)
            }
        }
    }

    // Handle popup mouse clicks
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, network, provider]);


    return (
        <PopupStyles
            className='popup-overlay'
        >
            <section
                className='offer'
                ref={nodePopup}
            >
                {
                    popup && popup.id &&
                    <>
                        <p className='popup-title'>List Idol #{popup.id} for sale</p>

                        <p className='errors'>{errorMsg}</p>

                        {
                            confirmPhase ?
                            <section>
                                <article className='confirm-dialog'>
                                    <p>{`Are you sure you want to offer Idol #${popup.id} for ${value}Ξ?`}</p>
                                    {
                                       toAddress && 
                                       <p>(Only offered to {toAddress})</p>
                                    }
                                </article>
                                
                                <div className='buttons-wrapper'>
                                    <button
                                        className='submit'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            sendRequestOffer(popup.id);
                                        }}
                                    >Yes</button>
                                    <button
                                        className='cancel'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setConfirmPhase(false)
                                        }}
                                    >No</button>
                                </div>
                            </section>:
                            <section>
                                <div className='input-wrapper'>
                                    <input 
                                        id='value'
                                        type='text' 
                                        value={value}
                                        onChange={handleValueChange}
                                    />
                                     <label htmlFor='value'>
                                        <p>Listing Price (Ξ)</p>
                                    </label>

                                     <Ethereum />
                                </div>
                               
                                <div className='input-wrapper to-address'>
                                    <input 
                                        id='toAddress'
                                        type='text' 
                                        value={toAddress}
                                        onChange={handleToAddressChange}
                                    />
                                    <label htmlFor='toAddress'>
                                        <p>Sell to Specific Address (optional)</p>
                                    </label>
                                </div>

                                <section className='prices'>
                                    <p className='current-title'>Current Listed Price</p>
                                    <p className='current-value'>{popup.value}Ξ {formatEtherToUSD(popup.etherConversion, popup.value)}</p>

                                    <p className='new-title'>New List Price</p>
                                    <p className='new-value'>{value}Ξ {formatEtherToUSD(popup.etherConversion, value)}</p>
                                </section>

                                <div className='buttons-wrapper'>
                                    <button
                                        className='btn-list'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!value) {
                                                setErrorMsg('Must enter a amount greater than 0')
                                                return;
                                            }
                                            if (toAddress.length > 0) {
                                                if (toAddress.toUpperCase() === account.toUpperCase()) {
                                                    setErrorMsg('Address cannot be your own')
                                                    return;
                                                }
                                                if (toAddress.length !== 42) {
                                                    setErrorMsg('Please enter a valid address')
                                                    return;
                                                }
                                            }
                                            setErrorMsg(null)
                                            setConfirmPhase(true)
                                        }}
                                    >List</button>

                                    {
                                        popup.showDelist &&
                                        <button
                                        className='btn-delist'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            sendRequestOfferWithdraw(popup.id);
                                        }}
                                        >Delist</button>
                                    }
                                   
                                </div>

                                <p className='offer-disclaimer'>NOTE: After your NFT is sold, you will need to claim the unsettled proceeds from the dashboard.</p>
                            </section>
                        }
                        
                    </>
                }
            </section>
        </PopupStyles>
    );
};

export default PopupOffer;
