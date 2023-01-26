import styled from 'styled-components';

const ActivityStyles = styled.section`
    padding: 30px;

    input {
        outline: none;
    }

    .activity-wrapper {
        .filter-wrapper {
            margin-top: 39px;
            display: block;

            .search-gods-button-wrapper {
                padding: 10px;
                display: flex;
                align-items: center;

                background: #fff;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                cursor: pointer;

                p {
                    color: rgb(33, 33, 33, 0.7);
                    font-size: 20px;
                    white-space: nowrap;
                }

                input {
                    padding: 0;
                    margin-left: 10px;
                    width: 100%;

                    font-size: 20px;
                    border: none;
                    text-align: right;
                }

                svg {
                    margin-left: 5px;
                    width: 20px;
                    height: 20px;

                    fill: #C4C4C4;
                }
            }

            .event-select,
            .time-select {
                position: relative;

                .event-button-wrapper,
                .time-button-wrapper {
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    background: #fff;
                    border-radius: 4px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    cursor: pointer;

                    .event-title,
                    .time-title {
                        color: rgb(33, 33, 33, 0.7);
                        font-size: 20px;
                        white-space: nowrap;
                    }

                    .svg-wrapper {
                        margin-left: 15px;
                        padding-left: 7px;
                        border-left: 1px solid #C4C4C4;

                        svg {
                            justify-self: end;
                            width: 20px;
                            height: 20px;

                            fill: #C4C4C4;
                        }
                    }
                }

                ul.event-list,
                ul.time-list {
                    position: absolute;
                    top: 105%;
                    left: 0;
                    right: 0;

                    background: #fff;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    z-index: 1;

                    li {
                        padding: 15px;

                        color: rgb(33, 33, 33, 0.7);
                        font-size: 20px;
                        white-space: nowrap;
                        cursor: pointer;

                        &:hover {
                            background: #43B4D4;
                        }
                    }
                }
            }

            .timerange-avg-price {
                padding: 10px;
                display: flex;
                align-items: center;

                background: #fff;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

                p {
                    color: rgb(33, 33, 33, 0.7);
                    font-size: 20px;
                    white-space: nowrap;

                    .avg-price-amount {
                        margin-left: 10px;
                    }
                }
            }

            .event-select,
            .time-select,
            .timerange-avg-price {
                margin-top: 20px;
            }
        }

        .activity-results-wrapper {
            margin-top: 16px;
            padding: 20px;

            background: #fff;
            overflow-y: hidden;
            overflow-x: auto;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            h2 {
                font-size: 26px;
                font-weight: 600;
                text-align: center;
            }

            table {
                margin-top: 20px;
                width: 100%;

                tr {
                    th {
                        font-weight: 600;
                    }

                    th,
                    td {
                        padding: 5px;

                        font-size: 24px;
                        text-align: center;
                        vertical-align: middle;
                    } 

                    td {
                        font-weight: 300;

                        &>* {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            
                            text-align: center;
                        }

                        a {
                            margin: 0 auto;

                            white-space: nowrap;
                        }

                        &.idol-column {
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            picture {
                                img {
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    width: 62px;
                                    height: 62px;
                                    object-fit: contain;

                                    border-radius: 7px;
                                }
                            }

                            .idol-id {
                                margin-left: 10px;

                                color: #000;
                                font-weight: 500;
                            }
                        }

                        &.price {
                        }
                    
                    }
                }
                
                td:nth-of-type(4),
                td:nth-of-type(5) {
                    a {
                        display: block;
                        width: 66px;

                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        direction: rtl;
                    }
                }
            }
        }
    }
    

    .pagination {
        margin: 80px 0 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    
        p,
        button {
            background: transparent;
            color: #D2F4FF;
            font-size: 20px;
            font-weight: 700;
        }

        p {
            margin: 0 20px;

            color: #FFF;
        }
    }
   
    @media (min-width: 768px) {
        .activity-wrapper {
            .filter-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-column-gap: 15px;

                .event-select {
                    margin-top: 0;
                }
            }
        }
    }
   
    @media (min-width: 1200px) {
        .activity-wrapper {
            .filter-wrapper {
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-column-gap: 15px;

                .event-select,
                .time-select,
                .timerange-avg-price {
                    margin-top: 0;
                }
            }
        }
    }
`

export default ActivityStyles;