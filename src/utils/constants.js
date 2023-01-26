export const ETHER_CONVERSION_URL = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';

export const STETH_CONVERSION_URL = 'https://min-api.cryptocompare.com/data/price?fsym=STETH&tsyms=USD';
 
export const GRAPH_URL = process.env.REACT_APP_GRAPH_URL;

export const IMG_URL = '/images/idols/';

export const TOKEN_IMAGE_URL = 'https://theidols.io/images/token.png';

export const HYYPE_URL = 'https://api.hyy.pe/api/v1';

export const NETWORK_ETH = parseInt(process.env.REACT_APP_NETWORK_ETH);

let network_chainid;
let etherscan_url;
let wrong_network_msg;
let switch_network_msg;

if (NETWORK_ETH === 4) {
    network_chainid = '0x4';
    etherscan_url = 'https://rinkeby.etherscan.io/';
    wrong_network_msg = 'Must be on Rinkeby Test Network';
    switch_network_msg = 'Switch to Rinkeby Test Network?';
} else {
    network_chainid = '0x1';
    etherscan_url = 'https://etherscan.io/';
    wrong_network_msg = 'Must be on Ethereum Mainnet';
    switch_network_msg = 'Switch to Ethereum Mainnet';
}

export const NETWORK_CHAINID = network_chainid;

export const ETHERSCAN_URL = etherscan_url;

export const WRONG_NETWORK_MSG = wrong_network_msg;

export const SWITCH_NETWORK_MSG = switch_network_msg;

export const idolMainContractAddress = process.env.REACT_APP_IDOL_MAIN_ADDR;

export const mintContractAddress = process.env.REACT_APP_MINT_ADDR;

export const tokenContractAddress = process.env.REACT_APP_TOKEN_ADDR;

export const marketplaceContractAddress = process.env.REACT_APP_MARKETPLACE_ADDR;

export const stethContractAddress = process.env.REACT_APP_STETH_ADDR;

export const virtueRewardsContractAddress = process.env.REACT_APP_VIRTUE_REWARDS;

export const offeringRefundContractAddress = process.env.REACT_APP_OFFERING_REFUND;

export const gnosisAddress = process.env.REACT_APP_GNOSIS_ADDR;

export const virtuousHourAddress = process.env.REACT_APP_VIRTUOUS_HOUR;

export const marketplaceRefundContractAddress = process.env.REACT_APP_MARKETPLACE_REFUND;

export const marketplaceProceedsContractAddress = process.env.REACT_APP_MARKETPLACE_PROCEEDS;

export const virtueRedeployContractAddress = process.env.REACT_APP_VIRTUE_REDEPLOY;

export const virtueEthRewardsContractAddress = process.env.REACT_APP_VIRTUE_ETH_REWARDS;

export const goldlistContractAddress = process.env.REACT_APP_GOLDLIST;

export const virtueZapperContractAddress = process.env.REACT_APP_VIRTUE_ZAPPER;

export const liquidityPoolContractAddress = process.env.REACT_APP_LIQUIDITY_POOL;

export const infuraID = process.env.REACT_APP_INFURA_ID;

export const hyypeClientID = process.env.REACT_APP_HYYPE_CLIENT_ID;

export const TRAITS_ALL = {
    'Amount of Attributes': [3, 4, 5, 6, 7],
    'Accessory': ['None', 'Amulet', 'Sword', 'Bow', 'Sword and Shield', 'Scroll', 'Trident', 'Harp', 'Wings', 'Aura'],
    'Skin': ['Socordian', 'Tattooed', 'Silver', 'Ape', 'Gold', 'Zombie', 'Ethereal'],
    'Eyes': ['Brown Eyes', 'Black Eyes', 'Green Eyes', 'Ice Eyes', 'Fire Eyes', 'Lightning Eyes', 'Third Eye', 'Laser Eyes'],
    'Clothing': ['Light Robe', 'Medium Robe', 'Heavy Robe', 'Light Armor', 'Medium Armor', 'Heavy Armor','Tunic', 'Officer', 'Ornate', 'Councilor', 'Commander', 'Olympian', 'Titan'],
    'Hairstyle': ['None', 'Manbun', 'Ponytail', 'Braids', 'Long', 'Spiked', 'Beard'],
    'Hair Color': ['None', 'Black Hair', 'Brown Hair', 'Ombre Hair', 'Gold Hair', 'Platinum Hair', 'Ice Hair', 'Fire Hair'],
    'Headwear': ['None', 'Laurel', 'Flowers', 'Spartan', 'Tiara', 'Crown', 'Golden Laurel', 'Bastet', 'Anubis', 'Commander', 'Medusa', 'Dragon', 'Halo']
}

export const NUM_TO_TEXT = {
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven'
}

export const LOG_MAP = {
    'Assign': 'Assign',
    'Transfer': 'Transfer',
    'GodListed': 'Listed',
    'GodUnlisted': 'Unlisted',
    'GodBidEnter': 'Bid Enter',
    'GodBidWithdrawn': 'Bid Withdrawn',
    'GodBought': 'Bought',
    '1': 'List',
    '2': 'Offer',
    '3': 'Sale',
    '4': 'Unlisted',
    '5': 'Transfer',
    '6': 'Assign',
    '7': 'Offer Withdrawn'
}

export const ACTIVITY_EVENT_MAP = {
    '1': 'Show Listed',
    '2': 'Show Offers',
    '3': 'Show Sales',
    '5': 'Show Transfers',
}

export const TIME_MAP = {
    '1': 86400,
    '2': 604800,
    '3': 2592000,
    '4': 7776000,
    '5': 31536000
}

export const ACTIVITY_TIME_MAP = {
    '1': 'Last 24 Hours',
    '2': 'Last 7 Days',
    '3': 'Last 30 Days',
    '4': 'Last 90 Days',
    '5': 'Last 365 Days',
    '6': 'All Time'
}

export const ACTIVITY_AVG_PRICE_MAP = {
    '1': '24 Hour',
    '2': '7 Day',
    '3': '30 Day',
    '4': '90 Day',
    '5': '365 Day',
    '6': 'All Time'
}