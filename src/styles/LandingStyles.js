import styled from 'styled-components';

const LandingStyles = styled.section`
    .landing-wrapper {
        .landing-header {
            width: 100%;
            display: grid;
            align-items: center;
            grid-template-columns: 1fr auto 1fr;
            grid-template-rows: 56px;
            grid-template-areas:
                'logo app expand'
                'links links links';

            background: #000;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            .logo {
                grid-area: logo;
                width: 43px;
                height: 43px;
                margin-left: 10px;
            }

            .enter-app {
                grid-area: app;
                width: 111px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;

                background: #4CB4D3;
                color: #FFF;
                border-radius: 5px;
                
                span {
                    position: relative;
                    top: 2px;

                    font-size: 16px;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                &:hover {
                    background: #1BABFE;
                }
            }

            .expand {
                grid-area: expand;
                justify-self: end;
                margin-top: 4px;
                margin-right: 5px;

                background: transparent;

                svg {
                    width: 34px;
                    height: 30px;
                }
            }

            .socials {
                margin: 0 10px;
                grid-area: links;
                display: none;
                justify-content: space-between;

                a {
                    width: 43px;
                    height: 43px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background: #fff;
                    border-radius: 50%;

                    svg {
                        width: 25px;

                        fill: #4CB3D3;
                    }

                    picture {
                        img {
                            width: 39px;
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

            &.active {
                grid-template-rows: 56px 63px;

                .expand {
                    svg {
                        transform: rotate(180deg);
                    }
                }

                .socials {
                    display: flex;
                }
            }
        }

        picture {
            &.landing-hero {
                display: block;
                min-height: 110vw;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

        .marquee-icon-wrapper {
            position: relative;

            .logo {
                display: none;
                position: absolute;
                top: 50%;
                left: 8.33vw;
                transform: translateY(-50%);
                z-index: 1;

                img {
                    display: block;
                    max-width: 380px;
                    max-height: 380px;
                }
            }

            .marquee { 
                height: 38px;
                overflow: hidden;
                
                background: #000000;
                border-top: 3px solid #6273B0;
                border-bottom: 3px solid #4CB3D3;

                .marquee-content {
                    width: fit-content;
                    height: 100%;
                    display: flex;
                    align-items: center;

                    animation: marquee-animate 20s linear infinite;

                    li {
                        position: relative;
                        top: 2px;
                        padding: 0 5px;
                        
                        font-size: 16px;
                        font-weight: 700;
                        color: #F8CD7F;
                        white-space: nowrap;

                        svg {
                            width: 10px;
                        }
                    }
                }
            }
        }

        .wallpaper-description-wrapper {
            background: url('/images/wallpaper_black.jpg');
            background-size: contain;

            &>p {
                padding: 40px 40px 0;

                color: #fff;
                font-size: 16px;
                font-weight: 700;
                line-height: 1.5;
                text-align: center;
            }

            .samples {
                margin: 47px auto 0;
                padding: 0 32px;
                display: flex;
                flex-direction: column;
                align-items: center;

                picture {
                    width: 100%;
                    max-width: 267px;
                    display: block;

                    &:not(:first-child) {
                        margin-top: 25px;
                    }

                    img {   
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;

                        border-radius: 20px;
                    }
                } 

                .neptune {
                    picture {
                        margin-top: 25px;
                    }

                    video {
                        display: none;
                        margin-top: 25px;
                        width: 100%;
                        max-width: 267px;
                        border-radius: 20px;
                    }

                    &:hover {
                        picture {
                            display: none;
                        }

                        video {
                            display: block;
                        }
                    }
                }
                
            }

            .token-wrapper {
                margin-top: 71px;
                padding: 0 50px;
                display: flex;
                flex-direction: column;

                text-align: center;

                .token-title {
                    white-space: nowrap;
                    color: #fff;
                    font-size: 24px;
                    font-weight: 700;
                }

                .logo {
                    margin: 30px auto 0;

                    img {
                        display: block;
                        width:  177px;
                        height: 177px;
                        max-width: 407px;
                        max-height: 407px;
                    }
                }

                .token-description {
                    margin: 30px 20px 0;

                    color: #fff;
                    font-size: 16px;
                }
            }

            .landing-bottom {
                margin-top: 50px;
                position: relative;

                &>picture {
                    display: block;

                    img {
                        display: block;
                        width: 100%;
                        object-fit: contain;
                    }
                }

                .cycle-mobile {
                    position: absolute;
                    top: 37.03125vw;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 95%;
                    margin: 0 auto;

                    p {
                        color: #FFF;
                        font-size: 5.33vw;
                        line-height: 20px;
                        font-weight: 700;
                        text-align: center;
                    }

                    .swiper {
                        picture {
                            display: block;

                            text-align: center;

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }
                    }

                    section {
                        text-align: center;

                        button {
                            padding: 0;

                            background: transparent;

                            &:nth-of-type(1) {
                                margin-right: 10px;
                            }

                            svg {
                                width: 6.4vw;
                                height: 6.4vw;
                            }
                        }
                    }
                }

                .cycle-desktop {
                    display: none;
                }

                .seen-on-wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 100%;
                    height: 100.8958333vw;
                    position: absolute;
                    top: 150vw;

                    .blur {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        filter: blur(30px);

                        background: #fff;
                    }

                    p {
                        margin: 0 auto;
                        z-index: 1;

                        color: #9e9e9e;
                        font-size: 4.3vw;
                        letter-spacing: -0.07em;
                        text-align: center;
                        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                        text-transform: uppercase;
                    }

                    .seen-on-list {
                        margin: 0 auto;
                        width: 72vw;
                        display: grid;
                        justify-content: center;
                        grid-template-columns: repeat(2, 1fr);
                        grid-column-gap: 3.7vw;
                        grid-row-gap: 15px;
                        z-index: 1;

                        picture {
                            display: block;

                            img {
                                display: block;
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (min-width: 768px) {
        .landing-wrapper {
            .landing-header {
                min-height: 90px;
                padding: 0 32px;
                display: flex;
                flex-direction: row-reverse;
                justify-content: flex-start;

                .logo,
                .expand {
                    display: none;
                }

                .enter-app {
                    width: 142px;
                    height: 44px;

                    span {
                        font-size: 20px;
                    }
                }

                .socials {
                    display: flex;

                    a {
                        margin-right: 12px;
                        width: 43px;
                        height: 43px;

                        &:nth-of-type(5) {
                            margin-right: 12px;
                        }

                        svg {
                            width: 22px;
                        }

                        picture {
                            img {
                                width: 30px;
                            }
                        }
                    }
                }
            }

            picture {
                &.landing-hero {
                    min-height: 45vw;
                }
            }

            .marquee-icon-wrapper {
                .logo {
                    display: block;
                    left: 3vw;

                    img {
                        width:  23vw;
                        height: 23vw;
                    }
                }

                .marquee { 
                    height: 105px;

                    border-top: 8px solid #6273B0;
                    border-bottom: 8px solid #4CB3D3;

                    .marquee-content {
                        animation: marquee-animate 20s linear infinite;

                        li {
                            top: 2px;
                            padding: 0 10px;
                            
                            font-size: 48px;

                            svg {
                                width: 30px;
                            }
                        }
                    }
                }
            }

            .wallpaper-description-wrapper {
                background-size: 50%;

                &>p {
                    padding: 13.0208333333vw 100px 0;

                    font-size: 36px;
                }

                .samples {
                    display: grid;
                    grid-column-gap: 44px;
                    grid-template-columns: repeat(3, 1fr);
                    justify-items: center;

                    picture {
                        max-width: 509px;
                        margin-top: 27px;
                    }

                    .neptune {  
                        picture {
                            margin-top: 0;
                            margin-bottom: 27px;
                        }

                        video {
                            max-width: 509px;
                            margin-top: 0;
                            margin-bottom: 27px;
                        }
                    }
                }

                .token-wrapper {
                    margin: 146px 10vw 0;
                    padding: 0;
                    
                    display: grid;
                    justify-items: end;
                    grid-template-columns: 1fr auto;
                    grid-row-gap: 30px;
                    grid-template-areas:
                        'title logo'
                        'description logo';

                    .token-title {
                        grid-area: title;
                        align-self: end;
                        
                        font-size: 44px;
                        text-align: left;
                    }

                    .token-description {
                        max-width: 360px;
                        grid-area: description;
                        margin: 0;

                        font-size: 30px;
                        text-align: right;
                    }
                    
                    .logo {
                        grid-area: logo;
                        align-self: center;
                        margin-top: 0;
                        margin-left: 40px;
                    }
                }

                .landing-bottom {
                    margin-top: 69px;

                    &>picture {
                        &.wallpaper-bottom {
                            display: none;
                        }
                    }

                    .cycle-mobile {
                        display: none;
                    }

                    .cycle-desktop {
                        display: block;
                        width: 58.4375vw;
                        position: absolute;
                        top: 37.03125vw;
                        left: 24vw;
                    }

                    .seen-on-wrapper {  
                        height: 39.8958333vw;
                        top: 110vw;

                        p {
                            font-size: 2.5vw;
                        }

                        .seen-on-list {
                            margin-top: 10px;
                            max-width: 69vw;
                            grid-template-columns: repeat(4, 1fr);
                        }
                    }
                }
            }
        }
    }

    @media (min-width: 1024px) {
        .landing-wrapper {
            .wallpaper-description-wrapper {
                .samples {
                    padding: 0 8vw;
                }

                .token-wrapper {
                    max-width: 885px;

                    .logo {
                        margin-left: 3.59375vw;

                        img {
                            width: 26vw;
                            height: 26vw;
                        }
                    }
                }

                .landing-bottom {
                    margin-top: 30px;
                }
            }
        }
    }

    @media (min-width: 1100px) {
        .landing-wrapper {
            .wallpaper-description-wrapper {
                .token-wrapper {
                    margin-left: auto;
                }
            }
        }
    }

    @media (min-width: 1440px) {
        .landing-wrapper {
            .wallpaper-description-wrapper {
                .token-wrapper {
                    margin-right: 10.68vw;

                    .token-description {
                        width: 410px;
                    }
                }
            }
        }
    }

    @media (min-width: 1600px) {
        .landing-wrapper {
            .wallpaper-description-wrapper {
                .landing-bottom {
                    margin-top: -100px;
                }
            }
        }
    }

    @media (min-width: 1920px) {
        max-width: 1920px;
        margin: 0 auto;

        .landing-wrapper {
            picture {
                &.landing-hero {
                    min-height: 965px;
                }
            }
            
            .marquee-icon-wrapper {
                .logo {
                    left: 8.33vw;

                    img {
                        width:  26vw;
                        height: 26vw;
                    }
                }
            }

            .wallpaper-description-wrapper {
                .landing-bottom {
                    .cycle-desktop {
                        width: 1122px;
                        top: 711px;
                        left: 460px;
                    }

                    .seen-on-wrapper {
                        height: 766px;
                        top: 2112px;

                        p {
                            font-size: 48px;
                        }

                        .seen-on-list {
                            max-width: 1400px;
                        }
                    }
                }
            }
        }
    }

    @keyframes marquee-animate {
        0% {
          transform: translateX(0%)
        }
        100% {
          transform: translateX(-50%);
        }
    }
`

export default LandingStyles;