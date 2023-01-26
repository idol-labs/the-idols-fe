import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { 
    GRAPH_URL, 
    IMG_URL, 
    ETHERSCAN_URL, 
    LOG_MAP, 
    ACTIVITY_EVENT_MAP, 
    TIME_MAP, 
    ACTIVITY_TIME_MAP, 
    ACTIVITY_AVG_PRICE_MAP 
} from '../utils/constants';
import { timeAgo, formatEtherString, formatGodId } from '../utils/numberFormat';
import { ReactComponent as Ethereum } from '../assets/ethereum.svg';
import { ReactComponent as ChevronDownLight } from '../assets/chevron_down_light.svg';

import { ethers } from 'ethers';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import ImageLazy from './ImageLazy';

import { WalletContext } from '../contexts/WalletContext';

import Loader from './Loader';
import MarketplaceHeader from './MarketplaceHeader';

import ActivityStyles from '../styles/ActivityStyles';


const Activity = () => {
    const { 
        walletFinished, 
        walletLoaded
    } = useContext(WalletContext);

    // The Graph is limited to 1000 returned results
    // How many NFTs to grab
    const RESULTS_LIMIT = 50;

    const [loading, setLoading] = useState(true)

    // Search Filter Tools
    const [searchGodInput, setSearchGodInput] = useState('')
    const [eventFilter, setEventFilter] = useState(3)
    const [timeFilter, setTimeFilter] = useState(4)
    const [avgPriceTitle, setAvgPriceTitle] = useState( ACTIVITY_AVG_PRICE_MAP[4])
    const [avgPriceAmount, setAvgPriceAmount] = useState(null)

    const [eventShow, setEventShow] = useState(false)
    const [timeShow, setTimeShow] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [results, setResults] = useState(null);

    // Refs
    const searchGodInputRef = useRef(null);
    const eventTypeRef = useRef(null);
    const timeRangeRef = useRef(null);

    function handleSearchGodInputChange(e) {
        setSearchGodInput(e.target.value)
    }

    function handleSearchGod() {
        const term = parseInt(searchGodInput);
        if (term >= 0 && term <= 9999) {
            setLoading(true)
            runQuery(1, {
                idolNumber: term,
                eventType: eventFilter
            })
        } else {
            setLoading(true)
            runQuery(1)
        }
    }


    function getPriceDisplay(wei) {
        const ether = parseFloat(ethers.utils.formatEther(wei))

        return (
            <p>
                {
                    ether &&
                    <>
                        <Ethereum /> 
                        <span className='price-value'>{formatEtherString(ether)}</span>
                    </>
                }
            </p>
        )
    }

    // Query
    function getQuery(options) {
        let whereString;
        let whereArray = [];

        if (options.eventType) {
            whereArray.push(`logType: ${options.eventType}`)
        }

        if (options.timeRange >= 1 && options.timeRange <= 5) {
            const timestampCurrent = new Date().getTime()/1000;
            const timestampStart = Math.round(timestampCurrent - TIME_MAP[options.timeRange]);

            whereArray.push(`timestamp_gte: ${timestampStart}`)
        }

        if (options.idolNumber) {
            whereArray.push(`idolId: ${options.idolNumber}`)
        }

        if (whereArray.length) {
            whereString = whereArray.join(',')

            return `
                query logsQuery($first: Int, $skip: Int) {
                    logActivities(first: $first, skip: $skip, where: {${whereString}}, orderBy: timestamp, orderDirection: desc) {
                        id
                        idolId
                        from
                        to
                        value
                        timestamp
                        logType
                    }
                }
            `
        }
    }

    const client = new ApolloClient({
        uri: GRAPH_URL,
        cache: new InMemoryCache(),
    })


    async function runQuery(
        pageNumber, 
        options={
            idolNumber: null,
            eventType: 3,
            timeRange: 4,
        }
    ) {
        try {
            const response = await client.query({
                query: gql(getQuery(options)),
                variables: {
                    first: RESULTS_LIMIT,
                    skip: (pageNumber-1)*RESULTS_LIMIT
                },
            });

            const logData = response.data['logActivities']
            
            setCurrentPage(pageNumber)
            setResults(logData);
            setLoading(false)
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // for smoothly scrolling
           });
            
        } catch (err) {
            console.log('Activity page graph error', err)
        }
    }

    async function getAvgPrice() {
        setAvgPriceAmount(null)
        const RESULTS_LIMIT = 1000;
        let activityData = [];
        let loopFinished = false;
        let pageNumber = 1;
        let total = ethers.BigNumber.from("0");
        let avgPrice = 0;

        while (!loopFinished) {
            try {
                const response = await client.query({
                    query: gql(getQuery({
                        eventType: 3,
                        timeRange: timeFilter
                    })),
                    variables: {
                        first: RESULTS_LIMIT,
                        skip: (pageNumber-1)*RESULTS_LIMIT
                    },
                });
    
                const logData = response.data['logActivities']

                if (logData.length > 0) {
                    activityData = activityData.concat(logData);
                } else {
                    loopFinished = true;
                }

                pageNumber += 1;
            } catch (err) {
                console.log('Activity page avg price graph error', err)
            }
        }

        for (let data of activityData) {
            total = total.add(ethers.BigNumber.from(data.value))
        }

        if (total > 0) {
            avgPrice = total.div(ethers.BigNumber.from(activityData.length))
        }

        setAvgPriceAmount(formatEtherString(ethers.utils.formatEther(avgPrice)))
    }


    function getTransactionRow(transaction) {
        let from = null;
        let to = null;
        let value = null;

        if (transaction.from) {
            from = transaction.from
        } 

        if (transaction.to) {
            to = transaction.to
        }
        if (to === '0x0000000000000000000000000000000000000000') {
            to = null;
            return;
        }

        if (transaction.value) {
            value = getPriceDisplay(transaction.value.toString())
        }
        if (transaction.minValue) {
            value = getPriceDisplay(transaction.minValue.toString())
        }

        const godId = transaction.idolId;

        return (
            <>
                <td>{LOG_MAP[transaction.logType]}</td>
                <td className='idol-column'>
                    <Link to={`/idols/${godId}`}>
                        <ImageLazy
                            src={`${IMG_URL}${godId}.jpg`} 
                            alt={`Idol ${godId}`}
                        />                     
                        <span className='idol-id'> #{formatGodId(godId)}</span>
                    </Link>
                </td>
                <td className='price'>{value}</td>
                <td>
                    <a 
                        href={`${ETHERSCAN_URL}address/${from}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >{from}</a>
                </td>
                <td>
                    {
                        to ? 
                        <a 
                            href={`${ETHERSCAN_URL}address/${to}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{to}</a>: '---'
                    }
                    
                </td>
                <td>{timeAgo(parseInt(transaction.timestamp))}</td>
            </>
        )
    }


    async function loadActivity() {
        await runQuery(1)
        await getAvgPrice()
    }


    // Dropdown Handle Clicks
    const handleEventClick = (e) => {
        if (eventTypeRef.current && eventTypeRef.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setEventShow(false);
    };

    const handleTimeClick = (e) => {
        if (timeRangeRef.current && timeRangeRef.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setTimeShow(false);
    };


    useEffect(() => {
        if (walletFinished) {
            loadActivity()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletFinished, walletLoaded])

    useEffect(() => {
        setLoading(true)
        runQuery(1, {
            idolNumber: searchGodInput,
            eventType: eventFilter,
            timeRange: timeFilter
        })
        getAvgPrice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventFilter, timeFilter])

    // Handle popup mouse clicks
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleEventClick);
        document.addEventListener('mousedown', handleTimeClick);

        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleEventClick);
            document.removeEventListener('mousedown', handleTimeClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ActivityStyles>
            <MarketplaceHeader />

            {
                loading &&
                <Loader />
            }

            {
                !loading && 
                <section className='activity-wrapper'>
                    <section className='filter-wrapper'>
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
                                value={searchGodInput}
                            />
                        </section>

                        <section 
                            className='event-select'
                            ref={eventTypeRef} 
                        >
                            <article 
                                className='event-button-wrapper'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEventShow(!eventShow)
                                }}
                            >
                                <p className='event-title'>{ACTIVITY_EVENT_MAP[eventFilter]}</p>

                                <div className='svg-wrapper'>
                                    <ChevronDownLight />
                                </div>
                            </article>
                            
                            {
                                eventShow &&
                                <ul className='event-list'>
                                    <li
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setEventFilter(3)
                                            setEventShow(false)
                                        }}
                                    >{ACTIVITY_EVENT_MAP[3]}</li>
                                    <li
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setEventFilter(1)
                                            setEventShow(false)
                                        }}
                                    >{ACTIVITY_EVENT_MAP[1]}</li>
                                    <li
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setEventFilter(2)
                                            setEventShow(false)
                                        }}
                                    >{ACTIVITY_EVENT_MAP[2]}</li>
                                    <li
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setEventFilter(5)
                                            setEventShow(false)
                                        }}
                                    >{ACTIVITY_EVENT_MAP[5]}</li>
                                </ul>
                            }                
                        </section>

                        <section
                            className='timerange-avg-price'
                        >
                            <p>
                                <span>{avgPriceTitle} Avg. Price:</span>
                                <span className='avg-price-amount'>Ξ{avgPriceAmount}</span>
                            </p>
                        </section>

                        <section 
                            className='time-select'
                            ref={timeRangeRef} 
                        >
                            <article 
                                className='time-button-wrapper'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTimeShow(!timeShow)
                                }}
                            >
                                <p className='time-title'>{ACTIVITY_TIME_MAP[timeFilter]}</p>

                                <div className='svg-wrapper'>
                                    <ChevronDownLight />
                                </div>
                            </article>
                            
                            {
                                timeShow &&
                                <ul className='time-list'>
                                    {
                                        Object.keys(ACTIVITY_TIME_MAP).map(time => (
                                            <li
                                                key={time}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setTimeFilter(parseInt(time))
                                                    setAvgPriceTitle(ACTIVITY_AVG_PRICE_MAP[ parseInt(time)])
                                                    setTimeShow(false)
                                                }}
                                            >{ACTIVITY_TIME_MAP[time]}</li>
                                        ))
                                    }
                                </ul>
                            }                
                        </section>                        
                    </section>

                    <section className='activity-results-wrapper'>
                        <h2>Activity</h2>
                        {
                            results &&
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Event</th>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Time</th>
                                    </tr>
                                    {                  
                                        results.map(result => 
                                            <tr
                                                key={result.id}
                                            >
                                                {getTransactionRow(result)}
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        }
                    </section>
                </section>
            }

            <section className='pagination'>
                {
                    currentPage !== 1 &&
                    <button
                        onClick={() => {
                            setLoading(true)
                            runQuery(currentPage-1, {
                                idolNumber: searchGodInput,
                                eventType: eventFilter,
                                timeRange: timeFilter
                            })
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
                            runQuery(currentPage+1, {
                                idolNumber: searchGodInput,
                                eventType: eventFilter,
                                timeRange: timeFilter
                            })
                        }}
                        disabled={loading}
                    >Next &gt;</button>
                }
            </section>
        </ActivityStyles>
    )
}

export default Activity;