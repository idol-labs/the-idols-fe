import React, { useEffect, useContext } from 'react';
import { NETWORK_ETH } from '../utils/constants'

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';

const WalletConnect = () => {
    const { setPopup } = useContext(PopupContext);
    const { 
        account, 
        network, 
        loadBlockchain, 
        pageLoadBlockchain, 
        disconnectBlockchain 
    } = useContext(WalletContext);

    useEffect(() => {
        pageLoadBlockchain();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className='wallet-connect'>
            {
                account === null ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            loadBlockchain();
                        }}
                    ><span>Connect</span></button>
                ) :
                (
                    parseInt(network) !== NETWORK_ETH ? (
                        <button
                            className='wrong-network'
                            onClick={(e) => {
                                e.preventDefault()
                                setPopup({
                                    type: 'network'
                                })
                            }}
                        ><span>Wrong network</span></button>
                    ) :
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            disconnectBlockchain()
                        }}
                    ><span>Disconnect</span></button>
                )
            }
        </section>
    )
}

export default WalletConnect;