import styled from 'styled-components';

const MarketplaceHeaderStyles = styled.section`
    display: block;
    text-align: center;

    &+svg {
        width: 135px;
        margin: 0 auto;
    }

    h1 {
        margin: 27px auto 30px;

        color: #FFF;
        font-size: 35px;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
    }

    .stats {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 1fr;
        grid-column-gap: 20px;

        article {
            position: relative;
            padding: 13px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            background: #D2F4FF;
            border-radius: 11px;
            border-bottom: 5px solid #D2F4FF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            &:nth-of-type(2),
            &:nth-of-type(3),
            &:nth-of-type(4) {
                margin-top: 20px;
            }

            &:nth-of-type(2) {
                justify-content: flex-start;
            }

            &.stat-total-sales {
                .activity-link {
                    margin-top: 5px;

                    font-size: 16px;
                }
            }

            p {
                font-size: 30px;

                &:nth-of-type(1) {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    color: #000;

                    svg {
                        position: relative;
                        top: -5px;
                    }
                }

                &:nth-of-type(2) {
                    margin-top: 10px;

                    font-size: 20px;
                    color: #000;
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

            &:hover {
                border-bottom: 5px solid #F8CD7F;

                background: #D2F4FF;

                p {
                    &:nth-of-type(1) {
                        color: #FF9900;
                    }
                }

                .tooltip {
                    visibility: visible;
                }
            }
        }
    }


    @media (min-width: 768px) {
        .stats {
            grid-template-columns: 1fr 1fr 1fr;

            article {
                padding: 32px 32px 13px;

                p {
                    &.tooltip {
                        width: 20vw;
                    }
                }

                /* &:nth-of-type(1) {
                    grid-column: 1 / span 2;
                } */

                &:nth-of-type(2),
                &:nth-of-type(3),
                &:nth-of-type(4) {
                    margin-top: 0;
                }
            }
        }
    }
`

export default MarketplaceHeaderStyles;