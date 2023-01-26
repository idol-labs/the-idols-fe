import styled from 'styled-components';

const MarketplaceStyles = styled.section`
    padding: 30px;
    
    /* background: linear-gradient(123.33deg, #FFF4DF 0%, #FFE0A8 82.43%); */

    input {
        outline: none;
    }

    .search-filter-sort-wrapper {
        margin-top: 76px;
        display: block;
        align-items: start;

        .search-gods-button-wrapper {
            grid-area: gods;
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
        
        .filter-tools {
            margin-top: 20px;
            grid-area: filters;
            position: relative;
            padding: 10px;
            display: flex;
            align-items: center;
            z-index: 1;

            background: #fff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            .filter-button-wrapper {
                width: 100%;
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;

                background: #FFF;
                cursor: pointer;

                .filter-title {
                    color: rgb(33, 33, 33, 0.7);
                    font-size: 20px;
                    white-space: nowrap;
                }

                .active-filters-input-wrapper {
                    display: inline-flex;
                    align-items: center;
                    flex: 1 1 0%;
                    flex-wrap: wrap;
                    overflow: hidden;

                    article {
                        margin-left: 5px;
                        display: flex;
                        align-items: center;

                        p {
                            color: rgb(33, 33, 33, 0.7);
                        }

                        button {
                            display: flex;
                            align-items: center;

                            background: transparent;
                           
                            svg {
                                width: 14px;
                            }
                        }

                        &.filter-input {
                            flex: 1 1 auto;
                            display: inline-grid;
                            grid-area: 1 / 1 / 2 / 3;
                            grid-template-columns: 0px min-content;

                            font-size: 20px;

                            input {
                                padding: 0;
                                grid-area: 1 / 2;
                                min-width: 2px;
                                width: 100%;

                                font-size: 20px;
                                border: none;
                                text-align: right;
                            }

                            &:after {
                                content: attr(data-value) " ";
                                visibility: hidden;
                                white-space: pre;
                                grid-area: 1 / 2;
                                font: inherit;
                                min-width: 2px;
                            }
                        }
                    }
                }

                .reset-wrapper {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;

                    .reset-filters {
                        margin-right: 5px;

                        background: transparent;

                        svg {
                            width: 20px;

                            fill: #C4C4C4;
                        }
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
                    &>svg {
                        margin-left: 12px;
                        justify-self: end;
                        width: 20px;
                        height: 20px;

                        fill: #C4C4C4;
                        border-left: 1px solid #C4C4C4;
                    }
                }
                

                &.filters-active {
                    grid-template-columns: auto 1fr auto auto;

                    .reset-wrapper {
                        .svg-wrapper {
                            margin-left: 0;
                        }
                    }
                   
                }
            }

            ul.filter-list {
                position: absolute;
                top: 105%;
                left: 0;
                right: 0;
                padding: 15px 0;
                max-height: 40vh;
                overflow-y: scroll;
                z-index: 1;

                background: #fff;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                
                li {
                    margin-top: 10px;

                    &.trait-type {
                        padding: 10px 15px 0;

                        color: rgb(33, 33, 33, 0.7);
                        font-size: 12px;
                        text-transform: uppercase;
                    }

                    button {
                        width: 100%;
                        padding: 5px 15px;

                        color: #212121;
                        font-size: 16px;
                        background: transparent;
                        text-align: left;

                        &.active {
                            color: #ee8976;
                        }

                        &:hover {
                            background: #43B4D4;
                        }
                    }
                }
               
            }
        }


        .sort,
        .listed-select {
            position: relative;

            .sort-button-wrapper,
            .list-button-wrapper {
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                background: #fff;
                border-radius: 4px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                cursor: pointer;

                .sort-title,
                .list-title {
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

            ul.filter-list,
            ul.list-list {
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


        .sort {
            margin-top: 20px;
            grid-area: sort;
        }

        .listed-select {
            margin-top: 20px;
            grid-area: list-select;
        }
      
    }
    

    .no-results {
        margin-top: 70px;
        display: flex;
        justify-content: center;
        align-items: center;

        color: #c82c67;
        font-size: 20px;
        font-weight: bold;
    }


    ul.results {
        margin-top: 11px;
        display: block;

        li {
            margin: 35px auto 0;
            width: 100%;
            max-width: 300px;
            overflow: hidden;

            background: #fff;
            border-radius: 10px;
            transition: all .1s linear;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            &:hover {
                position: relative;
                top: -2px;

                box-shadow: -1px 10px 15px 0 rgba(0,0,0,.5);
            }

            a {
                picture {
                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        max-width: 300px;
                        max-height: 300px;
                        object-fit: contain;

                        border-radius: 10px;
                    }
                }
                
                .card-info {
                    padding: 13px;
                    min-height: 80px;
                    display: flex;
                    justify-content: space-between;

                    background: #fff;

                    .card-title {
                        position: relative;
                        margin-top: 5px;

                        color: rgb(0, 0, 0, 0.7);
                        font-size: 20px;
                        white-space: nowrap;
                    }

                    .price-wrapper {
                        margin-top: 5px;

                        p {
                            min-height: 20px;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;

                            .price-title {
                                font-size: 9px;
                                color: rgb(0, 0, 0, 0.7);
                            }

                            svg {
                                position: relative;
                                top: -2px;
                                width: 20px;
                                height: 20px;
                            }

                            .price-value {
                                font-size: 20px;
                                color: rgb(0, 0, 0, 0.7);
                            }

                            &.last-bought {
                                margin-top: 5px;
                                min-height: 14px;

                                .price-title {
                                    font-size: 14px;
                                }

                                svg {
                                    width: 13px;
                                    height: 13px;
                                }

                                .price-value {
                                    font-size: 9px;
                                }
                            }

                            &.top-bid {
                                margin-top: 5px;
                                min-height: 9px;

                                svg {
                                    width: 13px;
                                    height: 13px;
                                }

                                .price-value {
                                    font-size: 9px;
                                }
                            }
                        }
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
        .search-filter-sort-wrapper {
            display: grid;
            grid-template-columns: repeat(2, minmax(0,2fr));
            grid-column-gap: 15px;
            grid-template-areas: 
                'gods filters'
                'list-select sort';

            .filter-tools {
                margin-top: 0;
            }

            .sort,
            .listed-select  {
                margin-top: 20px;
            }
        }

        ul.results {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 15px;
            grid-row-gap: 15px;
        }
    }

    @media (min-width: 980px) {
        .search-filter-sort-wrapper {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-column-gap: 15px;
            grid-template-areas: 
                'gods filters filters'
                '. list-select sort';

            .sort,
            .listed-select  {
                margin-top: 20px;
            }
        }

        ul.results {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media (min-width: 1300px) {
        .search-filter-sort-wrapper {
            grid-template-columns: repeat(4,minmax(0, 1fr));
            grid-template-areas: 
                'gods filters list-select sort';

            .sort,
            .listed-select {
                margin-top: 0;
            }
        }

        ul.results {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
`

export default MarketplaceStyles;