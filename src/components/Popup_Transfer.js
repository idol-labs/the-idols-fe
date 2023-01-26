import React, {useContext, useEffect, useState, useRef} from 'react';

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';

import PopupStyles from '../styles/PopupStyles';


const PopupTransfer = () => {
    const { 
        popup, setPopup, 
        setTxHash 
    } = useContext(PopupContext);
    const { 
        account, 
        network, 
        provider, 
        idolMainContract 
    } = useContext(WalletContext);

    const nodePopup = useRef();

    const [address, setAddress] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    async function handleAddressChange(e) {
        const validAddress = new RegExp(/^[0-9a-fA-Fx]*$/);
        if (validAddress.test(e.target.value)) {
            setAddress(e.target.value)
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

    async function sendRequestTransfer(id) {
        if (account && idolMainContract ) {
            const signer = provider.getSigner()
            const contractWithSigner = idolMainContract.connect(signer);

            try {
                const tx = await contractWithSigner.transferFrom(account, address, id)

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
                console.log('request transfer error', err)
                setErrorMsg('Please enter a valid address')
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
                className='transfer'
                ref={nodePopup}
            >
                {
                    popup && popup.id &&
                    <>
                        <p className='popup-title'>Transfer Idol #{popup.id}</p>
                   
                        <p className='errors'>{errorMsg}</p>

                        <section>
                            <div className='input-wrapper'>
                                <input 
                                   id='transferAddress'
                                   type='text' 
                                   value={address}
                                   onChange={handleAddressChange}
                                />
                                <label htmlFor='transferAddress'>
                                    <p>Transfer Address</p>
                                </label>
                            </div>
                            
                            <div className='buttons-wrapper'>
                                <button
                                    className='submit'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sendRequestTransfer(popup.id);
                                    }}
                                >Transfer</button>

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

export default PopupTransfer;
