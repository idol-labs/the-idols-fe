import React, { createContext, useState } from 'react';
import { 
    TOKEN_IMAGE_URL, 
    NETWORK_ETH, 
    NETWORK_CHAINID, 
    WRONG_NETWORK_MSG, 
    idolMainContractAddress, 
    mintContractAddress, 
    tokenContractAddress, 
    marketplaceContractAddress, 
    stethContractAddress, 
    virtueRewardsContractAddress, 
    offeringRefundContractAddress, 
    marketplaceRefundContractAddress, 
    marketplaceProceedsContractAddress, 
    virtueRedeployContractAddress, 
    virtueEthRewardsContractAddress, 
    goldlistContractAddress, 
    virtueZapperContractAddress, 
    liquidityPoolContractAddress ,
    gnosisAddress, 
    virtuousHourAddress, 
    infuraID 
} from '../utils/constants';

import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import IdolMainContract from '../contracts/IdolMain.json'
import MintContract from '../contracts/Mint.json'
import TokenContract from '../contracts/IdolToken.json'
import MarketplaceContract from '../contracts/IdolMarketplace.json'
import StethContract from '../contracts/Steth.json'
import VirtueRewardsContract from '../contracts/VirtueRewards.json'
import OfferingRefundContract from '../contracts/OfferingRefund.json'
import VirtuousHourContract from '../contracts/VirtuousHour.json'
import MarketplaceRefundContract from '../contracts/MarketplaceRefundContract.json'
import MarketplaceProceedsContract from '../contracts/MarketplaceProceeds.json'
import VirtueRedeployContract from '../contracts/VirtueRedeployClaim.json'
import VirtueEthRewardsContract from '../contracts/VirtueEthRewards.json'
import GoldlistContract from '../contracts/IdolGoldlist.json'
import VirtueZapperContract from '../contracts/VirtueZapper.json'
import LiquidityPoolContract from '../contracts/LiquidityPool.json'
export const WalletContext = createContext();

const WalletContextProvider = (props) => {    
    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [provider, setProvider] = useState(null);

    const [idolMainContract, setIdolMainContract] = useState(null);
    const [mintContract, setMintContract] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);
    const [marketplaceContract, setMarketplaceContract] = useState(null);
    const [stethContract, setStethContract] = useState(null);
    const [virtueRewardsContract, setVirtueRewardsContract] = useState(null);
    const [offeringRefundContract, setOfferingRefundContract] = useState(null);
    const [virtuousHourContract, setVirtuousHourContract] = useState(null);
    const [marketplaceRefundContract, setMarketplaceRefundContract] = useState(null);
    const [marketplaceProceedsContract, setMarketplaceProceedsContract] = useState(null);
    const [virtueRedeployContract, setVirtueRedeployContract] = useState(null);
    const [virtueEthRewardsContract, setVirtueEthRewardsContract] = useState(null);
    const [goldlistContract, setGoldlistContract] = useState(null);
    const [virtueZapperContract, setVirtueZapperContract] = useState(null);
    const [liquidityPoolContract, setLiquidityPoolContract] = useState(null);

    // walletFinished means it finished trying to load
    // walletLoaded means it was successful
    const [walletFinished, setWalletFinished] = useState(false);
    const [walletLoaded, setWalletLoaded] = useState(false);

    // Web3Modal
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: infuraID // required
            }
        }
    };
    
    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });


    async function loadBlockchain(e) {
        try {
            const instance = await web3Modal.connect();

            const provider = new ethers.providers.Web3Provider(instance);
            
            const accounts = await provider.listAccounts()
            const network = await provider.getNetwork()

            if (accounts.length) {
                setAccount(accounts[0])
                setNetwork(network.chainId)
                setProvider(provider)

                // Load Contracts
                if (accounts[0] && provider) {
                    if (parseInt(network.chainId) === NETWORK_ETH) {
                        const idolMainContract = new ethers.Contract(idolMainContractAddress, IdolMainContract, provider)
        
                        const mintContract = new ethers.Contract(mintContractAddress, MintContract, provider)
        
                        const tokenContract = new ethers.Contract(tokenContractAddress, TokenContract, provider)
        
                        const marketplaceContract = new ethers.Contract(marketplaceContractAddress, MarketplaceContract, provider)

                        const stethContract = new ethers.Contract(stethContractAddress, StethContract, provider)

                        const virtueRewardsContract = new ethers.Contract(virtueRewardsContractAddress, VirtueRewardsContract, provider)

                        const offeringRefundContract = new ethers.Contract(offeringRefundContractAddress, OfferingRefundContract, provider)

                        const virtuousHourContract = new ethers.Contract(virtuousHourAddress, VirtuousHourContract, provider)

                        const marketplaceRefundContract = new ethers.Contract(marketplaceRefundContractAddress, MarketplaceRefundContract, provider)

                        const marketplaceProceedsContract = new ethers.Contract(marketplaceProceedsContractAddress, MarketplaceProceedsContract, provider)

                        const virtueRedeployContract = new ethers.Contract(virtueRedeployContractAddress, VirtueRedeployContract, provider)

                        const virtueEthRewardsContract = new ethers.Contract(virtueEthRewardsContractAddress, VirtueEthRewardsContract, provider)

                        const goldlistContract = new ethers.Contract(goldlistContractAddress, GoldlistContract, provider)

                        const virtueZapperContract = new ethers.Contract(virtueZapperContractAddress, VirtueZapperContract, provider)

                        const liquidityPoolContract = new ethers.Contract(liquidityPoolContractAddress, LiquidityPoolContract, provider)
        
                        if (idolMainContract && 
                            mintContract && 
                            tokenContract && 
                            marketplaceContract && 
                            stethContract && 
                            virtueRewardsContract && 
                            offeringRefundContract && 
                            virtuousHourContract && 
                            marketplaceRefundContract && 
                            marketplaceProceedsContract && 
                            virtueRedeployContract && 
                            virtueEthRewardsContract &&
                            goldlistContract && 
                            virtueZapperContract &&
                            liquidityPoolContract
                        ) {
                            try {
                                setIdolMainContract(idolMainContract)
                                setMintContract(mintContract)
                                setTokenContract(tokenContract)
                                setMarketplaceContract(marketplaceContract)
                                setStethContract(stethContract)
                                setVirtueRewardsContract(virtueRewardsContract)
                                setOfferingRefundContract(offeringRefundContract)
                                setVirtuousHourContract(virtuousHourContract)
                                setMarketplaceRefundContract(marketplaceRefundContract)
                                setMarketplaceProceedsContract(marketplaceProceedsContract)
                                setVirtueRedeployContract(virtueRedeployContract)
                                setVirtueEthRewardsContract(virtueEthRewardsContract)
                                setGoldlistContract(goldlistContract)
                                setVirtueZapperContract(virtueZapperContract)
                                setLiquidityPoolContract(liquidityPoolContract)

                                setWalletLoaded(true)
                                setWalletFinished(true)

                                // Add event listeners
                            } catch(err) {
                                console.log('setting contracts error', err)

                                setWalletFinished(true)
                            }
                        }
                    } else {
                        console.log(WRONG_NETWORK_MSG)

                        setWalletFinished(true)
                    }
                }
            }

            // Add listeners 
            // WalletConnect does not work with these listeners?
            provider.on("accountsChanged", (accounts) => {
                setAccount(accounts[0]);
                window.location.reload();
            });
            provider.on("chainChanged", () => {
                window.location.reload();
            });

            // Metamask specific
            const { ethereum } = window;
            const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
            if (metamaskIsInstalled) {
                ethereum.on("accountsChanged", (accounts) => {
                    setAccount(accounts[0]);
                    window.location.reload();
                });
                ethereum.on("chainChanged", async () => {
                    window.location.reload();
                });
            }
            
        } catch(err) {
            console.log('wallet loading error', err)
            setWalletFinished(true)
        }
    }

    async function pageLoadBlockchain() {
        if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
            loadBlockchain()
        } else {
            setWalletFinished(true)
        }
    }

    async function disconnectBlockchain() {
        try {
            await web3Modal.clearCachedProvider();
        } catch(err) {
            console.log('disconnect error', err)
        }
        window.location.reload();
    }

    // Metamask specific
    async function changeNetwork() {
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            return window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{
                    chainId: NETWORK_CHAINID
                }]
            })
        }
    }

    async function addIDOLTokenToWallet() {
        if (window.ethereum) {
            window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20',
                  options: {
                    address: tokenContractAddress,
                    symbol: '$VIRTUE',
                    decimals: 18,
                    image: TOKEN_IMAGE_URL
                  }
                }
            });
        }
    }
  
    return (
        <WalletContext.Provider value={{ 
            account, 
            network,
            provider,
            loadBlockchain,
            pageLoadBlockchain,
            disconnectBlockchain,
            changeNetwork,
            addIDOLTokenToWallet,
            idolMainContractAddress, idolMainContract,
            mintContract,
            tokenContractAddress, tokenContract,
            marketplaceContractAddress, marketplaceContract,
            stethContractAddress, stethContract,
            virtueRewardsContract,
            offeringRefundContract,
            virtuousHourContract,
            marketplaceRefundContract,
            marketplaceProceedsContract,
            virtueRedeployContract,
            virtueEthRewardsContract,
            goldlistContract,
            virtueZapperContract,
            liquidityPoolContract,
            gnosisAddress,
            walletLoaded,
            walletFinished
        }}>
            {props.children}
        </WalletContext.Provider>
    )
}


export default WalletContextProvider;