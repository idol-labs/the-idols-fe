import { useEffect, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Discord } from '../assets/discord.svg';
import { ReactComponent as Gitbook } from '../assets/gitbook.svg';
import { ReactComponent as Twitter } from '../assets/twitter.svg';
import { ReactComponent as Medium } from '../assets/medium.svg';
import { ReactComponent as Rarity } from '../assets/rarity.svg';
import { ReactComponent as Snapshot } from '../assets/snapshot.svg';

import ImageLazy from './ImageLazy';

import { NavContext } from '../contexts/NavContext';

import NavStyles from '../styles/NavStyles';

const Nav = () => {
    const nodeNav = useRef();
    const {
        navShow, setNavShow
    } = useContext(NavContext)

    function handleClick(e) {
        if (window.innerWidth >= 980) {
            return;
        }
        if (nodeNav.current && nodeNav.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setNavShow(false)
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
        <NavStyles
            className={navShow ? 'active' : null}
            ref={nodeNav}
        >
            <section>
                
                <section className='socials'>
                    <a 
                        href='https://snapshot.org/#/theidols.eth'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Snapshot />
                    </a>

                    <a 
                        href='https://discord.gg/theidolsnft'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Discord />
                    </a>

                    <a 
                        href='https://docs.theidols.io'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Gitbook />
                    </a>

                    <a 
                        href='https://twitter.com/TheIdolsNFT'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Twitter />
                    </a>
                
                    <a 
                        href='https://medium.com/@IdolLabs/introducing-the-idols-the-first-staked-eth-nft-2b971ba46e6a'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Medium />
                    </a>

                    <a 
                        class='rarity'
                        href='https://raritysniper.com/idols'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Rarity />
                    </a>                
                </section>
                
                <a 
                    href='/'
                    target="_blank"
                    rel="noopener noreferrer"
                    className='nav-hero'
                >
                    <ImageLazy
                        src='/images/hero_nav.png' 
                        alt='Idols homepage' 
                        
                    />
                </a>

                <nav className='nav-main'>
                    <NavLink 
                        to="/dashboard" 
                        className={({ isActive }) =>
                            `${ isActive ? "active-link" : ''}`
                        }
                        onClick={() => {
                            setNavShow(false)
                        }}
                    >
                        <span>Dashboard</span>
                    </NavLink>
                    
                    <NavLink 
                        to="/marketplace"
                        className={({ isActive }) =>
                            `${ isActive ? "active-link" : ''}`
                        }
                        onClick={() => {
                            setNavShow(false)
                        }}
                    >
                        <span>Marketplace</span>
                    </NavLink>

                    <NavLink 
                        to="/getvirtue"
                        className={({ isActive }) =>
                            `${ isActive ? "active-link" : ''}`
                        }
                        onClick={() => {
                            setNavShow(false)
                        }}
                    >
                        <span>Get VIRTUE</span>
                    </NavLink>


                    <NavLink 
                        to="/stake"
                        className={({ isActive }) =>
                            `${ isActive ? "active-link" : ''}`
                        }
                        onClick={() => {
                            setNavShow(false)
                        }}
                    >
                        <span>Stake</span>
                    </NavLink>
                  
                    <NavLink 
                        to="/claim"
                        className={({ isActive }) =>
                            `${ isActive ? "active-link" : ''}`
                        }
                        onClick={() => {
                            setNavShow(false)
                        }}
                    >
                        <span>Claim</span>
                    </NavLink>
                </nav>
                
            </section>
        </NavStyles>
    )
}

export default Nav;