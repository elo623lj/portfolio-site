import styled from 'styled-components';

export const NavBarContainer = styled.nav`
    position: absolute;
    top: 3%;
    right: 3%;

    a {
        position: relative;
        display: inline-block;
        font-family: CocoSharp, sans-serif;
        font-weight: 100;
        font-size: 16px;
        color: black !important;
        margin: 0 15px;
        text-decoration: none;
        width: 4.2em;
        height: 1.3em;
        text-align: center;
    }

    span {
        letter-spacing: 0.2em;
        transition: all 0.5s ease-in-out;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        ::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 0%;
            height: 1px;
            background-color: black;
            transition: all 0.5s ease-in-out;
        }

        &:hover {
            letter-spacing: 0.4em;
            ::after {
                width: 90%;
            }
        }

    }
`


