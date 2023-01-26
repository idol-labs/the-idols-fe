import React, { createContext, useState } from 'react';

export const PopupContext = createContext();

const PopupContextProvider = (props) => {
    const [popup, setPopup] = useState(null);

    const [txHash, setTxHash] = useState(false);

    return (
        <PopupContext.Provider value={{ 
            popup, 
            setPopup,
            txHash,
            setTxHash
        }}>
            {props.children}
        </PopupContext.Provider>
    )
}


export default PopupContextProvider;