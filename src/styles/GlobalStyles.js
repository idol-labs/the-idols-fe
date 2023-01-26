import { createGlobalStyle } from 'styled-components';

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

const GlobalStyles = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
        table {
        border-collapse: collapse;
        border-spacing: 0;
    }


    /* Box Sizing */
    * {
        box-sizing: border-box;
    }

    /* iOS Fix */
    html {
        height: -webkit-fill-available;
    }
    body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
    }
  
    /* Font */
    html,
    button,
    a,
    input,
    select {
        color: #000;
        font-family: 'Josefin Sans', "Helvetica Neue", Arial, Helvetica, sans-serif;
    }

    /* Link Styling */
    a {
        display: block;
        
        color: #3D80F6;
        text-decoration: none;

        &:hover {
            color: #1BABFE;
        }
    }

    /* Button Default Styling Remove */
    button {
        border: none;
        cursor: pointer;

        &:focus {
            outline: none;
        }
    }

    body {
        margin: 0 auto;

        background: #000;

        &.app {
            background: url('/images/wallpaper_black.jpg');
            background-size: contain;
        }
        
        #root { 
            #app-wrapper {
                display: block;
            }
        }
    }

    @media (min-width: 768px) {
        body {
            &.app {
                background-size: 50%;
            }
        }
    }

    @media (min-width: 980px) {
        body {
            #root {
                #app-wrapper {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    grid-template-areas:
                        'nav header'
                        'nav main';

                    &.is-home {
                        display: block;
                    }

                    main {
                        grid-area: main;
                    }
                }
            }
        }
    }
`;

export default GlobalStyles;