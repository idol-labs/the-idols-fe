import styled from 'styled-components';

const PopupStyles = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.75);
    z-index: 2;

    &>section {
        padding: 16px 13px 47px;
        width: 600px;
        padding: 20px;

        background: white;
        border-radius: 10px;
        animation: flyin 0.5s;

        &>p {
            display: flex;
            justify-content: center;
            align-items: center;

            font-weight: bold;
            text-align: center;
        }

        .popup-title {
            margin-top: 10px;

            font-size: 26px;

            span {
                margin-left: 10px;
            }
        }

        .errors {
            margin-top: 10px;

            color: red;
        }

        .approve-note {
            margin-top: 15px;
        }

        &>section {
            text-align: center;

            .input-wrapper {
                margin-top: 16px;
                position: relative;
                display: flex;
                align-items: center;

                border: 0.7px solid #000000;
                border-radius: 8px;

                input {
                    width: 100%;
                    display: block;
                    margin: 0;
                    padding: 17px;

                    font-size: 20px;
                    color: rgba(13, 14, 14, .7);
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
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(13, 14, 14, .7);
                    }
                }

                svg {
                    position: relative;
                    top: -3px;
                    width: 32px;
                    height: 32px;
                }

                &:nth-of-type(1) {
                    padding-right: 10px;
                    input {
                        padding-right: 0;
                    }
                }

                &.to-address {
                    input {
                        margin-right: 4px;
                    }
                }
            }

            .prices {
                margin: 26px 0 0 0;
                display: grid;
                grid-template-columns: 1fr 1fr; 
                justify-items: end;
                grid-column-gap: 5.5vw;

                font-size: 18px;
                font-weight: 400;  
            
                .new-title,
                .new-value {
                    margin-top: 21px;
                    font-weight: 700;
                }

                .current-value,
                .new-value {
                    justify-self: start;

                    font-size: 16px;
                }

                .list-title,
                .list-value {
                    font-weight: 700;
                }

                .current-title,
                .current-value {
                    margin-top: 21px;
                }

                .list-value,
                .current-value,
                .new-value {
                    justify-self: start;

                    span {
                        margin-left: 15px;
                    }
                }
            }

            .confirm-dialog {
                margin-top: 20px;
                p {
                    font-size: 18px;

                    &:nth-of-type(2) {
                        margin-top: 10px;
                    }
                }
            }

            .buttons-wrapper {
                margin-top: 33px;
                display: flex;
                justify-content: center;

                button {
                    padding: 8px 28px;
                    min-width: 200px;

                    color: #1F86A3;
                    border-radius: 5px;
                    font-size: 26px;
                    font-weight: 700;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

                    &.submit,
                    &.btn-list,
                    &.btn-bid {
                        background: linear-gradient(92.14deg, #FCE9A4 2.23%, #FFFFFF 100%);
                        
                        &:hover {
                            background: linear-gradient(92.14deg, #1BABFE 2.23%, #FFFFFF 100%);
                        }
                    }

                    &.cancel,
                    &.btn-delist,
                    &.btn-bid-withdraw {
                        margin-left: 3vw;

                        background: linear-gradient(92.14deg, #FCA9A4 2.23%, #FFFFFF 100%);

                        &:hover {
                            background: linear-gradient(92.14deg, #1BABFE 2.23%, #FFFFFF 100%);
                        }
                    }
                }
                    
            }

            .offer-disclaimer,
            .bid-disclaimer {
                margin-top: 40px;

                color: red;
                font-size: 18px;
                font-weight: 700;
                text-align: left;
            }
        }

        &.notification {
            width: min(600px, 100vw);
        }

        &.transaction {
            .loading-icon {
                margin: 0;
                padding: 0;
            }
            p {
                max-width: 500px;
                display: block;
                line-height: 1.5;

                span {
                    display: inline;
                }
                a {
                    margin-left: 5px;
                    display: inline;
                }
            }
        }

        &.bid {
            section {
                .bid-current {
                    margin-top: 15px;
                }
            }
        }

        &.bond {
            text-align: center;
            
            p {
                display: inline;

                line-height: 1.5;

                a {
                    display: inline;
                }
            }
        }

    }

    @keyframes flyin {
        0% {
            transform: translateY(-100vh);
        }
        100%{
            transform: translateY(0);
        }
    }
`

export default PopupStyles;