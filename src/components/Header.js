import React, { useContext } from 'react';
import { useLocation } from "react-router-dom"
import { ReactComponent as Hamburger } from '../assets/hamburger.svg';

import { NavContext } from '../contexts/NavContext';

import IdolDropdown from './IdolDropdown';
import WalletConnectButton from './WalletConnectButton';

import HeaderStyles from '../styles/HeaderStyles';

const Header = () => {
    const location = useLocation();

    const { 
        setNavShow, navShow
    } = useContext(NavContext);
    
    function handleNav() {
        setNavShow(!navShow)
    }
    return (
        <HeaderStyles
            // className={`${location.pathname === '/' || location.pathname === '/team' ? 'light':''}`}
        >
            <button
                onClick={handleNav}
                className='hamburger'
            >
                <Hamburger />
            </button>

            <section className='header-buttons'>
                <IdolDropdown />
                <WalletConnectButton />
            </section>
            
        </HeaderStyles>
    )
}

export default Header;