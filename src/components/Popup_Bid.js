import React, {useContext, useState, useEffect, useRef} from 'react';
import { formatEtherToUSD } from '../utils/numberFormat';
import { ReactComponent as Ethereum } from '../assets/ethereum.svg';

import { ethers } from 'ethers';

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';

import PopupStyles from '../styles/PopupStyles';

const PopupBid = () => {
    const { 
        popup, setPopup, 
        setTxHash 
    } = useContext(PopupContext);
    const { 
        account, 
        provider, 
        marketplaceContract 
    } = useContext(WalletContext);

    const nodePopup = useRef();

    const [bidValue, setBidValue] = useState(0);

    const [errorMsg, setErrorMsg] = useState('');

    function handleBidValueChange(e) {
        const validNumber = new RegExp(/^\d*\.?\d*$/);
        if (validNumber.test(e.target.value)) {
            setBidValue(e.target.value)
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

    async function sendRequestBid(id) {
        if (account && marketplaceContract) {
            setErrorMsg('')

            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

            try {
                const tx = await contractWithSigner.enterBidForGod(id, {value: ethers.utils.parseEther(bidValue.toString())})

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
                console.log('create bid error', err)
                
                setErrorMsg('Not enough ETH in wallet or bid is below top current bid')
            }
        }
    }

    async function sendRequestBidWithdraw(id) {
        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

            try {
                const tx = await contractWithSigner.withdrawBidForGod(id)

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
                console.log('bid withdraw error', err)
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
    }, []);


    return (
        <PopupStyles
            className='popup-overlay'
        >
            <section
                className='bid'
                ref={nodePopup}
            >
                {
                    popup && popup.id &&
                    <>
                        <p className='popup-title'>Bid on Idol #{popup.id}</p>
                        
                        <p className='errors'>{errorMsg}</p>

                        <section>
                            <div className='input-wrapper'>
                                <input 
                                    id='bidValue'
                                    type='text' 
                                    value={bidValue}
                                    onChange={handleBidValueChange}
                                />
                                    <label htmlFor='bidValue'>
                                    <p>Bid Amount (Ξ)</p>
                                </label>

                                <Ethereum />
                            </div>

                            <section className='prices'>
                                <p className='list-title'>List Price</p>
                                <p className='list-value'>{popup.listPrice}Ξ {formatEtherToUSD(popup.etherConversion, popup.listPrice)}</p>

                                <p className='current-title'>Current Top Bid</p>
                                <p className='current-value'>{popup.value}Ξ {formatEtherToUSD(popup.etherConversion, popup.value)}</p>
                            </section>

                            <div className='buttons-wrapper'>
                                <button
                                    className='btn-bid'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sendRequestBid(popup.id);
                                    }}
                                >Bid</button>

                                {
                                    popup.showWithdraw &&
                                    <button
                                        className='btn-bid-withdraw'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            sendRequestBidWithdraw(popup.id);
                                        }}
                                    >Withdraw Bid</button>
                                }
                            </div>

                            <p className='bid-disclaimer'>Placing a bid will hold the funds in the marketplace contract until either the bid is accepted or you make a transaction to withdraw your bid.</p>
                        </section>
                    </>
                }
            </section>
        </PopupStyles>
    );
};

export default PopupBid;
