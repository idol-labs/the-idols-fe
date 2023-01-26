import React, { useContext, useEffect, useRef } from 'react';
import { SWITCH_NETWORK_MSG } from '../utils/constants'

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';

import PopupStyles from '../styles/PopupStyles';

const PopupNetwork = () => {
    const { 
        popup, setPopup 
    } = useContext(PopupContext);
    const { 
        account, 
        network, 
        provider, 
        changeNetwork 
    } = useContext(WalletContext);

    const nodePopup = useRef();

    // Popup Handle Clicks
    const handleClick = (e) => {
        if (nodePopup.current && nodePopup.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setPopup(null);
    };

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
                className='notification'
                ref={nodePopup}
            >
                {
                    popup &&
                    <section>
                        <p>{SWITCH_NETWORK_MSG}</p>

                        <div className='buttons-wrapper'>
                            <button
                                className='submit'
                                onClick={(e) => {
                                    e.preventDefault();
                                    changeNetwork();
                                }}
                            >OK</button>
                            <button
                                className='cancel'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPopup(null)
                                }}
                            >Cancel</button>
                        </div>
                    </section>
                }
            </section>
        </PopupStyles>
    );
};

export default PopupNetwork;
