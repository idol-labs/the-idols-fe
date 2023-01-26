import React, { useState, useContext, useEffect } from 'react';
import { 
    NETWORK_ETH, 
    WRONG_NETWORK_MSG 
} from '../utils/constants';
import { formatEtherString} from '../utils/numberFormat';
import { ReactComponent as LogoBlue } from '../assets/logo_blue.svg';
import { ReactComponent as Logo } from '../assets/logo_small.svg';
import { ReactComponent as Ethereum } from '../assets/ethereum.svg';
import { ReactComponent as ChevronDown } from '../assets/chevron_down.svg';

import { ethers } from 'ethers';

import ImageLazy from './ImageLazy';

import { PopupContext } from '../contexts/PopupContext';
import { WalletContext } from '../contexts/WalletContext';

import AirdropsStyles from '../styles/AirdropsStyles';

import AirdropShares from '../addressMappings/virtuousbonus/airdropShares.json'
import Refunds from '../addressMappings/refunds/refunds.json';
import MarketplaceEthRefunds from '../addressMappings/refunds/marketplaceEth.json';
import MarketplaceVirtueRefunds from '../addressMappings/refunds/marketplaceVirtue.json';
import MarketplaceProceedsRefunds from '../addressMappings/refunds/marketplaceProceeds.json';
import VirtueRedeployRefunds from '../addressMappings/refunds/virtueRedeployRefunds.json';
import GoldlistMints from '../addressMappings/goldlist/goldlistMints.json';


const airdropShares = JSON.parse(JSON.stringify(AirdropShares))
const refunds = JSON.parse(JSON.stringify(Refunds))
const marketplaceEthRefunds = JSON.parse(JSON.stringify(MarketplaceEthRefunds))
const marketplaceVirtueRefunds = JSON.parse(JSON.stringify(MarketplaceVirtueRefunds))
const marketplaceProceedsRefunds = JSON.parse(JSON.stringify(MarketplaceProceedsRefunds))
const virtueRedeployRefunds = JSON.parse(JSON.stringify(VirtueRedeployRefunds))
const goldlistMints = JSON.parse(JSON.stringify(GoldlistMints))
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const Airdrops = () => {
    const { 
        setPopup, 
        txHash, 
        setTxHash 
    } = useContext(PopupContext);
    const { 
        account, 
        network, 
        provider, 
        offeringRefundContract, 
        virtuousHourContract, 
        marketplaceRefundContract, 
        marketplaceProceedsContract, 
        virtueRedeployContract, 
        goldlistContract, 
        walletLoaded 
    } = useContext(WalletContext);

    // Goldlist
    const [goldlistAccount, setGoldlistAccount] = useState('');
    const [goldlistAmount, setGoldlistAmount] = useState(0);
    const [hasGoldlist, setHasGoldlist] = useState(false);
    const [hasMinted, setHasMinted] = useState(false);
    const [goldlistPendingReward, setGoldlistPendingReward] = useState(0);

    // Marketplace Refunds
    const [pendingEthRefund, setPendingEthRefund] = useState(null);
    const [alreadyClaimedMarketplaceEth, setAlreadyClaimedMarketplaceEth] = useState(false)

    const [pendingVirtueRefund, setPendingVirtueRefund] = useState(null);
    const [alreadyClaimedMarketplaceVirtue, setAlreadyClaimedMarketplaceVirtue] = useState(false)

    const [pendingMarketplaceProceeds, setPendingMarketplaceProceeds] = useState(null);
    const [alreadyClaimedMarketplaceProceeds, setAlreadyClaimedMarketplaceProceeds] = useState(false)

    const [pendingVirtueRedeploy, setPendingVirtueRedeploy] = useState(null);
    const [alreadyClaimedVirtueRedeploy, setAlreadyClaimedVirtueRedeploy] = useState(false)

    // The Offering Refunds
    const [alreadyClaimed, setAlreadyClaimed] = useState(false)
    const [refundAmount, setRefundAmount] = useState(null);

    // Virtuous Hour
    const [virtuousAmount, setVirtuousAmount] = useState(null);
    const [accruedVirtue, setAccruedVirtue] = useState(null);
    const [alreadyClaimedV, setAlreadyClaimedV] = useState(false);

    // Dropdown Controls
    const [dropdownShowGoldlist, setDropdownShowGoldlist] = useState(true)
    const [dropdownShowGoldlistRewards, setDropdownShowGoldlistRewards] = useState(true)

    const [dropdownShowMarketplaceRefunds, setDropdownShowMarketplaceRefunds] = useState(false)
    const [dropdownShowOfferingRefunds, setDropdownShowOfferingRefunds] = useState(false)
    const [dropdownShowVirtuous, setDropdownShowVirtuous] = useState(false)


    async function loadAirdrops() {
        if (account && provider) {
            if (parseInt(network) === NETWORK_ETH) {
                if (virtuousHourContract && offeringRefundContract && marketplaceRefundContract && goldlistContract) {
                    // Godlist
                    setGoldlistAccount(account)

                    if (goldlistMints[account.toLowerCase()]) {
                        setHasGoldlist(true)
                        setGoldlistAmount(goldlistMints[account.toLowerCase()])

                        const alreadyMinted = await goldlistContract.alreadyMinted(account.toLowerCase())

                        if (alreadyMinted > 0) {
                            setHasMinted(true)
                        }
                    }
                    const goldlistPendingReward = await goldlistContract.getPendingVirtueReward(account.toLowerCase());
                    
                    setGoldlistPendingReward(ethers.utils.formatEther(goldlistPendingReward))

                    // Virtuous Hour
                    const totalVirtueReward = await virtuousHourContract.totalVirtueReward();
                    const totalShares = await virtuousHourContract.totalShares();
                    if (airdropShares[account.toLowerCase()]) {
                        const numShares = airdropShares[account.toLowerCase()];
                        const vAmount = numShares * ethers.utils.formatEther(totalVirtueReward) / totalShares;

                        const rewardPerShare = await virtuousHourContract.rewardPerShare();
                        const accruedV = ethers.utils.formatEther(rewardPerShare) * numShares;

                        const alreadyClaimedV = await virtuousHourContract.alreadyClaimed(account.toLowerCase());

                        const alreadyClaimedVFormat = ethers.utils.formatEther(alreadyClaimedV)

                        setVirtuousAmount(vAmount)
                        setAccruedVirtue(accruedV - alreadyClaimedVFormat)
                        setAlreadyClaimedV(alreadyClaimedVFormat)
                    }

                    // Refund
                    if (refunds[account.toLowerCase()]) {
                        setRefundAmount(ethers.utils.formatEther(refunds[account.toLowerCase()]))

                        const alreadyClaimed = await offeringRefundContract.alreadyClaimed(account.toLowerCase())

                        setAlreadyClaimed(alreadyClaimed)
                    }

                    // More Refunds
                    if (marketplaceEthRefunds[account.toLowerCase()]) {
                        setPendingEthRefund(ethers.utils.formatEther(marketplaceEthRefunds[account.toLowerCase()]))

                        const alreadyClaimed = await marketplaceRefundContract.alreadyClaimedEth(account.toLowerCase())

                        setAlreadyClaimedMarketplaceEth(alreadyClaimed)
                    }

                    if (marketplaceVirtueRefunds[account.toLowerCase()]) {
                        setPendingVirtueRefund(ethers.utils.formatEther(marketplaceVirtueRefunds[account.toLowerCase()]))

                        const alreadyClaimed = await marketplaceRefundContract.alreadyClaimedVirtue(account.toLowerCase())

                        setAlreadyClaimedMarketplaceVirtue(alreadyClaimed)
                    }

                    // Marketplace Proceeds Refunds
                    if (marketplaceProceedsRefunds[account.toLowerCase()]) {
                        setPendingMarketplaceProceeds(ethers.utils.formatEther(marketplaceProceedsRefunds[account.toLowerCase()]))

                        const alreadyClaimed = await marketplaceProceedsContract.alreadyClaimedEth(account.toLowerCase())

                        setAlreadyClaimedMarketplaceProceeds(alreadyClaimed)
                    }

                    // Virtue Redeploy Refunds
                    if (virtueRedeployRefunds[account.toLowerCase()]) {
                        setPendingVirtueRedeploy(ethers.utils.formatEther(virtueRedeployRefunds[account.toLowerCase()]))

                        const alreadyClaimed = await virtueRedeployContract.alreadyClaimedVirtue(account.toLowerCase())

                        setAlreadyClaimedVirtueRedeploy(alreadyClaimed)
                    }

                    
                    // Add event listeners
                }
            } else {
                console.log(WRONG_NETWORK_MSG)
            }
        }
    }

    async function sendRequestClaimBonus() {
        if (account && virtuousHourContract) {
            const signer = provider.getSigner()
            const contractWithSigner = virtuousHourContract.connect(signer);

            try {
                let merkleLeaves = [];
                for (const [addr, numShares] of Object.entries(airdropShares)) {
                    merkleLeaves.push(ethers.utils.solidityKeccak256(['address', 'uint'], [addr, numShares]));
                }
                let merkleTree = new MerkleTree(merkleLeaves, keccak256, { sortPairs: true });

                // CALLING FUNCTION
                let leaf = ethers.utils.solidityKeccak256(['address', 'uint'], [account.toLowerCase(), airdropShares[account.toLowerCase()]]);
                let merkleProof = merkleTree.getHexProof(leaf);

                const tx = await contractWithSigner.claimRewards(
                    account.toLowerCase(),
                    airdropShares[account.toLowerCase()],
                    merkleProof
                )

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
                console.log('claim refund error', err)
            }
        }
    }

    async function sendRequestClaimRefund() {
        if (account && offeringRefundContract) {
            const signer = provider.getSigner()
            const contractWithSigner = offeringRefundContract.connect(signer);

            try {
                const merkleLeaves = [];
                const addresses = Object.keys(refunds)
                for (let addr of addresses) {
                    const refundAmount = refunds[addr];
                    merkleLeaves.push(ethers.utils.solidityKeccak256(['address', 'uint'], [addr, refundAmount]));
                }
                const merkleTree = new MerkleTree(merkleLeaves, keccak256, { sortPairs: true });

                const merkleLeaf = ethers.utils.solidityKeccak256(['address', 'uint'], [account.toLowerCase(), refunds[account.toLowerCase()]]);
                const merkleProof = merkleTree.getHexProof(merkleLeaf);

                const tx = await contractWithSigner.claimRefund(
                    account.toLowerCase(),
                    refunds[account.toLowerCase()],
                    merkleProof
                )

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
                console.log('claim refund error', err)
            }
        }
    }

    async function sendRequestMarketplaceEthClaim() {
        if (account && marketplaceRefundContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceRefundContract.connect(signer);

            try {
                // Generate ETH merkle tree
                let ethMerkleLeaves = [];
                for (const [addr, refundAmount] of Object.entries(marketplaceEthRefunds)) {
                    ethMerkleLeaves.push(ethers.utils.solidityKeccak256(['address', 'uint'], [addr, refundAmount]));
                }
                let ethMerkleTree = new MerkleTree(ethMerkleLeaves, keccak256, { sortPairs: true });

                // Claim ETH refund
                let ethMerkleProof = ethMerkleTree.getHexProof(ethers.utils.solidityKeccak256(['address', 'uint'], [account.toLowerCase(), marketplaceEthRefunds[account.toLowerCase()]]));

                const tx = await contractWithSigner.claimEthRefund(
                    account.toLowerCase(),
                    marketplaceEthRefunds[account.toLowerCase()],
                    ethMerkleProof
                )

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
                console.log('claim marketplace eth refund error', err)
            }
        }
    }


    async function sendRequestVirtueClaim() {
        if (account && marketplaceRefundContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceRefundContract.connect(signer);

            try {
                // Generate VIRTUE merkle tree
                let virtueMerkleLeaves = [];
                for (const [addr, refundAmount] of Object.entries(marketplaceVirtueRefunds)) {
                virtueMerkleLeaves.push(ethers.utils.solidityKeccak256(['address', 'uint'], [addr, refundAmount]));
                }
                let virtueMerkleTree = new MerkleTree(virtueMerkleLeaves, keccak256, { sortPairs: true });

                // Claim VIRTUE refund
                let virtueMerkleProof = virtueMerkleTree.getHexProof(ethers.utils.solidityKeccak256(['address', 'uint'], [account.toLowerCase(), marketplaceVirtueRefunds[account.toLowerCase()]]));

                const tx = await contractWithSigner.claimVirtueRefund(
                    account.toLowerCase(),
                    marketplaceVirtueRefunds[account.toLowerCase()],
                    virtueMerkleProof
                )

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
                console.log('claim marketplace virtue refund error', err)
            }
        }
    }

    async function sendRequestMarketplaceProceedsClaim() {
        if (account && marketplaceProceedsContract) {
            const signer = provider.getSigner()
            const contractWithSigner = marketplaceProceedsContract.connect(signer);

            try {
                // Generate Marketplace Proceeds merkle tree
                let virtueMerkleLeaves = [];
                for (const [addr, refundAmount] of Object.entries(marketplaceProceedsRefunds)) {
                virtueMerkleLeaves.push(ethers.utils.solidityKeccak256(['address', 'uint'], [addr, refundAmount]));
                }
                let virtueMerkleTree = new MerkleTree(virtueMerkleLeaves, keccak256, { sortPairs: true });

                // Claim Marketplace Proceeds refund
                let virtueMerkleProof = virtueMerkleTree.getHexProof(ethers.utils.solidityKeccak256(['address', 'uint'], [account.toLowerCase(), marketplaceProceedsRefunds[account.toLowerCase()]]));

                const tx = await contractWithSigner.claimEthRefund(
                    account.toLowerCase(),
                    marketplaceProceedsRefunds[account.toLowerCase()],
                    virtueMerkleProof
                )

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
                console.log('claim marketplace proceeds refund error', err)
            }
        }
    }


    async function sendRequestVirtueRedeployClaim() {
        if (account && virtueRedeployContract) {
            const signer = provider.getSigner()
            const contractWithSigner = virtueRedeployContract.connect(signer);

            try {
                // Generate Virtue Redeploy Claim merkle tree
                let virtueMerkleLeaves = [];
                for (const [addr, refundAmount] of Object.entries(virtueRedeployRefunds)) {
                virtueMerkleLeaves.push(ethers.utils.solidityKeccak256(['address', 'uint'], [addr, refundAmount]));
                }
                let virtueMerkleTree = new MerkleTree(virtueMerkleLeaves, keccak256, { sortPairs: true });

                // Claim Virtue Redeploy Claim refund
                let virtueMerkleProof = virtueMerkleTree.getHexProof(ethers.utils.solidityKeccak256(['address', 'uint'], [account.toLowerCase(), virtueRedeployRefunds[account.toLowerCase()]]));

                const tx = await contractWithSigner.claimVirtueRefund(
                    account.toLowerCase(),
                    virtueRedeployRefunds[account.toLowerCase()],
                    virtueMerkleProof
                )

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
                console.log('claim marketplace proceeds refund error', err)
            }
        }
    }


    async function sendRequestClaimGoldlist(account) {
        if (account && goldlistContract) {
            const signer = provider.getSigner()
            const contractWithSigner = goldlistContract.connect(signer);

            try {
                // Generate Goldlist merkle tree
                let merkleLeaves = [];
                for (const [addr, claimAmount] of Object.entries(goldlistMints)) {
                merkleLeaves.push(ethers.utils.solidityKeccak256(['address', 'uint'], [addr, claimAmount]));
                }
                let merkleTree = new MerkleTree(merkleLeaves, keccak256, { sortPairs: true });


                // Claim Goldlist Mints
                let merkleProof = merkleTree.getHexProof(ethers.utils.solidityKeccak256(['address', 'uint'], [account.toLowerCase(), goldlistMints[account.toLowerCase()]]));

                const tx = await contractWithSigner.mint(
                    account.toLowerCase(),
                    goldlistMints[account.toLowerCase()],
                    merkleProof
                )

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
                console.log('claim goldlist error', err)
            }
        }
    }

    async function sendRequestClaimGoldlistReward() {
        if (account && goldlistContract) {
            const signer = provider.getSigner()
            const contractWithSigner = goldlistContract.connect(signer);

            try {
                const tx = await contractWithSigner.claimVirtueRewards(goldlistAccount.toLowerCase())
                
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
                console.log('goldlist claim error', err)
            }
        }
    }

    async function handleGoldlistInput(e) {
        const validAddress = new RegExp(/^[0-9a-fA-Fx]*$/);
        if (validAddress.test(e.target.value)) {
            const acc = e.target.value;
            setGoldlistAccount(acc);

            if (goldlistMints[acc.toLowerCase()] && goldlistContract) {
                setHasGoldlist(true)
                setGoldlistAmount(goldlistMints[acc.toLowerCase()])

                const alreadyMinted = await goldlistContract.alreadyMinted(acc.toLowerCase())

                if (alreadyMinted > 0) {
                    setHasMinted(true)
                } 
            } else {
                setHasGoldlist(false)
                setGoldlistAmount(0)
                setHasMinted(false)
            }

            if (ethers.utils.isAddress(acc.toLowerCase())) {
                const goldlistPendingReward = await goldlistContract.getPendingVirtueReward(acc.toLowerCase());

                setGoldlistPendingReward(ethers.utils.formatEther(goldlistPendingReward))
            } else {
                setHasGoldlist(false)
                setGoldlistAmount(0)
                setHasMinted(false)
                setGoldlistPendingReward(0)
            }
        }
    }


    useEffect(() => {
        if (walletLoaded) {
            loadAirdrops()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletLoaded])

    return (
        <AirdropsStyles>
            {
                account === null ? (
                    <p className='please-connect'>Please Connect Your Wallet To Access Claim Page</p>
                ) :
                (
                    <>
                        <LogoBlue />

                        <h1>Claims</h1>

                        <section className='airdrops-wrapper'>
                            
                            <section className='column-1'>
                                <article className='goldlist-wrapper'>
                                    {
                                        dropdownShowGoldlist ?
                                        <>
                                            <button
                                                className='dropdown-open'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDropdownShowGoldlist(!dropdownShowGoldlist);
                                                }}
                                            >
                                                <ChevronDown />
                                            </button>

                                            <ImageLazy
                                                src='/images/goldlist.png'
                                                alt='Goldlist'
                                            />

                                            <section>
                                                <div className='info'>
                                                    <p className='title'>Goldlist Nft</p>

                                                    <label htmlFor='goldlistInput'>Enter Goldlist Account</label>
                                                    <input 
                                                        id='goldlistInput'
                                                        type='text'
                                                        value={goldlistAccount}
                                                        onChange={handleGoldlistInput}
                                                    />

                                                    <p className='description'>You are eligible to claim {goldlistAmount} Goldlist NFT(s).</p>
                                                </div>

                                                {
                                                    hasGoldlist &&
                                                    <>
                                                        {
                                                            hasMinted ?
                                                            <section className='already-minted'>
                                                                <p >The above account has already claimed their Goldlist NFTs</p>
                                                            </section> :
                                                            <button
                                                                className='btn-claim'
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (txHash) {
                                                                        setPopup({
                                                                            type: 'transaction'
                                                                        })
                                                                        return;
                                                                    }
                                                                    sendRequestClaimGoldlist(goldlistAccount);
                                                                }}
                                                            >Claim</button>
                                                        }
                                                    </>
                                                }
                                                
                                            </section>
                                        </>:
                                        <button
                                            class='dropdown-collapsed'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setDropdownShowGoldlist(!dropdownShowGoldlist);
                                            }}
                                        >
                                            <p>Goldlist NFT</p>

                                            <ChevronDown />
                                        </button>
                                    }
                                </article>

                                <article className='accrued-goldlist-wrapper'>
                                    <button
                                        className={`${dropdownShowGoldlistRewards ? 'active':''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDropdownShowGoldlistRewards(!dropdownShowGoldlistRewards);
                                        }}
                                    >
                                        <p className='title'>Accrued Goldlist Rewards</p>
                                        
                                        <ChevronDown />
                                    </button>

                                    <section
                                        className={`accrued-goldlist ${dropdownShowGoldlistRewards ? 'active':''}`}
                                    >
                                        <section>
                                            <p className='reward-title'>
                                                <Logo />
                                                <span>VIRTUE</span>
                                            </p>

                                            <article>
                                                <p>{goldlistPendingReward ? `${formatEtherString(goldlistPendingReward)}`: 0} $VIRTUE</p>

                                                {
                                                    goldlistPendingReward > 0 &&
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (txHash) {
                                                                setPopup({
                                                                    type: 'transaction',
                                                                })
                                                                return;
                                                            }
                                                            sendRequestClaimGoldlistReward();
                                                        }}
                                                    >Claim</button>
                                                }
                                            </article>
                                        </section>
                                    </section>
                                </article>
                            </section>     

                            <section className='column-2'>
                                <article className='rewards-wrapper'>
                                    <button
                                        className={`${dropdownShowMarketplaceRefunds ? 'active':''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDropdownShowMarketplaceRefunds(!dropdownShowMarketplaceRefunds);
                                        }}
                                    >
                                        <p className='title'>Marketplace Refunds</p>
                                        
                                        <ChevronDown />
                                    </button>

                                    <section
                                        className={`rewards ${dropdownShowMarketplaceRefunds ? 'active':''}`}
                                    >
                                        <section>
                                            <p className='reward-title'>
                                                <Ethereum />
                                                <span>ETH</span>
                                            </p>

                                            <article>
                                                {
                                                    alreadyClaimedMarketplaceEth &&
                                                    <p>ETH Already Refunded</p> 
                                                }
                                                {
                                                    !alreadyClaimedMarketplaceEth &&
                                                    <>
                                                        <p>{pendingEthRefund ? `${formatEtherString(pendingEthRefund)}`: 0} ETH</p>

                                                        {
                                                            pendingEthRefund > 0 &&
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (txHash) {
                                                                        setPopup({
                                                                            type: 'transaction',
                                                                        })
                                                                        return;
                                                                    }
                                                                    sendRequestMarketplaceEthClaim();
                                                                }}
                                                            >Claim</button>
                                                        }
                                                    </>
                                                }
                                            </article>
                                        </section>

                                        <section>
                                            <p className='reward-title'>
                                                <Logo />
                                                <span>VIRTUE</span>
                                            </p>

                                            <article>
                                                {
                                                    alreadyClaimedMarketplaceVirtue &&
                                                    <p>Virtue Already Refunded</p> 
                                                }

                                                {
                                                    !alreadyClaimedMarketplaceVirtue &&
                                                    <>
                                                        <p>{pendingVirtueRefund ? `${formatEtherString(pendingVirtueRefund)}`: 0} $VIRTUE</p>

                                                        {
                                                            pendingVirtueRefund > 0 &&
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (txHash) {
                                                                        setPopup({
                                                                            type: 'transaction',
                                                                        })
                                                                        return;
                                                                    }
                                                                    sendRequestVirtueClaim();
                                                                }}
                                                            >Claim</button>
                                                        }
                                                    </>
                                                }
                                            </article>
                                        </section>

                                        <section>
                                            <p className='reward-title'>
                                                <Ethereum />
                                                <span>OS Marketplace Proceeds</span>
                                            </p>

                                            <article>
                                                {
                                                    alreadyClaimedMarketplaceProceeds &&
                                                    <p>OS Marketplace Proceeds Already Refunded</p> 
                                                }

                                                {
                                                    !alreadyClaimedMarketplaceProceeds &&
                                                    <>
                                                        <p>{pendingMarketplaceProceeds ? `${formatEtherString(pendingMarketplaceProceeds)}`: 0} ETH</p>

                                                        {
                                                            pendingMarketplaceProceeds > 0 &&
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (txHash) {
                                                                        setPopup({
                                                                            type: 'transaction',
                                                                        })
                                                                        return;
                                                                    }
                                                                    sendRequestMarketplaceProceedsClaim();
                                                                }}
                                                            >Claim</button>
                                                        }
                                                    </>
                                                }
                                            </article>
                                        </section>

                                        <section>
                                            <p className='reward-title'>
                                                <Logo />
                                                <span>Virtue Redeploy Claim</span>
                                            </p>

                                            <article>
                                                {
                                                    alreadyClaimedVirtueRedeploy &&
                                                    <p>Virtue Redeploy Already Claimed</p> 
                                                }

                                                {
                                                    !alreadyClaimedVirtueRedeploy &&
                                                    <>
                                                        <p>{pendingVirtueRedeploy ? `${formatEtherString(pendingVirtueRedeploy)}`: 0} $VIRTUE</p>

                                                        {
                                                            pendingVirtueRedeploy > 0 &&
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (txHash) {
                                                                        setPopup({
                                                                            type: 'transaction',
                                                                        })
                                                                        return;
                                                                    }
                                                                    sendRequestVirtueRedeployClaim();
                                                                }}
                                                            >Claim</button>
                                                        }
                                                    </>
                                                }
                                            </article>
                                        </section>
                                    </section>
                                </article>

                                <article className='offering-refund-wrapper'>
                                    <button
                                        className={`${dropdownShowOfferingRefunds ? 'active':''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDropdownShowOfferingRefunds(!dropdownShowOfferingRefunds);
                                        }}
                                    >
                                        <p className='title'>The Offering Refund</p>
                                        
                                        <ChevronDown />
                                    </button>

                                    <section
                                        className={`offering-refund ${dropdownShowOfferingRefunds ? 'active':''}`}
                                    >
                                        <section>
                                            <p className='reward-title'>
                                                <Ethereum />
                                                <span>ETH</span>
                                            </p>

                                            <article>
                                                {
                                                    alreadyClaimed &&
                                                    <p>ETH Already Refunded</p> 
                                                }
                                                {
                                                    !alreadyClaimed &&
                                                    <>
                                                        <p>{refundAmount ? `${formatEtherString(refundAmount)}`: 0} ETH</p>

                                                        {
                                                            refundAmount > 0 &&
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (txHash) {
                                                                        setPopup({
                                                                            type: 'transaction',
                                                                        })
                                                                        return;
                                                                    }
                                                                    sendRequestClaimRefund();
                                                                }}
                                                            >Claim</button>
                                                        }
                                                    </>
                                                }
                                            </article>
                                        </section>
                                    </section>

                                </article>

                                <article className='virtuous-wrapper'>
                                    {
                                        dropdownShowVirtuous ?
                                        <>
                                            <button
                                                className='dropdown-open'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDropdownShowVirtuous(!dropdownShowVirtuous);
                                                }}
                                            >
                                                <ChevronDown />
                                            </button>

                                            <ImageLazy
                                                src='/images/socordia.jpg'
                                                alt='Virtuous'
                                            />

                                            <section>
                                                <div className='info'>
                                                    <p className='title'>Virtuous Bonus</p>

                                                    <section>
                                                        <p className='description description-virtuous'>If you minted an NFT during the first hour of the Offering, you are entitled to claim $VIRTUE. This account has {accruedVirtue ? formatEtherString(accruedVirtue) : 0} $VIRTUE currently available to claim.</p>

                                                        <p className='description'>Total $VIRTUE: <span>{virtuousAmount ?formatEtherString(virtuousAmount) : 0}</span></p>

                                                        <p className='description'>Claimed $VIRTUE: <span>{alreadyClaimedV ? formatEtherString(alreadyClaimedV) : 0}</span></p>

                                                        <p className='description'>Claimable $VIRTUE: <span>{accruedVirtue ? formatEtherString(accruedVirtue) : 0}</span></p>
                                                    </section>
                                                </div>

                                                <button
                                                    className='btn-claim'
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (txHash) {
                                                            setPopup({
                                                                type: 'transaction'
                                                            })
                                                            return;
                                                        }
                                                        sendRequestClaimBonus();
                                                    }}
                                                >Claim</button>
                                            </section>
                                        </>:
                                        <button
                                            className='dropdown-collapsed'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setDropdownShowVirtuous(!dropdownShowVirtuous);
                                            }}
                                        >
                                            <p>Virtuous Bonus</p>

                                            <ChevronDown />
                                        </button>
                                    }
                                </article>
                            </section>

                        </section>
                    </>
                    
                )
            }

            
        </AirdropsStyles>
    )
}

export default Airdrops;