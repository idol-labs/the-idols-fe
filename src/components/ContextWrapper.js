import React, {useContext} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PopupContext } from '../contexts/PopupContext';
import { NavContext } from '../contexts/NavContext';

import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import PopupNotification from './Popup_Notification';
import PopupNetwork from './Popup_Network';
import PopupTransaction from './Popup_Transaction';
import PopupMarketplaceApprove from './Popup_MarketplaceApprove';
import PopupBuy from './Popup_Buy';
import PopupBid from './Popup_Bid';
import PopupOffer from './Popup_Offer';
import PopupBidAccept from './Popup_BidAccept';
import PopupTransfer from './Popup_Transfer';
import PopupBond from './Popup_Bond';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Marketplace from './Marketplace';
import God from './God';
import Stake from './Stake';
import Bond from './Bond';
import Airdrops from './Airdrops';
import Activity from './Activity';

import GlobalStyles from '../styles/GlobalStyles';

function ContextWrapper() {
    if (window.location.pathname !== '/') {
        document.body.classList.add('app')
    } else {
        document.body.classList.remove('app')
    }    

    const { popup } = useContext(PopupContext);
    const { isHomePage } = useContext(NavContext);

    return (
        <section 
            id='app-wrapper'
            className={isHomePage ? 'is-home' : ''}
        >
            <BrowserRouter>
                {
                    !isHomePage &&
                    <Nav />
                }
                
                {
                    !isHomePage &&
                    <Header />
                }

                {
                    popup && popup.type === 'notification' && 
                    <PopupNotification />
                }

                {
                    popup && popup.type === 'network' && 
                    <PopupNetwork />
                }

                {
                    popup && popup.type === 'transaction' && 
                    <PopupTransaction />
                }

                {
                    popup && popup.type === 'marketplace-approve' && 
                    <PopupMarketplaceApprove />
                }

                {
                    popup && popup.type === 'buy' && 
                    <PopupBuy />
                }

                {
                    popup && popup.type === 'bid' && 
                    <PopupBid />
                }

                {
                    popup && popup.type === 'offer' && 
                    <PopupOffer />
                }

                {
                    popup && popup.type === 'bidaccept' && 
                    <PopupBidAccept />
                }

                {
                    popup && popup.type === 'transfer' && 
                    <PopupTransfer />
                }

                {
                    popup && popup.type === 'bond' && 
                    <PopupBond />
                }

                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={<Landing />}
                        />
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/marketplace"
                            element={<Marketplace />}
                        >
                        </Route>
                        <Route
                            path="/idols/:godId"
                            element={<God />}
                        />
                        <Route
                            path="/stake"
                            element={<Stake />}
                        />
                        <Route
                            path="/getvirtue"
                            element={<Bond />}
                        />
                        <Route
                            path="/claim"
                            element={<Airdrops />}
                        />
                        <Route
                            path="/activity"
                            element={<Activity />}
                        />
                    </Routes>

                    {
                        !isHomePage &&
                        <Footer />
                    }
                </main>

            </BrowserRouter>

            <GlobalStyles />
        </section>
    );
}

export default ContextWrapper;
