import React, {useContext, useEffect, useRef} from 'react';

import { ethers } from 'ethers';

import { WalletContext } from '../contexts/WalletContext';
import { PopupContext } from '../contexts/PopupContext';

import PopupStyles from '../styles/PopupStyles';

const PopupBond = () => {
    const { 
        popup, setPopup, 
        setTxHash 
    } = useContext(PopupContext);
    const { 
        account, 
        provider, 
        idolMainContract, 
        tokenContract,
        virtueZapperContract,  
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


    async function sendRequestBond(stethAmount, mode) {
        if (account && tokenContract && idolMainContract && virtueZapperContract) {
            const signer = provider.getSigner()
            
            try {
                const idolBondCurrent = await tokenContract.getVirtueBondAmt(ethers.utils.parseEther(stethAmount))

                let tx;
                if (mode === 'eth') {
                    const contractWithSigner = virtueZapperContract.connect(signer);
                    tx = await contractWithSigner.swapForVirtue( idolBondCurrent.mul(999).div(1000), { value: ethers.utils.parseEther(stethAmount) })
                }
                if (mode === 'steth') {
                    const contractWithSigner = idolMainContract.connect(signer);
                    tx = await contractWithSigner.getVirtue(ethers.utils.parseEther(stethAmount), idolBondCurrent)
                }
                
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
                console.log('bond request error', err)
                
                // setErrorMsgBond('Please enter a valid STETH amount')
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
                className='bond'
                ref={nodePopup}
            >
                {
                    popup && popup.value && popup.mode &&
                    <>
                        <p>Bonding is one way action, {popup.mode === 'eth' ? 'ETH' : 'stETH'} that is bonded cannot be retrieved back. You may be able to acquire $VIRTUE at a price cheaper than the bonding curve <a href='https://curve.fi/factory-crypto/50' target="_blank"
                        rel="noopener noreferrer">here</a></p>

                        <section>
                            <div className='buttons-wrapper'>
                                <button
                                    className='submit'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sendRequestBond(popup.value, popup.mode);
                                    }}
                                >Confirm</button>

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

export default PopupBond;
