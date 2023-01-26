import React, { useContext, useEffect, useRef } from 'react';

import { PopupContext } from '../contexts/PopupContext';

import PopupStyles from '../styles/PopupStyles';

const PopupNotification = () => {
    const { 
        popup, setPopup 
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
                className='notification'
                ref={nodePopup}
            >
                {
                    popup && popup.message &&
                    <p>{popup.message}</p>
                }
            </section>
        </PopupStyles>
    );
};

export default PopupNotification;
