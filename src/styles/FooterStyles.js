import styled from 'styled-components';

const FooterStyles = styled.footer`
    padding: 20px 20px 40px;
        
    background: transparent;
    text-align: center;

    /* &.light {
        background: #FFFBF4;
    } */

    section {
        display: flex;
        justify-content: center;
        align-items: center;

        a {
            margin-left: 20px;
            font-size: 14px;
            text-decoration: underline;
        }
    }

    p {
        margin-top: 10px;

        color: #FFF;
        font-size: 14px;
        line-height: 1.3;
        text-align: center;
    }

    .nftrarity {
        display: none;
    }
    
`

export default FooterStyles;