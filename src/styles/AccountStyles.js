import styled from 'styled-components';

const AccountStyles = styled.section`
    padding: 30px;
    
    .stats {
        display: grid;
        grid-template-columns: 1fr;
        
        article {
            position: relative;
            margin-top: 20px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            background: #D2F4FF;
            border-radius: 11px;
            border-bottom: 5px solid #D2F4FF;
            text-align: center;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            &:first-child {
                margin-top: 0;
            }

            a {
                color: #000;
            }

            p {
                &.title {
                    margin-bottom: 15px;

                    font-size: 20px;
                    color: #000;
                }

                &:not(.title){
                    font-size: 30px;
                }
            }

            &:hover {
                border-bottom: 5px solid #F8CD7F;

                background: #D2F4FF;

                p {
                    &:not(.title) {
                        color: #4CB3D3;
                    }

                    &:nth-of-type(2) {
                        color: #FF9900;
                    }
                }
            }

            &.estimated {
                .title {
                    font-size: 15px;
                }

                .data {
                    display: flex;
                    justify-content: space-between;
                    
                    p {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &:not(.title) {
                            display: flex;
                            justify-content: space-between;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }

    .claim-wrapper {
        margin-top: 30px;
        display: grid;
        grid-template-columns: 1fr;

        &>article {
            margin-top: 20px;
            padding: 18px 16px 23px;

            background: #fff;
            border-radius: 11px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            &:first-child {
                margin-top: 0;
            }

            .title {
                font-size: 20px;
                text-align: center;
            }

            section {
                margin-top: 11px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .reward-title {
                    font-size: 18px;
                }
                
                article {
                    display: flex;
                    align-items: center;

                    p {
                        color: rgba(13, 14, 14, .7);
                    }

                    button {
                        margin-left: 22px;
                        padding: 8px 16px;

                        border-radius: 5px;
                        background: #4CB3D3;
                        color: #FFF;
                        font-weight: 700;
                        text-transform: uppercase;

                        &:hover {
                            background: #1BABFE;
                        }
                    }
                }
            }
        }
    }


    .bids-wrapper {
        margin-top: 33px;
        display: grid;
        grid-template-columns: 1fr;

        article {
            margin-top: 20px;
            padding: 18px 16px 23px;
            overflow-y: hidden;
            overflow-x: auto;

            background: #fff;
            border-radius: 11px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            &:first-child {
                margin-top: 0;
            }

            .title-refresh-wrapper {
                display: grid;
                grid-template-columns: 50px 1fr auto;
                grid-template-areas: '. title button';
                align-items: center;

                .title {
                    grid-area: title;
                    font-size: 20px;
                    text-align: center;
                }

                button {
                    margin-right: 17px;
                    grid-area: button;
                    background: transparent;

                    img {
                        width: 31px;
                        height: 31px;
                    }

                    &.loading {
                        img {
                            animation-name: spin;
                            animation-duration: 500ms;
                            animation-iteration-count: infinite;
                            animation-timing-function: linear; 
                        }
                    }
                }
            }
         
            table {
                margin-top: 10px;
                width: 100%;

                tbody {
                    tr {
                        border-color: #000;
                        border-spacing: 0;

                        th,
                        td {
                            padding: 5px;

                            font-size: 24px;
                            text-align: center;
                            vertical-align: bottom;
                            white-space: nowrap;
                        } 

                        td {
                            font-weight: 300;

                            &>* {
                                margin: 0 auto;
                                display: flex;
                                justify-content: center;
                                
                                text-align: center;
                            }

                            a,
                            button {
                                padding: 8px 16px;
                         
                                background: #4CB3D3;
                                color: #fff;
                                font-size: 13.33px;
                                font-weight: 700;
                                border-radius: 5px;
                                text-transform: uppercase;

                                &:hover {
                                    background: #1BABFE;
                                }
                            }

                            &:nth-of-type(2) {
                                p {
                                    display: flex;
                                    align-items: center;

                                    svg {
                                        position: relative;
                                        top: -2px;
                                        width: 27px;
                                        height: 27px;
                                    }
                                }
                            }

                            &:nth-of-type(3) {
                                p {
                                    display: block;
                                    width: 80px;

                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    direction: rtl;
                                }
                            }

                            &:last-child {
                                max-width: 70px;
                            }
                        }

                    }
                }
            }
        }
    }

    ul.results {
        margin-top: 28px;
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
                    padding: 13px 13px 5px;
                    min-height: 80px;
                    display: flex;
                    justify-content: space-between;

                    background: #fff;

                    .title-list-wrapper {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .card-title {
                            position: relative;
                            margin-top: 5px;

                            color: rgba(0, 0, 0, .7);
                            font-size: 20px;
                            white-space: nowrap;
                        }

                        div {
                            padding: 7px 0 4.5px;
                            max-width: 80px;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            font-size: 13px;
                            font-weight: 700;
                            background: linear-gradient(94.64deg, #4CB3D3 4.5%, #D884FF 100%);
                            color: #fff;
                            border: 1px solid #000;
                            border-radius: 25px;
                            text-align: center;

                            &.unlisted {
                                max-width: 100px;

                                background: linear-gradient(97.18deg, #4CB3D3 0%, #F7E099 106.11%);
                            }
                        }
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
                                color: rgba(0, 0, 0, .7);
                            }

                            svg {
                                position: relative;
                                top: -2px;
                                width: 20px;
                                height: 20px;
                            }

                            .price-value {
                                font-size: 20px;
                                color: rgba(0, 0, 0, .7);
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

        button {
            &:hover {
                background: #1BABFE;
            }
        }
    }

    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }


    @media (min-width: 768px) {
        ul.results {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 15px;
            grid-row-gap: 15px;
        }
    }

    @media (min-width: 980px) {
        ul.results {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;

            li {
                margin-top: 0;
            }
        }
    }

    @media (min-width: 1200px) {
        .stats {
            grid-template-columns: 1fr 1fr 1fr;
            grid-column-gap: 20px;
            
            article {
                margin-top: 0;
            }
        }

        .claim-wrapper {
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 20px;

            article {
                margin-top: 0;
            }
        }

        .bids-wrapper {
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 20px;

            article {
                margin-top: 0;
            }
        }

        ul.results {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
`

export default AccountStyles;