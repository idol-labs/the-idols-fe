import React from 'react';

import PopupContextProvider from './contexts/PopupContext';
import NavContextProvider from './contexts/NavContext';
import WalletContextProvider from './contexts/WalletContext';
import MarketplaceContextProvider from './contexts/MarketplaceContext';

import ContextWrapper from './components/ContextWrapper';

function App() {
    return (
        <PopupContextProvider>
            <NavContextProvider>
                <WalletContextProvider>
                    <MarketplaceContextProvider>
                        <ContextWrapper />
                    </MarketplaceContextProvider>
                </WalletContextProvider>
            </NavContextProvider>
        </PopupContextProvider>
    );
}

export default App;
