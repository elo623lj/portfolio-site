import styled from 'styled-components';

export const CanvasContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

export const Title = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 17%;
    left: 5%;
    font-size: 20px;

    h1 {
        font-family: Breadley, serif;
        font-weight: bold;
        font-size: 3.2em;
        line-height: 0.95em;
        letter-spacing: 0.04em;
    }

    h2 {
        font-family: Times, Times New Roman, serif;
        font-size: 1em;
        font-weight: 300;
        letter-spacing: 0.04em;
    }
`;

export const Nav = styled.nav`
    position: absolute;
    top: 3%;
    right: 3%;
`

export const NavButton = styled.div`
    display: inline-block;
    font-family: CocoSharp, sans-serif;
    font-weight: 100;
    font-size: 16px;
    margin: 0 15px;
    letter-spacing: 0.17em;
`



