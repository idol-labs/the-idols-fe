import styled from 'styled-components';

const HeaderStyles = styled.header`
    grid-area: header;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: transparent;
    z-index: 1;

    /* &.light {
        background: #FFFBF4;
    } */

    .hamburger {
        fill: #FFF;
        background: transparent;
    }

    .header-buttons {
        margin-left: auto;

        .idol-dropdown {
            display: none;
        }
    
        .wallet-connect {
            button {
                padding: 8px 28px;

                background: #4CB4D3;
                color: white;
                border-radius: 5px;
                font-size: 20px;
                text-transform: uppercase;

                span {
                    position: relative;
                    top: 2px;

                    font-weight: 700;
                }

                &.wrong-network {
                    background: rgb(255, 67, 67);
                }

                &:hover {
                    background: #1BABFE;
                }
            }

            p {
                font-size: 18px;
                font-weight: bold;

                span:nth-of-type(1) {
                    margin-right: 5px;
                }
            }

            &>p {
                display: flex;
                align-items: center;

                .account-id {
                    display: block;
                    width: 80px;
                
                    color: #199b27;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    @media (min-width: 980px) {
        justify-content: flex-end;

        .hamburger {
            display: none;
        }

        .header-buttons {
            display: flex;

            .idol-dropdown {
                position: relative;
                display: block;
                margin-left: auto;

                button {
                    padding: 8px 28px;

                    background: #4CB4D3;
                    color: white;
                    border-radius: 5px;
                    font-size: 20px;
                    text-transform: uppercase;

                    span {
                        position: relative;
                        top: 2px;

                        font-weight: 700;
                    }

                    &:hover {
                        background: #1BABFE;
                    }
                }
                
                section {
                    display: none;
                    position: absolute;
                    bottom: -85px;
                    left: -70px;
                    width: 232px;
                    padding-top: 10px;
                    
                    background: black;
                    color: white;
                    border-radius: 10px;

                    p {
                        padding: 10px 0;

                        font-size: 14px;
                        font-weight: 700;
                        border-top: 1px solid white;
                        border-bottom: 1px solid white;
                        text-align: center;
                    }

                    button {
                        width: 100%;
                        
                        background: transparent;
                        font-weight: 700;
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 10px;

                        &:hover {
                            background: #0e506a;
                        }
                    }
                }

                &:hover {
                    section {
                        display: block;
                    }
                }
            }

            .wallet-connect {
                margin-left: 20px;
            }
        }
        
   
    }
    
`

export default HeaderStyles;