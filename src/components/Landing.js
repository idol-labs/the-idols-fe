import React, { useState, useRef } from 'react';
import { ReactComponent as Expand } from '../assets/expand.svg';
import { ReactComponent as Discord } from '../assets/discord.svg';
import { ReactComponent as Gitbook } from '../assets/gitbook.svg';
import { ReactComponent as Twitter } from '../assets/twitter.svg';
import { ReactComponent as Medium } from '../assets/medium.svg';
import { ReactComponent as Rarity } from '../assets/rarity.svg';
import { ReactComponent as Snapshot } from '../assets/snapshot.svg';

import ImageLazy from './ImageLazy';

import MarqueeText from './MarqueeText';

import Carousel from './Carousel';

import LandingStyles from '../styles/LandingStyles';


const Landing = () => {
    const [linksShow, setLinksShow] = useState(false)

    // Refs
    const neptuneVideoRef = useRef(null);

    function handleHeader() {
        setLinksShow(!linksShow)
    }

    function handleNeptuneEnter() {
        neptuneVideoRef.current.play();
    }

    function handleNeptuneLeave() {
        neptuneVideoRef.current.pause();
    }


    return (
        <LandingStyles>

            <section className='landing-wrapper'>

                <nav 
                    className={`landing-header ${linksShow ? 'active' : null}`}
                >
                    <picture className='logo'>
                        <img
                            src='/images/logo_border.png' 
                            alt='$VIRTUE token' 
                        />
                    </picture>

                    <a 
                        className='enter-app'
                        href='/marketplace'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>ENTER APP</span>
                    </a>  

                    <button 
                        onClick={handleHeader}
                        className='expand'
                    >
                        <Expand />
                    </button>

                    <article 
                        className='socials'
                    >
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
                    </article>
                </nav>

                <picture className='landing-hero'>
                    <source 
                        srcSet="/images/hero_desktop.jpg"
                        media="(min-width: 768px)" 
                    />
                    <img
                        src='/images/hero_mobile.jpg' 
                        alt='Various Idol NFTs surrounding text spelling THE IDOLS in all uppercase letters' 
                    />
                </picture>

                <section className='marquee-icon-wrapper'>
                    <picture className='logo'>
                        <img
                            src='/images/token.png' 
                            alt='$VIRTUE token' 
                        />
                    </picture>

                    <article className='marquee'>
                        <ul className='marquee-content'>
                            <MarqueeText />
                            <MarqueeText />
                            <MarqueeText />
                            <MarqueeText />
                        </ul>
                    </article>
                </section>
                
                <section className='wallpaper-description-wrapper'>
                    <p>The Idols are the guardians of Ethereum. Born from an Offering that locked away staked ETH forever, the Idols made a solemn vow to protect the blockchain for all time.</p>

                    <article 
                        className='samples'
                        onMouseEnter={handleNeptuneEnter}
                        onMouseLeave={handleNeptuneLeave}
                    >
                        <ImageLazy
                            src='/images/idol_sample_ape.jpg' alt='Ape Idol NFT' 
                        />

                        <section className='neptune'>
                            <ImageLazy
                                src='/images/idol_sample_neptune.png' alt='Neptune Idol NFT' 
                            />

                            <video
                                muted
                                loop
                                playsInline
                                src='/images/idol_sample_neptune.mp4'
                                ref={neptuneVideoRef}
                            ></video>
                        </section>

                        <ImageLazy
                            src='/images/idol_sample_zombie.jpg' alt='Armored Zombie Idol NFT'
                        />
                    </article>

                    <article className='token-wrapper'>
                        <p className='token-title'>$VIRTUE TOKEN</p>

                        <ImageLazy
                            src='/images/token.png' 
                            alt='$VIRTUE token' 
                            className='logo'
                        />

                        <p className='token-description'>$VIRTUE is an ERC20 token that can be staked to earn a proportional share of the commission on all Idol NFT trades.</p>
                    </article>

                    <article className='landing-bottom'>
                        <picture className='wallpaper'>
                            <source 
                                srcSet="/images/wallpaper_art_desktop.png"
                                media="(min-width: 768px)" 
                            />
                            <img
                                src='/images/wallpaper_art_mobile.png' 
                                alt='' 
                            />
                        </picture>

                        <section
                            className='cycle-mobile'
                        >
                            <p>How It Works</p>

                            <Carousel />
                        </section>

                        <ImageLazy
                            src='/images/cycle_desktop.png' 
                            alt='Virtuous Cycle diagram: For IDOL NFT Owners, 7.5% commission on Idol NFT sales paid to $VIRTUE Stakers. For $VIRTUE Stakers, stETH is bonded into IDOL Treasury to obtain $VIRTUE.  For the IDOL Treasury, IDOL Treasury pays stETH rewards to IDOL NFT Owners. Then the cycle repeats.'
                            className='cycle-desktop'
                        />

                        <section className='seen-on-wrapper'>
                            <div className='blur'></div>
                            
                            <p className='seen-on-title'>AS SEEN ON</p>

                            <section className='seen-on-list'>
                                <a 
                                    href='https://members.delphidigital.io/reports/nft-insights-alethea-ai-gem-overtakes-genie-the-idols-drop/'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ImageLazy
                                        src='/images/seenon_delphi.png' 
                                        alt='Delphi Digital ;ogo'
                                        className='delphi'
                                    />
                                </a>
                                <a 
                                    href='https://thereadingape.substack.com/p/bankless-ama-with-the-idols?s=r'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ImageLazy
                                        src='/images/seenon_ape.png' 
                                        alt='Ape logo'
                                        className='ape'
                                    />
                                </a>
                                <a 
                                    href='https://thedefiant.io/is-this-the-nft-defi-crossover-weve-all-been-waiting-for-idols-steth-bond-virtue/'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ImageLazy
                                        src='/images/seenon_defiant.png' 
                                        alt='Defiant logo'
                                        className='defiant'
                                    />
                                </a>
                                <a 
                                    href='https://metaversal.banklesshq.com/p/nft-themes-on-the-rise?s=r'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ImageLazy
                                        src='/images/seenon_bankless.png' 
                                        alt='Bankless logo'
                                        className='bankless'
                                    />
                                </a>
                            </section>
                        </section>
                    </article>
                </section>

            </section>
        </LandingStyles>
    )
}

export default Landing;