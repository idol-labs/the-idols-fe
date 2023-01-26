import React, {useContext, useEffect, useState, useRef} from 'react';
import { formatEtherToUSD } from '../utils/numberFormat';

import { ethers } from 'ethers';

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';

import PopupStyles from '../styles/PopupStyles';

const PopupBidAccept = () => {
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

    const [valueAccept, setValueAccept] = useState(0);

    const [errorMsg, setErrorMsg] = useState('');

    function handleValueAcceptChange(e) {
        const validNumber = new RegExp(/^\d*\.?\d*$/);
        if (validNumber.test(e.target.value)) {
            setValueAccept(e.target.value)
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

    async function sendRequestAcceptBid(id) {
        setErrorMsg('')

        if (valueAccept !== popup.value) {
            console.log('bid amount does not match')
                
            setErrorMsg('Please make sure bid amount matches')
            return;
        }

        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);
        
            try {
                const tx = await contractWithSigner.acceptBidForGod(id, ethers.utils.parseEther(valueAccept))

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
                console.log('accept bid error', err)
                
                setErrorMsg('Please enter a valid bid amount')
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
                className='bid-accept'
                ref={nodePopup}
            >
                {
                    popup && popup.value && popup.id &&
                    <>
                        <p className='popup-title'>Accept bid on Idol #{popup.id} for {popup.value}Ξ {formatEtherToUSD(popup.etherConversion, popup.value)}?</p>

                        <p className='errors'>{errorMsg}</p>
                      
                        <section>
                            <div className='input-wrapper'>
                                <input 
                                   id='bidAmount'
                                   type='text' 
                                   value={valueAccept}
                                   onChange={handleValueAcceptChange}
                                />
                                <label htmlFor='bidAmount'>Please Confirm Bid Amount (Ξ)</label>
                            </div>

                            <div className='buttons-wrapper'>
                                <button
                                    className='submit'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sendRequestAcceptBid(popup.id);
                                    }}
                                >Accept</button>

                                <button
                                    className='cancel'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPopup(null)
                                    }}
                                >Cancel</button>
                            </div>
                        </section>
                    </>
                }
            </section>
        </PopupStyles>
    );
};

export default PopupBidAccept;
