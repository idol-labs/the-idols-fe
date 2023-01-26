import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { IMG_URL } from '../utils/constants';
import { formatEtherString } from '../utils/numberFormat';
import { ReactComponent as Ethereum } from '../assets/ethereum.svg';
import { ReactComponent as ChevronDownLight } from '../assets/chevron_down_light.svg';
import { ReactComponent as Close } from '../assets/close.svg';

import { ethers } from 'ethers';
import { gql } from '@apollo/client';

import Loader from './Loader';
import ImageLazy from './ImageLazy';
import MarketplaceHeader from './MarketplaceHeader'
import FilterOption from './FilterOption';
import ActiveFilterOption from './ActiveFilterOption';

import { MarketplaceContext } from '../contexts/MarketplaceContext';

import MarketplaceStyles from '../styles/MarketplaceStyles';

const Marketplace = () => {
    let navigate = useNavigate();

    const { 
        forSaleFilter, setForSaleFilter,
        sortType, setSortType,
        forSaleMap, sortMap,
        traitFilterAttributeCount,
        layerMap,
        layerStates,
        handleResetFilters,
        getQuery,
        client,
        TRAITS_ALL
    } = useContext(MarketplaceContext);

    // The Graph is limited to 1000 returned results
    // How many NFTs to grab
    const RESULTS_LIMIT = 100;

    const [loading, setLoading] = useState(true)

    // Search Filter Tools
    const [searchGodInput, setSearchGodInput] = useState('')

    const [filterShow, setFilterShow] = useState(false)
    const [searchInputFilter, setSearchInputFilter] = useState('')
    const [isActiveFiltersBlank, setIsActiveFiltersBlank] = useState(true)
    const [isSearchInputFilterBlank, setIsSearchInputFilterBlank] = useState(false)

    const [sortShow, setSortShow] = useState(false)

    const [listShow, setListShow] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [results, setResults] = useState(null);

    // Refs
    const searchGodInputRef = useRef(null);
    const filterInputRef = useRef(null);
    const filterWrapperRef = useRef(null);
    const filterButtonWrapperRef = useRef(null);
    const sortWrapperRef = useRef(null);
    const listWrapperRef = useRef(null);

    function handleSearchGodInputChange(e) {
        setSearchGodInput(e.target.value)
    }

    function handleSearchGod() {
        const term = parseInt(searchGodInput);
        if (term >= 0 && term <= 9999) {
            navigate(`/idols/${term}`)
        }
    }

    function handleFilterInputChange(e) {
        setSearchInputFilter(e.target.value)
        setFilterShow(true)
    }

    function checkActiveFiltersBlank() {
        for (let layer of Object.keys(layerMap)) {
            const traitObject = layerMap[layer][0];
            const valArray = Object.values(traitObject).filter(val => {
                return val
            })
            if (valArray.length) {
                setIsActiveFiltersBlank(false)
                return;
            }
        }
        setIsActiveFiltersBlank(true)
    }

    function checkSearchInputFiltersBlank() {
        let traitsArray = []
        for (let layer of Object.keys(layerMap)) {
            let layerTraits = TRAITS_ALL[layer];
            let filteredTraits = layerTraits.filter(trait => {
               return trait.toString().toLowerCase().includes(searchInputFilter.toLowerCase())
            })
            traitsArray = traitsArray.concat(filteredTraits)
        }

        if (traitsArray.length) {
            setIsSearchInputFilterBlank(false)
        } else {
            setIsSearchInputFilterBlank(true)
        }
    }

    function getPriceDisplayCard(god) {
        let etherLastOffered = null;
        let etherLastBought = null;
        let etherTopBid = null;

        if (god.forSalePublic && god.lastOfferedPrice > 0 ) {
            etherLastOffered = parseFloat(ethers.utils.formatEther(god.lastOfferedPrice))
        }

        if (god.lastBoughtPrice > 0) {
            etherLastBought = parseFloat(ethers.utils.formatEther(god.lastBoughtPrice))
        }

        if (god.hasBid && god.lastBidder && god.owner && god.lastBidder.id !== god.owner.id) {
            etherTopBid = parseFloat(ethers.utils.formatEther(god.lastBid))
        }

   
        return (
            <>
                <p>
                    {
                        etherLastOffered &&
                        <>
                            <span className='price-title'>Price</span>
                            <Ethereum /> 
                            <span className='price-value'>{formatEtherString(etherLastOffered)}</span>
                        </>
                    }
                </p>

                <p className='last-bought'>
                    {
                        etherLastBought &&
                        <>
                            <span className='price-title'>Last</span>
                            <Ethereum /> 
                            <span className='price-value'>{formatEtherString(etherLastBought)}</span>
                        </>
                    }
                </p>

                <p className='top-bid'>
                    {
                        etherTopBid &&
                        <>
                            <span className='price-title'>Top Bid</span>
                            <Ethereum /> 
                            <span className='price-value'>{formatEtherString(etherTopBid)}</span>
                        </>
                    }
                </p>
            </>
        )
    }

    async function runQuery(pageNumber) {
        const query = getQuery()

        if (!query) {
            setResults([]);
            setLoading(false)
            return;
        }

        try {
            const response = await client.query({
                query: gql(query),
                variables: {
                    first: RESULTS_LIMIT,
                    skip: (pageNumber-1)*RESULTS_LIMIT
                },
            });

            const godData = response.data['gods']
            setCurrentPage(pageNumber)
            setResults(godData);
            setLoading(false)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
           });
           
        } catch (err) {
            console.log('Marketplace load contract error', err)
        }
    }

    // Dropdown Handle Clicks
    const handleFilterClick = (e) => {
        if (filterWrapperRef.current && filterWrapperRef.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setFilterShow(false);
    };

    const handleSortClick = (e) => {
        if (sortWrapperRef.current && sortWrapperRef.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setSortShow(false);
    };

    const handleListClick = (e) => {
        if (listWrapperRef.current && listWrapperRef.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setListShow(false);
    };


    useEffect(() => {
        runQuery(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoading(true)
        runQuery(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forSaleFilter, sortType, traitFilterAttributeCount, ...layerStates])

    useEffect(() => {
        checkActiveFiltersBlank()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [traitFilterAttributeCount, ...layerStates])

    useEffect(() => {
        checkSearchInputFiltersBlank() 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInputFilter])

    // Handle popup mouse clicks
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleFilterClick);
        document.addEventListener('mousedown', handleSortClick);
        document.addEventListener('mousedown', handleListClick);

        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleFilterClick);
            document.removeEventListener('mousedown', handleSortClick);
            document.removeEventListener('mousedown', handleListClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MarketplaceStyles>
            <MarketplaceHeader />
        
            <section className='search-filter-sort-wrapper'>

                <section 
                    className='search-gods-button-wrapper'
                    onClick={(e) => {
                        e.preventDefault();
                        searchGodInputRef.current.focus()
                    }}
                >
                    <p className='search-gods-button'>Search Idols</p>

                    <input
                        ref={searchGodInputRef} 
                        type='text'
                        onChange={handleSearchGodInputChange}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSearchGod()
                            }
                        }}
                    />
                </section>

                <section 
                    ref={filterWrapperRef} 
                    className='filter-tools'
                >
                    <article 
                        ref={filterButtonWrapperRef} 
                        className={`filter-button-wrapper ${!isActiveFiltersBlank ? 'filters-active' : undefined}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setFilterShow(!filterShow)
                            filterInputRef.current.focus()
                        }}
                    >
                        <section className='active-filters-input-wrapper'>
                            {
                                isActiveFiltersBlank &&
                                <p className='filter-title'>Select Filters</p>
                            }

                            {
                                !isActiveFiltersBlank &&
                                <>
                                    {
                                        Object.keys(layerMap).map(layer => (
                                            <ActiveFilterOption 
                                                key={layer}
                                                traitFilter={layerMap[layer][0]}
                                                setTraitFilter={layerMap[layer][1]}
                                            />
                                        ))
                                    }
                                </>
                            }

                            <article className='filter-input' data-value={searchInputFilter}>
                                <input
                                    ref={filterInputRef} 
                                    type='text'
                                    onChange={handleFilterInputChange}
                                    value={searchInputFilter}
                                />
                            </article>
                            
                        </section>

                        <section className='reset-wrapper'> 
                            {
                                !isActiveFiltersBlank &&
                                <button
                                    className='reset-filters'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleResetFilters();
                                    }}
                                ><Close /></button>
                            }

                            <div className='svg-wrapper'>
                                <ChevronDownLight />
                            </div>
                        </section>
                    </article>
                
                    {
                        filterShow &&
                        <ul className='filter-list'>
                            {
                                isSearchInputFilterBlank && <li>No Options</li>
                            }
                            {
                                Object.keys(layerMap).map(layer => (
                                    <FilterOption 
                                        key={layer}
                                        layer={layer}
                                        traitFilter={layerMap[layer][0]}
                                        setTraitFilter={layerMap[layer][1]}
                                        search={searchInputFilter}
                                    />
                                ))
                            }
                        </ul>
                    }
                </section>

                <section 
                    className='sort' 
                    ref={sortWrapperRef} 
                >
                    <article 
                        className='sort-button-wrapper'
                        onClick={(e) => {
                            e.preventDefault();
                            setSortShow(!sortShow)
                        }}
                    >
                        <p className='sort-title'>{sortMap[sortType]}</p>

                        <div className='svg-wrapper'>
                            <ChevronDownLight />
                        </div>
                    </article>
                    
                    {
                        sortShow &&
                        <ul className='filter-list'>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSortType(0)
                                    setSortShow(false)
                                }}
                            >Price: Low to High</li>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSortType(1)
                                    setSortShow(false)
                                }}
                            >Price: High to Low</li>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSortType(2)
                                    setSortShow(false)
                                }}
                            >Recently Listed</li>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSortType(3)
                                    setSortShow(false)
                                }}
                            >Oldest</li>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSortType(4)
                                    setSortShow(false)
                                }}
                            >Last Price: Low to High</li>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSortType(5)
                                    setSortShow(false)
                                }}
                            >Last Price: High to Low</li>
                        </ul>
                    }
                </section>
            
                <section 
                    className='listed-select'
                    ref={listWrapperRef} 
                >
                    <article 
                        className='list-button-wrapper'
                        onClick={(e) => {
                            e.preventDefault();
                            setListShow(!listShow)
                        }}
                    >
                        <p className='list-title'>{forSaleMap[forSaleFilter]}</p>

                        <div className='svg-wrapper'>
                            <ChevronDownLight />
                        </div>
                    </article>
                    
                    {
                        listShow &&
                        <ul className='list-list'>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setForSaleFilter(0)
                                    setListShow(false)
                                }}
                            >Show Listed</li>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setForSaleFilter(1)
                                    setListShow(false)
                                }}
                            >Show Unlisted</li>
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    setForSaleFilter(2)
                                    setListShow(false)
                                }}
                            >Show Both</li>
                        </ul>
                    }                
                </section>

            </section>
            
            {
                loading &&
                <Loader />
            }

            {
                !loading && results.length === 0 &&
                <section className='no-results'>
                    No Results to Display
                </section>
            }
        
            {
                !loading && results &&
                <ul className='results'>
                    {
                        results.map(god => 
                            <li
                                key={god.id}
                            >
                                <Link to={`/idols/${god.id}`}>
                                    <ImageLazy
                                        src={`${IMG_URL}${god.id}.jpg`} 
                                        alt={`Idol ${god.id}`}
                                    />
                                    
                                    <section className='card-info'>
                                        <p className='card-title'>Idol #{god.id}</p>

                                        <article className='price-wrapper'>
                                            {
                                                getPriceDisplayCard(god)
                                            }            
                                        </article>
                                    </section>
                                </Link>
                                
                            </li>
                        )
                    }
                </ul>
            }
            
            <section className='pagination'>
                {
                    currentPage !== 1 &&
                    <button
                        onClick={() => {
                            setLoading(true)
                            runQuery(currentPage-1)
                        }}
                        disabled={loading}
                    >&lt; Previous</button>
                }

                <p>Page {currentPage}</p>

                {
                    results && results.length === RESULTS_LIMIT &&
                    <button
                        onClick={() => {
                            setLoading(true)
                            runQuery(currentPage+1)
                        }}
                        disabled={loading}
                    >Next &gt;</button>
                }
            </section>
            
        </MarketplaceStyles>
    )
}

export default Marketplace;