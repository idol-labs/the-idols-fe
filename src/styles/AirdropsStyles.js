import styled from 'styled-components';

const AirdropsStyles = styled.section`
    padding: 30px;
    display: block;
    text-align: center;

    .please-connect {
        margin-top: 40px;

        color: #FFF;
        font-size: 22px;
        font-weight: bold;
        line-height: 1.2;
    }

    &+svg {
        width: 135px;
        margin: 0 auto;
    }

    h1 {
        margin: 27px auto 30px;

        color: #FFF;
        font-size: 50px;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
    }   

    .airdrops-wrapper {
        margin-top: 127px;
        margin-bottom: 380px;
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;

        .column-1,
        .column-2 {
            width: 100%;
        }

        .column-1 > article,
        .column-2 > article {
            margin: 22px auto 0;
            max-width: 450px;
            display: flex;
            flex-direction: column;

            background: #fff;
            border-radius: 11px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            button {
                &.dropdown-open {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    padding: 0;

                    background: transparent;

                    svg {
                        margin: 16px 15px 10px auto;
                        display: flex;
                        justify-content: end;
                        
                        transform: rotate(180deg)
                    }
                }
                &.dropdown-collapsed {
                    padding: 10px 15px;
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    grid-template-areas:
                        '. title chevron';
                    align-items: center;

                    background: transparent;

                    p {
                        grid-area: title;

                        font-size: 20px;
                    }

                    svg {
                        grid-area: chevron;
                        display: flex;
                        justify-content: end;
                    }                       
                }
            }

            picture {
                display: block;
                
                width: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;

                    border-radius: 11px;
                }
            }

            &>section {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 20px;

                .info {
                    p {
                        &.title {
                            font-size: 25px;
                            font-weight: 700;

                            text-transform: uppercase;
                        }

                        &.description {
                            margin-top: 29px;

                            font-size: 20px;
                            line-height: 1.5;
                        }
                    }

                    label,
                    input {
                        margin: 0 auto;
                        display: block;
                    }

                    label {
                        margin-top: 20px;

                        font-size: 25px;
                    }

                    input {
                        margin-top: 10px;
                        padding: 17px 10px;
                        width: 100%;
                        
                        font-size: 16px;
                        text-align: center;
                        border: 0.7px solid #000000;
                        border-radius: 8px;
                        outline: none;
                    }
                }
              
                button {
                    &.btn-claim {
                        width: 200px;
                        height: 60px;
                        margin: 34px auto 0;

                        font-size: 35px;
                        font-weight: 700;
                        color: #1F86A3;
                        background: linear-gradient(92.14deg, #FCE9A4 2.23%, #FFFFFF 100%);
                        border-radius: 5px;
                        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                        text-transform: uppercase;

                        &:hover {
                            background: linear-gradient(92.14deg, #1BABFE 2.23%, #FFFFFF 100%);
                        }
                    }
                }
            }

            &.goldlist-wrapper {
                &>section {
                    justify-content: flex-start;
                }
                .already-minted {
                    margin-top: 10px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    p {
                        margin-top: 20px;

                        font-size: 20px;

                        span {
                            font-weight: 700;
                        }
                    }
                }
            }

            &.accrued-goldlist-wrapper,
            &.rewards-wrapper,
            &.offering-refund-wrapper {
                width: 100%;
                
                background: transparent;

                button {
                    padding: 10px 15px;
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    grid-template-areas:
                        '. title chevron';
                    align-items: center;

                    background: #fff;
                    font-size: 20px;
                    border-radius: 5px;
                    text-transform: uppercase;
                 
                    .title {
                        grid-area: title;
                    }

                    svg {
                        grid-area: chevron;
                        display: flex;
                        justify-content: end;
                    }     

                    &.active {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;

                        svg {
                            transform: rotate(180deg);
                        }
                    }
                }

                .accrued-goldlist,
                .rewards,
                .offering-refund {
                    padding: 0;
                    height: 0;
                    overflow: hidden;

                    background: #fff;
                    border-radius: 11px;
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;

                    &.active {
                        padding: 0 20px 30px 20px; 
                        height: auto;
                    }
                  
                    section {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        &:not(:first-child) {
                            margin-top: 11px;
                        }

                        .reward-title {
                            display: flex;
                            align-items: center;

                            font-size: 18px;

                            span {
                                text-align: left;
                            }
                        }
                        
                        article {
                            display: flex;
                            align-items: center;

                            p {
                                color: rgba(13, 14, 14, .7);
                                text-align: right;
                            }

                            button {
                                margin: 0 0 0 22px;
                                padding: 8px 16px;
                                width: auto;
                                height: auto;

                                border-radius: 5px;
                                background: #4CB3D3;
                                color: #FFF;
                                font-size: 16px;
                                font-weight: 700;
                                text-transform: uppercase;

                                &:hover {
                                    background: #1BABFE;
                                }
                            }
                        }

                        &:nth-of-type(1),
                        &:nth-of-type(3) {
                            .reward-title {
                                svg {
                                    width: 34px;
                                }
                                span {
                                    margin-top: 5px;
                                }
                            }
                        }

                        &:nth-of-type(2),
                        &:nth-of-type(3), 
                        &:nth-of-type(4) {
                            .reward-title {
                                span {
                                    margin-top: 5px;
                                    margin-left: 4px;
                                }
                            }
                        }
                    }
                }
            }

            &.accrued-goldlist-wrapper {
                section {
                    .reward-title {
                        span {
                            margin-top: 5px;
                            margin-left: 4px;
                        }
                    }
                }
            }


            &.virtuous-wrapper {
                background: #fff;

                &>section {
                    height: auto;

                    .info {
                        section {
                            text-align: left;

                            .description-virtuous {
                                text-align: center;
                            }

                            p {
                                span {
                                    font-weight: 700;
                                }
                            }
                        }
                    }
                }
            }
           
        }

        .column-1 > article {
            &:nth-of-type(1) {
                margin-top: 0;
            }
        }


    }

    @media (min-width: 1200px) {
        .rewards-wrapper {
            width: 50vw;
        }
        
        .airdrops-wrapper {
            margin: 127px auto 0;
            max-width: 69vw;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-areas: 
                'col1 col2'
                'col1 .';
            grid-column-gap: 36px;
            justify-items: center;

            .column-1 {
                grid-area: col1;
            }

            .column-2 {
                grid-area: col2;
            }

            .column-1 > article,
            .column-2 > article {
                max-width: unset;

                picture {
                    img {
                        height: 60vh;
                    }
                }
            }

            .column-2 > article {
                &:nth-of-type(1) {
                    margin-top: 0;
                }
            }
        }
    }
   
`

export default AirdropsStyles;