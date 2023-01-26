import React, { useContext, useEffect, useRef } from 'react';
import { ETHERSCAN_URL } from '../utils/constants'

import { PopupContext } from '../contexts/PopupContext';

import Loader from './Loader';

import PopupStyles from '../styles/PopupStyles';

const PopupTransaction = () => {
    const { 
        popup, setPopup, 
        txHash 
    } = useContext(PopupContext);

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
    }, []);


    return (
        <PopupStyles
            className='popup-overlay'
        >
            <section
                ref={nodePopup}
                className='transaction'
            >
                {
                    popup && 
                    <>
                        <Loader />
                        {
                            txHash &&
                            <p>
                                <span>Your transaction is pending, you can view your status</span>
                                <a
                                    href={`${ETHERSCAN_URL}tx/${txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >here</a>
                            </p>
                        }
                    </>
                }
            </section>
        </PopupStyles>
    );
};

export default PopupTransaction;
