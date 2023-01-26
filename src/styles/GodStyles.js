import styled from 'styled-components';

const GodStyles = styled.section`
    padding: 30px;

    .card-content-wrapper {
        margin-top: 128px;
        display: block;

        .card-hyype-wrapper {
            .card {
                background: #fff;
                border-radius: 10px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

                picture {
                    display: block;
                    width: 100%;
                    height: 80%;
                    
                    img {
                        display: block;
                        width: 100%;
                        object-fit: cover;

                        border-radius: 10px;
                    }
                }

                .card-info {
                    padding: 17px;
                    min-height: 80px;
                    display: flex;
                    justify-content: space-between;

                    background: #fff;
                    border-radius: 10px;

                    .card-title {
                        position: relative;
                        margin-top: 5px;

                        color: rgba(0, 0, 0, .7);
                        font-size: 30px;
                        white-space: nowrap;

                        &:hover {
                            color: #1BABFE;
                        }
                    }

                    .price-wrapper {
                        p {
                            min-height: 40px;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;

                            .price-title {
                                font-size: 18px;
                                color: rgba(0, 0, 0, .7);
                            }

                            svg {
                                position: relative;
                                top: -2px;
                                width: 30px;
                                height: 30px;
                            }

                            .price-value {
                                font-size: 20px;
                                color: rgba(0, 0, 0, .7);
                            }

                            &.last-bought {
                                margin-top: 5px;
                                min-height: 20px;

                                .price-title {
                                    font-size: 20px;
                                }

                                svg {
                                    width: 20px;
                                    height: 20px;
                                }

                                .price-value {
                                    font-size: 20px;
                                }
                            }

                            &.top-bid {
                                margin-top: 5px;
                                min-height: 18px;

                                font-size: 18px;

                                svg {
                                    width: 27px;
                                    height: 27px;
                                }

                                .price-value {
                                    font-size: 18px;
                                }
                            }
                        }
                    }
                }
            }

            .hyype-wrapper {
                margin-top: 16px;
                width: 100%;

                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

                button {
                    padding: 13px 15px;
                    width: 100%;
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    grid-template-areas:
                        '. title chevron';
                    align-items: center;

                    background: #fff;
                    font-size: 26px;
                    border-radius: 5px;
                    
                    .title {
                        grid-area: title;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        svg {
                            width: 85px;
                            height: 28px;
                        }
                    }

                    &>svg {
                        grid-area: chevron;
                        display: flex;
                        justify-content: end;
                    }     

                    &.active {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;

                        &>svg {
                            transform: rotate(180deg);
                        }
                    }
                }

                .hyype-feed {
                    padding: 0;
                    height: 0;
                    overflow: hidden;

                    background: #fff;
                    border-radius: 11px;
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;

                    &.active {
                        padding: 0 20px 20px; 
                        height: auto;
                    }

                    .hyype-connect {
                        text-align: center;
                        font-weight: 300;

                        a {
                            display: inline;
                        }
                    }
                    
                    ul {
                        margin-top: 8px;
                        max-height: 60vh;
                        overflow: auto;

                        li {
                            margin-top: 9px;
                            padding: 15px 13px;

                            background: #FEF8EC;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                            border-radius: 5px;

                            &.no-feed {
                                font-size: 18px;
                                font-weight: 300;
                            }

                            &:nth-of-type(1) {
                                margin-top: 0;
                            }

                            &:nth-of-type(2n) {
                                background: #FFF3DE;
                            }

                            .hyype-post-profile {
                                display: flex;

                                picture {
                                    display: block;
                                    width: 40px;
                                    height: 40px;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                        object-fit: contain;
                                    }
                                }
                                .author-timestamp-wrapper {
                                    margin-left: 10px;
                                    display: flex;
                                    align-items: center;

                                    p,
                                    span {
                                        font-size: 24px;
                                    } 
                                    
                                    span {
                                        margin: 0 5px;
                                    }

                                    .timestamp {
                                        color: rgba(13,14,14,.7);
                                    }
                                }
                            }

                            .hyype-post-main {
                                margin-top: 12px;
                                display: flex;
                                align-items: start;
                                justify-content: center;

                                p {
                                    min-width: 55%;
                                    width: 100%;

                                    font-size: 18px;
                                    font-weight: 300;
                                }

                                picture {
                                    margin-left: 20px;
                                    display: block;
                                    max-width: 215px;
                                    max-height: 215px;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                        object-fit: contain;

                                        border-radius: 6px;
                                    }
                                }
                            }

                            a {
                                margin-top: 7px;
                                font-weight: 700;
                            }
                        }
                    }
                }
            }
        }

        .content {
            margin-top: 16px;

            .marketplace-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-column-gap: 15px;
                grid-template-areas: 
                    'buy bid'
                    'transfer list'
                    '. accept';

                button {
                    margin-bottom: 15px;
                    padding: 10px;
                    width: 100%;
                    display: block;

                    background: linear-gradient(92.14deg, #FCE9A4 2.23%, #FFFFFF 100%);
                    color: #4D5154;
                    font-size: 20px;
                    font-weight: 700;
                    border-radius: 5px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    text-transform: uppercase;

                    &:nth-of-type(1),
                    &:nth-of-type(2) {
                        margin-top: 0;
                    }

                    &.btn-buy {
                        grid-area: buy;
                    }
                    &.btn-bid {
                        grid-area: bid;
                    }
                    &.btn-transfer {
                        grid-area: transfer;
                    }
                    &.btn-list {
                        grid-area: list;
                    }
                    &.btn-accept {
                        grid-area: accept;
                    }

                    &:hover {
                        background: linear-gradient(92.14deg, #1BABFE 2.23%, #FFFFFF 100%);
                    }
                }
            }

            .attributes-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-column-gap: 15px;

                article {
                    padding: 20px 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    background: #fff;
                    font-size: 20px;
                    text-align: center;
                    border-radius: 10px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

                    &.owned-by {
                        a {
                            margin: 15px auto 0;
                        }
                    }
                    
                    &.trait-wrapper {
                        margin-top: 16px;

                        font-size: 18px;

                        &>p {
                            &.trait-title {
                                font-size: 20px;
                            }

                            &.trait-percentage {
                                margin-top: 8px;

                                span {
                                    color: rgba(0, 0, 0, .7);

                                    &.percentage {
                                        margin-left: 8px;
                                    }
                                }
                            }

                            &:last-child:not(.attr-count) {
                                text-shadow: 
                                    -1px 1px 0 #000,
                                    1px 1px 0 #000,
                                    1px -1px 0 #000,
                                    -1px -1px 0 #000;

                                opacity: 0.7;
                                letter-spacing: 2px;

                                &.common {
                                    color: #000;
                                }
                                &.rare {
                                    color: #3D80F6;
                                }
                                &.epic {
                                    color: #9C1FFF;
                                }
                                &.mythic {
                                    color: #FFD384;
                                }
                                margin-top: 8px;
                            }
                        }

                    }

                    &:nth-of-type(2) {
                        margin-top: 0;
                    }
                }
            }

            .logs {
                margin-top: 16px;

                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

                button {
                    padding: 13px 15px;
                    width: 100%;
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    grid-template-areas:
                        '. title chevron';
                    align-items: center;

                    background: #fff;
                    font-size: 26px;
                    border-radius: 5px;
                    
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

                .logs-table {
                    height: 0;
                    overflow: hidden;

                    border-top-left-radius: 0;
                    border-top-right-radius: 0;

                    &.active {
                        height: auto;
                    }

                    article {
                        padding-bottom: 13px;
                        overflow-y: hidden;
                        overflow-x: auto;

                        background: #fff;
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 10px;

                        table {
                            width: 100%;

                            tbody {
                                tr {
                                    border-color: black;
                                    border-spacing: 0;

                                    th,
                                    td {
                                        padding: 5px;

                                        font-size: 24px;
                                        text-align: center;
                                        vertical-align: bottom;
                                    } 

                                    td {
                                        font-weight: 300;

                                        &>* {
                                            margin: 0 auto;
                                            display: flex;
                                            justify-content: center;
                                        
                                            text-align: center;
                                        }

                                        a {
                                            white-space: nowrap;
                                        }
                                    }

                                    td:nth-of-type(2) {
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

                                    td:nth-of-type(3),
                                    td:nth-of-type(4) {
                                        a {
                                            display: block;
                                            width: 50px;

                                            overflow: hidden;
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                            direction: rtl;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
            }
        }

    }
   
   
    @media (min-width: 980px) {
        .card-content-wrapper {
            display: grid; 
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 15px;

            .content {
                margin-top: 0;
            }
        }
    }

    @media (min-width: 1300px) {
        .card-content-wrapper {
            .card-hyype-wrapper {
                .card {
                    .card-info {
                        .card-title {
                            font-size: 60px;
                        }

                        .price-wrapper {
                            margin-top: 5px;

                            p {
                                .price-value {
                                    font-size: 40px;
                                }

                                &.last-bought {
                                    min-height: 28px;

                                    .price-title {
                                        font-size: 28px;
                                    }

                                    svg {
                                        width: 27px;
                                        height: 27px;
                                    }

                                    .price-value {
                                        font-size: 28px;
                                    }
                                }
                            }

                            svg {
                                width: 41px;
                                height: 41px;
                            }
                        }
                    }
                }
            }

            .content {
                .marketplace-buttons {
                    button {
                        font-size: 35px;
                    }
                }

                .attributes-wrapper {
                    article {
                        font-size: 30px;

                        &.trait-wrapper {
                            font-size: 20px;

                            &>p {
                                &.trait-title {
                                    font-size: 30px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export default GodStyles;