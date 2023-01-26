import React, {useContext, useEffect, useState, useRef} from 'react';
import { formatEtherToUSD } from '../utils/numberFormat';

import { PopupContext } from '../contexts/PopupContext';

import PopupStyles from '../styles/PopupStyles';

import { WalletContext } from '../contexts/WalletContext';

const PopupBuy = () => {
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

    const [errorMsg, setErrorMsg] = useState('');

    // Popup Handle Clicks
    const handleClick = (e) => {
        if (nodePopup.current && nodePopup.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setPopup(null);
    };

    async function sendRequestBuy(id) {
        if (account && marketplaceContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceContract.connect(signer);

            try {
                const godListing = await marketplaceContract.godListings(id)

                const minValue = godListing.minValue;

                const tx = await contractWithSigner.buyGod(id, {value: minValue})

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
                console.log('buy idol error', err)

                if (err.code && err.code === 'INSUFFICIENT_FUNDS') {
                    setErrorMsg('You do not have enough funds')
                }
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
                className='buy'
                ref={nodePopup}
            >
                {
                    popup && popup.value &&
                    <>
                        <p className='popup-title'>Buy Idol #{popup.id} for {popup.value}Ξ {formatEtherToUSD(popup.etherConversion, popup.value)}?</p>

                        <p className='errors'>{errorMsg}</p>

                        <section>
                            <div className='buttons-wrapper'>
                                <button
                                    className='submit'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sendRequestBuy(popup.id);
                                    }}
                                >Buy</button>

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

export default PopupBuy;
