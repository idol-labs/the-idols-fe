import styled from 'styled-components';

const StakeStyles = styled.section`
    padding: 30px 30px 80px;

    text-align: center;

    .please-connect {
        margin-top: 40px;

        color: #FFF;
        font-size: 22px;
        font-weight: bold;
        line-height: 1.2;
    }

    .summary-stake {
        display: grid;
        grid-template-columns: 1fr;
        grid-column-gap: 20px;
        
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
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            &:first-child {
                margin-top: 0;
            }

            p {
                
                &.title {
                    margin-bottom: 15px;

                    font-size: 20px;
                    color: #000;
                }

                &:not(.title):not(.tooltip) {
                    font-size: 30px;
                }

                &.tooltip {
                    padding: 20px;
                    width: 80vw;
                    position: absolute;
                    top: 105%;
                    left: 0; 
                    visibility: hidden;

                    border-radius: 10px;
                    background: #000;
                    color: #fff;
                    font-size: 16px;
                    line-height: 24px;
                    text-align: left;
                    z-index: 1;

                    &:after {
                        content: " ";
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        margin-left: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent transparent black transparent ;
                    }
                }
            }

            &:hover {
                border-bottom: 5px solid #F8CD7F;

                background: #D2F4FF;

                p {
                    &:not(.title):not(.tooltip) {
                        color: #FF9900;
                    }
                }

                .tooltip {
                    visibility: visible;
                }
            }
        }
    }

    .staking-rewards-wrapper {
        margin-top: 30px;

        .staking-wrapper {
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            .staking {
                padding: 46px 30px 20px;

                background: #fff;
                border-radius: 11px;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;

                .buttons-wrapper {
                    display: flex;
                    justify-content: flex-start;
                    overflow: auto;

                    border-bottom: 1px solid #AAAAAA;

                    button {
                        padding: 12px 24px;

                        background: transparent;
                        font-size: 20px;
                        color: rgba(13, 14, 14, .7);

                        &.active-link,
                        &:hover {
                            background: #CFF4FF;
                            color: #4CB3D3;
                            font-weight: 700;
                            border-bottom: 1px solid #43B4D4;
                            opacity: 1;
                        }
                    }
                }

                .stake-description {
                    margin-top: 25px;

                    font-size: 20px;
                    text-align: left;
                    color: rgba(13, 14, 14, .7);
                }

                .errors {
                    margin-top: 30px;

                    color: red;
                    text-align: left;
                }

                .stake-form {
                    margin-top: 10px;
                    display: block;

                    .input-wrapper {
                        width: 100%;
                        position: relative;
                        display: flex;
                        align-items: center;

                        border: 0.7px solid #000000;
                        border-radius: 8px;

                        input {
                            width: 100%;
                            display: block;
                            margin: 0;
                            padding: 17px 0;

                            border: 0;
                            border-right: 0;
                            border-top-left-radius: 8px;
                            border-bottom-left-radius: 8px;
                            font-size: 18px;
                            text-align: right;
                            outline: none;
                        }
                        label {
                            display: none;
                            position: absolute;
                            top: -7px;
                            left: 28px;
                            padding: 0 15px;

                            background: white;

                            p {
                                color: rgba(13, 14, 14, .7);
                            }
                        }

                        button {
                            max-height: 29px;
                            padding: 8px 16px;
                            margin: 0 17px;

                            background: #4CB4D3;
                            color: white;
                            border-radius: 5px;
                            font-size: 13.33px;
                            font-weight: 700;
                            text-transform: uppercase;

                            &:hover {
                                background: #1BABFE;
                            }
                        }

                        svg {
                            margin-right: 13px;
                        }
                    }

                    .available {       
                        padding-top: 10px;

                        background: #fff;
                        border-radius: 11px;
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        text-align: left;

                        span {
                            color: rgba(13, 14, 14, .7);
                        }
                    }

                    .stake-form-buttons {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        
                        button {
                            text-transform: uppercase;

                            &:disabled {
                                background: #C4C4C4;
                                cursor: not-allowed;
                            }
                        }                      

                        .approve-button,
                        .stake-button {
                            width: 249px;
                            margin: 20px 0 0 0;
                            padding: 12px 25px;

                            background: #4CB3D3;
                            color: white;
                            border-radius: 5px;
                            font-size: 20px;
                            font-weight: 700;
                            white-space: nowrap;
                            text-transform: uppercase;

                            &:hover {
                                background: #1BABFE;
                            }
                        }
                    }


                    .disclaimer {
                        margin-top: 20px;

                        color: rgba(13, 14, 14, .7);
                        text-align: left;
                    }
                
                }
            }

            .staking-info {
                padding: 40px 30px;
                display: block;

                background: white;  
                font-size: 18px;  
                text-align: left;
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;

                p {
                    margin: 20px 0 8px;

                    &:first-child {
                        margin-top: 0;
                    }
                }
                
                a {
                    width: 200px;

                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }

        .rewards-wrapper {
            margin-top: 30px;

            .rewards {
                padding: 10px 20px 30px;

                background: #fff;
                border-radius: 11px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

                .title {
                    font-size: 20px;
                    text-align: center;
                }

                section {
                    margin-top: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .reward-title {
                        display: flex;
                        align-items: center;

                        font-size: 18px;

                        svg {
                            width: 34px;
                        }
                        span {
                            margin-top: 5px;
                        }
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
    }
    

    @media (min-width: 768px) {
        .summary-stake {
            grid-template-columns: 1fr 1fr 1fr 1fr;

            article {
                margin-top: 0;

                p {
                    &.tooltip {
                        width: 20vw;
                    }
                }

                &:nth-of-type(2),
                &:nth-of-type(3) {
                    p {
                        &.tooltip {
                            width: 40vw;
                        }
                    }
                }

                &:last-child {
                    p { 
                        &.tooltip {
                            left: -15%; 
                        }
                    }
                }
            }
        }

        .staking-rewards-wrapper {
            .staking-wrapper {
                .staking {
                    padding-left: 74px;
                    padding-right: 74px;
                }

                .staking-info {
                    padding: 40px 74px;
                    display: grid;
                    grid-template-columns: auto 1fr;
                    align-items: center;

                    p {
                        margin-bottom: 18px;
                    }

                    a {
                        width: unset;
                        margin-left: 86px;

                        overflow: visible;
                        white-space: unset;
                        text-overflow: unset;
                    }
                }
            }
        }
    }

    @media (min-width: 980px) {
        .summary-stake {
            article {
                p {
                    &.tooltip {
                        width: 17vw;
                    }
                }

                &:nth-of-type(2),
                &:nth-of-type(3) {
                    p {
                        &.tooltip {
                            width: 27vw;
                        }
                    }
                }
            }
        }
    }

    @media (min-width: 1200px) {
        .staking-rewards-wrapper {
            display: grid;
            grid-template-columns: calc(50% - 10px) 1fr;
            grid-column-gap: 20px;

            .staking-wrapper {
                .staking {
                    .stake-form {
                        display: block;
                        
                        .stake-form-buttons {
                            .stake-button {
                                margin-top: 10px;
                            }
                        }
                    }
                }
                .staking-info {
                    overflow: auto;

                    a {
                        width: 8vw;

                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
            }

            .rewards-wrapper {
                margin-top: 0;
            }
        }
    }

    @media (min-width: 1500px) {
        .staking-rewards-wrapper {
            .staking-wrapper {
                .staking {
                    .stake-form {
                        .stake-form-buttons {
                            margin-top: 20px;
                            flex-direction: row;
                            justify-content: center;

                            .approve-button,
                            .stake-button {
                                margin-top: 0;
                            }

                            .approve-button {
                                max-width: 200px;
                            }

                            .stake-button {
                                margin-left: 20px;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (min-width: 1600px) {
        .staking-rewards-wrapper {
            .staking-wrapper {
                .staking-info {
                    a {
                        width: auto;
                    }
                }
            }
        }
    }
`

export default StakeStyles;