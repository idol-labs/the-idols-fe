import styled from 'styled-components';

const NavStyles = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    width: 300px;
    height: 100vh;
    transform: translateX(-110%);

    /* background: #DCEFF4; */
    background: url('/images/wallpaper_nav.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
    overflow-y: auto;
    z-index: 2;
    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    box-shadow: 0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12);

    &.active {
        transform: translateX(0);
    }

    .socials {
        margin: 11px 0 18px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
        a {
            margin: 0 6px 0 0;
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;

            background: #fff;
            border-radius: 50%;

            &:last-of-type {
                margin-right: 0;
            }

            svg {
                width: 22px;

                fill: #4CB3D3;
            }

            picture {
                img {
                    width: 30px;
                }
            }

            &:hover {
                svg {
                    fill: #997026;
                }
            }

            &.rarity {
                svg {
                    width: 36px;
                }

                &:hover {
                    svg {
                        path {
                            fill: #997026;
                        }
                        circle {
                            &:nth-of-type(3) {
                                fill: #997026;
                            }
                        }
                    }
                }
            }
        }
        
    }

    &>section:not(.socials) {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 11px 100px;

        /* .logo {
            margin-top: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            width:  159px;
            height: 159px;

            background: #43B4D4;
            border-radius: 50%;

            img {
                width: 108px;
                height: 132px;
            }
        } */

        .nav-hero {            
            picture {
                display: block;

                img {
                    width: 100%;
                }
            }
        }

        /* p {
            width: 100%;
            margin-top: 21px;

            color: #000;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
        } */

        nav,
        section {
            min-width: 236px;

            &.nav-main {
                margin-top: 43px;

                a {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 236px;
                    height: 56px;
                    margin-top: 16px;
                    padding-left: 30px;

                    border-radius: 5px;
                    background: #fff;
                    color: #4D5154;
                    font-family: 'Poppins', sans-serif;
                    font-size: 16px;
                    font-weight: 600;

                    span {
                        text-transform: uppercase;
                    }

                    &.active-link,
                    &:hover {
                        background: #43B4D4;
                        color: white;
                        box-shadow: 0px 3px 20px #43B4D4;
                    }
                    &:first-child {
                        margin-top: 0;
                    }
                }
            }
        
        }
    }

    @media (min-width: 980px) {
        grid-area: nav;

        transform: translateX(0);
        box-shadow: none;
    }
`

export default NavStyles;