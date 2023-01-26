import React, {useContext, useEffect, useState, useRef} from 'react';

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
        idolMainContract,
        marketplaceContractAddress 
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

    async function sendRequestApprove() {
        if (account && idolMainContract) {
            const signer = provider.getSigner()
            const contractWithSigner = idolMainContract.connect(signer);

            try {
                const tx = await contractWithSigner.setApprovalForAll(marketplaceContractAddress, true)
                
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
                console.log('request approve error', err)

                setErrorMsg('Something went wrong with your Marketplace Approval')
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
                ref={nodePopup}
            >
                {
                    popup &&
                    <>
                        <p className='popup-title'>Approve Marketplace</p>

                        <p className='errors'>{errorMsg}</p>

                        <p>To perform this action you must do a one-time general approval for using the marketplace.</p>

                        <p className='approve-note'>Note: You only need to do this approval a SINGLE time, not once per Idol.</p>

                        <section>
                            <div className='buttons-wrapper'>
                                <button
                                    className='submit'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sendRequestApprove();
                                    }}
                                >Approve Marketplace</button>

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
