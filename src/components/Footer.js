import React from 'react';
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";

import FooterStyles from '../styles/FooterStyles';

const Footer = () => {
    const location = useLocation();
    
    return (
        <FooterStyles
            // className={`${location.pathname === '/' || location.pathname === '/team' ? 'light':''}`}
        >
            <section>
                <a  
                    href='http://creativecommons.org/publicdomain/zero/1.0/'
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/images/publicdomain.png" alt="CC0"></img>
                </a>
            </section>
            
            <p>This is a decentralized app that is hosted on IPFS and not maintained by any central entity. You expressly understand and agree that your access to and use of the app is at your sole risk.</p>

            <a className='nftrarity' href="https://raritysniper.com/">NFT Rarity</a>
        </FooterStyles>
    )
}

export default Footer;