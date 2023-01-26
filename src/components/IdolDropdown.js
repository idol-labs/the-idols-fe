import React, { useContext } from 'react';
import { NETWORK_ETH } from '../utils/constants';

import { WalletContext } from '../contexts/WalletContext';

const IdolDropdown = () => {
    const { 
        account, 
        network, 
        addIDOLTokenToWallet 
    } = useContext(WalletContext);

    return (
        account && network === NETWORK_ETH &&
        <article className='idol-dropdown'>
            <button><span>$VIRTUE</span></button>
            <section>
                <p>Add Token To Wallet</p>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addIDOLTokenToWallet();
                    }}
                >$VIRTUE</button>
            </section>
        </article>
    )
}

export default IdolDropdown;