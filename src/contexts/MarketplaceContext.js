import React, { createContext, useState } from 'react';
import { 
    GRAPH_URL, 
    TRAITS_ALL 
} from '../utils/constants';

import { ApolloClient, InMemoryCache } from '@apollo/client'

import Traits from '../traits/traits.json';

export const MarketplaceContext = createContext();

const MarketplaceContextProvider = (props) => {
    // Listed / Unlisted for Sale setup
    const [forSaleFilter, setForSaleFilter] = useState(0)

    const forSaleMap = {
        0: 'Show Listed',
        1: 'Show Unlisted',
        2: 'Show Both'
    }

    // Sort setup
    const [sortType, setSortType] = useState(0)

    const sortMap = {
        0: 'Price: Low to High',
        1: 'Price: High to Low',
        2: 'Recently Listed',
        3: 'Oldest',
        4: 'Last Price: Low to High',
        5: 'Last Price: High to Low',
    }

    // Trait filters initial state
    const attributeInitialState = {
        3: null,
        4: null,
        5: null,
        6: null,
        7: null
    }
    const accessoryInitialState = {
        'None': null,
        'Amulet': null,
        'Sword': null,
        'Bow': null,
        'Sword and Shield': null,
        'Scroll': null,
        'Trident': null,
        'Harp': null,
        'Wings': null,
        'Aura': null,
    }
    const skinInitialState = {
        'Socordian': null, 
        'Tattooed': null, 
        'Ape': null, 
        'Zombie': null,
        'Gold': null, 
        'Silver': null, 
        'Ethereal': null,
    }
    const eyesInitialState = {
        'Brown Eyes': null, 
        'Black Eyes': null, 
        'Green Eyes': null, 
        'Ice Eyes': null, 
        'Fire Eyes': null, 
        'Lightning Eyes': null, 
        'Third Eye': null,
        'Laser Eyes': null,
    }
    const clothingInitialState = {
        'Light Robe': null, 
        'Medium Robe': null, 
        'Heavy Robe': null, 
        'Light Armor': null, 
        'Medium Armor': null, 
        'Heavy Armor': null, 
        'Tunic': null,
        'Officer': null, 
        'Ornate': null, 
        'Councilor': null, 
        'Commander': null, 
        'Olympian': null, 
        'Titan': null, 
    }
    const hairstyleInitialState = {
        'None': null,
        'Manbun': null, 
        'Ponytail': null, 
        'Braids': null, 
        'Long': null, 
        'Spiked': null,
        'Beard': null, 
    }
    const haircolorInitialState = {
        'None': null,
        'Black Hair': null, 
        'Brown Hair': null, 
        'Ombre Hair': null, 
        'Gold Hair': null, 
        'Platinum Hair': null,
        'Ice Hair': null, 
        'Fire Hair': null,
    }
    const helmInitialState = {
        'None': null,
        'Laurel': null,
        'Flowers': null, 
        'Spartan': null, 
        'Tiara': null,
        'Crown': null, 
        'Golden Laurel': null, 
        'Bastet': null, 
        'Anubis': null, 
        'Commander': null, 
        'Medusa': null, 
        'Dragon': null,
        'Halo': null, 
    }

    // Trait filters
    const [traitFilterAttributeCount, setTraitFilterAttributeCount] = useState(attributeInitialState)
    const [traitFilterAccessory, setTraitFilterAccessory] = useState(accessoryInitialState)
    const [traitFilterSkin, setTraitFilterSkin] = useState(skinInitialState)
    const [traitFilterEyes, setTraitFilterEyes] = useState(eyesInitialState)
    const [traitFilterClothing, setTraitFilterClothing] = useState(clothingInitialState)
    const [traitFilterHairstyle, setTraitFilterHairstyle] = useState(hairstyleInitialState)
    const [traitFilterHairColor, setTraitFilterHairColor] = useState(haircolorInitialState)
    const [traitFilterHelm, setTraitFilterHelm] = useState(helmInitialState)

    const layerMap = {
        'Amount of Attributes': [traitFilterAttributeCount, setTraitFilterAttributeCount],
        'Headwear': [traitFilterHelm, setTraitFilterHelm],
        'Hairstyle': [traitFilterHairstyle, setTraitFilterHairstyle],
        'Hair Color': [traitFilterHairColor, setTraitFilterHairColor],
        'Eyes': [traitFilterEyes, setTraitFilterEyes],
        'Skin': [traitFilterSkin, setTraitFilterSkin],
        'Clothing': [traitFilterClothing, setTraitFilterClothing],
        'Accessory': [traitFilterAccessory, setTraitFilterAccessory],
    };

    const layerStates = [traitFilterAccessory, traitFilterSkin, traitFilterEyes, traitFilterClothing, traitFilterHairstyle, traitFilterHairColor, traitFilterHelm]


    function handleResetFilters() {
        setTraitFilterAttributeCount(attributeInitialState)
        setTraitFilterAccessory(accessoryInitialState)
        setTraitFilterSkin(skinInitialState)
        setTraitFilterEyes(eyesInitialState)
        setTraitFilterClothing(clothingInitialState)
        setTraitFilterHairstyle(hairstyleInitialState)
        setTraitFilterHairColor(haircolorInitialState)
        setTraitFilterHelm(helmInitialState)
    }

    // Query
    function getQuery() {
        let filterArray = [];
        let filterActive = false;

        // If more than 1 trait is selected from the same trait type, combine the results together
        
        // Amount of Attributes
        let numAttrCounts = 0;
        let attrFilterArray = [];
        for (let trait of Object.keys(traitFilterAttributeCount)) {
            if (traitFilterAttributeCount[trait]) {
                filterActive = true;

                if (numAttrCounts >= 1) {
                    attrFilterArray = attrFilterArray.concat(Traits.traitCount[trait].gods)
                    attrFilterArray = [...new Set(attrFilterArray)]
                } else {
                    attrFilterArray = Traits.traitCount[trait].gods
                }

                numAttrCounts += 1;
            }
        }
        if (attrFilterArray.length) {
            filterArray = attrFilterArray;
        }

        // Traits
        let filterArrayFirstPush = true;
        const layers = Object.keys(layerMap);
        for (let layer of layers) {
            if (layer === 'Amount of Attributes') {
                continue;
            }

            const traitFilter = layerMap[layer][0];
            let numTraitCounts = 0;
            let layerFilterArray = [];

            for (let trait of Object.keys(traitFilter)) {
                if (traitFilter[trait]) {
                    filterActive = true;

                    if (!Traits.traits[layer][trait]) {
                        continue;
                    }

                    if (numTraitCounts >= 1) {
                        layerFilterArray = layerFilterArray.concat(Traits.traits[layer][trait].gods)
                        layerFilterArray = [...new Set(layerFilterArray)]
                    } else {
                        layerFilterArray = Traits.traits[layer][trait].gods
                    }

                    numTraitCounts += 1;
                }
            }
         
            // For each layer filter array, filter them with the master filter
            if (layerFilterArray.length) {
                if (filterArray.length) {
                    filterArray = filterArray.filter(value => layerFilterArray.includes(value))
                } else {
                    if (filterArrayFirstPush) {
                        filterArray = layerFilterArray
                        filterArrayFirstPush = false;
                    }
                   
                }
            } 
        }

        if (filterActive && filterArray.length === 0) {
            return false;
        }
       
        let whereString;
        let whereArray = [];

        if (forSaleFilter === 0) {
            whereArray.push(`forSalePublic: true`)
        } else if (forSaleFilter === 1) {
            whereArray.push(`forSalePublic: false`)
        }

        if (filterArray.length) {
           whereArray.push(`id_in: [${filterArray}]`)
        }

        let orderBy;
        let orderDirection;
        if (sortType === 0) {
            orderBy = 'lastOfferedPrice'
            orderDirection = 'asc'
        } else if (sortType === 1) {
            orderBy = 'lastOfferedPrice'
            orderDirection = 'desc'
        } else if (sortType === 2) {
            orderBy = 'lastOfferedTime'
            orderDirection = 'desc'
        } else if (sortType === 3) {
            orderBy = 'lastOfferedTime'
            orderDirection = 'asc'
        } else if (sortType === 4) {
            orderBy = 'lastBoughtPrice'
            orderDirection = 'asc'
            whereArray.push(`lastBoughtPrice_gt: 0`)
        } else if (sortType === 5) {
            orderBy = 'lastBoughtPrice'
            orderDirection = 'desc'
            whereArray.push(`lastBoughtPrice_gt: 0`)
        }

        if (whereArray.length) {
            whereString = whereArray.join(',')

            return `
                query GodsForSale($first: Int, $skip: Int) {
                    gods(first: $first, skip: $skip, where: {${whereString}}, orderBy: ${orderBy}, orderDirection: ${orderDirection}) {
                        id
                        owner {
                            id
                        }
                        forSalePublic
                        lastOfferedPrice
                        lastBoughtPrice
                        hasBid
                        lastBid
                        lastBidder {
                            id
                        }
                    }
                }
            `;
        } else {
            return `
                query GodsForSale($first: Int, $skip: Int) {
                    gods(first: $first, skip: $skip, orderBy: ${orderBy}, orderDirection: ${orderDirection}) {
                        id
                        owner {
                            id
                        }
                        forSalePublic
                        lastOfferedPrice
                        lastBoughtPrice
                        hasBid
                        lastBid
                        lastBidder {
                            id
                        }
                    }
                }
            `;
        }
    }

    const forSaleCountQuery = `
        query GodListedAll {
            godListedAlls(where:{id: "sum-god-listed"}) {
                value
            }
        } 
    `;

    const ownerCountQuery = `
        query OwnerAll {
            ownerAlls (where:{id: "total-owners"}) {
                value
            }
        } 
    `;

    const floorPriceQuery = `
        query GodsForSale {
            gods(first: 1, where: {forSalePublic: true}, orderBy: lastOfferedPrice, orderDirection: asc) {
                lastOfferedPrice
            }
        }
    `;


    const volumeTradedQuery = `
        query SumGodBoughts {
            godBoughtAlls(where:{id: "sum-god-boughts"}) {
              value
            }
        } 
    `;

    const statsQueryArray = [forSaleCountQuery, ownerCountQuery, floorPriceQuery, volumeTradedQuery]

    const client = new ApolloClient({
        uri: GRAPH_URL,
        cache: new InMemoryCache(),
    })

    return (
        <MarketplaceContext.Provider value={{ 
            Traits,
            TRAITS_ALL,
            forSaleFilter, setForSaleFilter,
            sortType, setSortType,
            forSaleMap, sortMap,
            traitFilterAttributeCount, setTraitFilterAttributeCount,
            traitFilterAccessory, setTraitFilterAccessory,
            traitFilterSkin, setTraitFilterSkin,
            traitFilterEyes, setTraitFilterEyes,
            traitFilterClothing, setTraitFilterClothing,
            traitFilterHairstyle, setTraitFilterHairstyle,
            traitFilterHairColor, setTraitFilterHairColor,
            traitFilterHelm, setTraitFilterHelm,
            layerMap,
            layerStates,
            handleResetFilters,
            getQuery,
            volumeTradedQuery,
            floorPriceQuery,
            statsQueryArray,
            client
        }}>
            {props.children}
        </MarketplaceContext.Provider>
    )
}


export default MarketplaceContextProvider;