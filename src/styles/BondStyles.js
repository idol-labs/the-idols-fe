import styled from 'styled-components';

const BondStyles = styled.section`
    padding: 30px 30px 80px;

    text-align: center;

    .please-connect {
        margin-top: 40px;

        color: #FFF;
        font-size: 22px;
        font-weight: bold;
        line-height: 1.2;
    }

    .summary-bond {
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
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            &:first-child {
                margin-top: 0;
            }

            a {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                color: #000;
            }

            p {
                &.title {
                    margin-bottom: 15px;

                    color: #000;
                    font-size: 20px;
                }

                &:not(.title):not(.tooltip) {
                    font-size: 30px;
                }

                &.tooltip {
                    padding: 20px;
                    width: 45vw;
                    position: absolute;
                    top: 105%;
                    left: 25%; 
                    visibility: hidden;

                    border-radius: 10px;
                    background: #000;
                    color: #fff;
                    font-size: 16px;
                    line-height: 24px;
                    text-align: left;
                    z-index: 1;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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

            &.balance {
                .data {
                    display: flex;
                    justify-content: center;
                    align-items: center;
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

    .bonding-faq-wrapper {
        margin-top: 30px;
        display: block;
        
        .bonding {
            padding: 40px 16px 36px;

            background: white;
            border-radius: 11px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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

            .errors {
                color: red;
                text-align: left;
            }

            .bond-form {
                margin-top: 27px;
                display: flex;
                align-items: center;

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

                        font-size: 18px;
                        border: 0;
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                        text-align: right;
                        outline: none;
                    }

                    label {
                        position: absolute;
                        top: -7px;
                        left: 28px;
                        padding: 0 15px;

                        background: #FFF;

                        p {
                            color: rgba(13, 14, 14, .7);
                        }
                    }

                    button {
                        max-height: 29px;
                        padding: 8px 16px;
                        margin: 0 0 0 17px;

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
                        margin-left: 17px;
                        margin-right: 13px;
                    }
                }
            }

            .available {
                padding: 8px 0 0;
                
                background: white;
                border-radius: 11px;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                text-align: left;

                span {
                    color: rgba(13, 14, 14, .7);
                }
            }

            .warning {
                margin-top: 15px;
                
                color: red;
                text-align: left;
            }

            .bonding-results {
                padding: 40px 0 0;
                display: grid;
                grid-template-columns: auto 1fr;
                grid-row-gap: 20px;
                grid-column-gap: 50px;

                background: white;
                text-align: left;

                p {
                    &.title {
                    }

                    &:not(.title) {
                        color: rgba(13, 14, 14, .7);
                    }

                }
                  
            }


            .bonding-form-buttons {
                display: flex;
                flex-direction: column;
                align-items: center;

                background: white;

                button {
                    width: 249px;
                    margin: 20px 0 0 0;
                    padding: 12px 25px;

                    background: #4CB3D3;
                    color: white;
                    border-radius: 5px;
                    font-size: 20px;
                    font-weight: 700;
                    white-space: nowrap;

                    &:disabled {
                        background: #C4C4C4;
                        cursor: not-allowed;
                    }

                    &:hover {
                        background: #1BABFE;
                    }
                }
            }

        }

        .faq {
            margin-top: 30px;

            article {
                margin-top: 9px;
                padding: 16px 22px;

                background: #fff; 
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 11px;

                &:first-child {
                    margin-top: 0;
                }

                button {
                    padding: 0;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    font-size: 18px;
                    background: transparent;

                    p {
                        text-align: left;
                    }

                    svg {
                        &.active {
                            transform: rotate(180deg);
                        }
                    }
                }

                .answer {
                    height: 0px;
                    overflow: hidden;

                    color: #0D0E0E;
                    text-align: left;
                    color: rgba(13, 14, 14, .7);

                    a {
                        display: inline;
                    }

                    &.active {
                        height: auto;
                        margin-top: 16px;

                        line-height: 22px;
                    }
                }
                
            }
          
        }
    }
    

    @media (min-width: 768px) {
        .summary-bond {
            grid-template-columns: 1fr 1fr 1fr;
            grid-column-gap: 20px;

            article {
                margin-top: 0;

                p {
                    &.tooltip {
                        width: 30vw;
                        left: 0;
                    }
                }

                &:first-child {
                    p {
                        &.tooltip {
                            left: 25%;
                        }
                    }
                }

                &:nth-of-type(2) {
                    p {
                        &.tooltip {
                            left: -25%;
                        }
                    }
                }
            }
        }

        .bonding-faq-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 23px;
            grid-template-areas: 
                'form faq'
                '. faq';

            .bonding {
                grid-area: form;
            }

            .faq {
                grid-area: faq;
                margin-top: 0;
            }
        }
    }


    @media (min-width: 1200px) {
        .bonding-faq-wrapper {
            .bonding {
                .bonding-form-buttons {
                    flex-direction: row;
                    justify-content: center;

                    button {
                        width: 15vw;
                        max-width: 200px;

                        &:nth-of-type(2) {
                            margin-left: 20px;
                        }
                    }
                }
            }
        }
    }
`

export default BondStyles;