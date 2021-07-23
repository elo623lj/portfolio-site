import styled from 'styled-components';

export const CanvasContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

export const Info = styled.div`
    position: absolute;
    top: 17%;
    left: 5%;
    font-size: 20px;

    // div:first-child {
    //     width: 100%;
    //     height: 1px;
    //     background-color: black;
    // }

    // div:last-child {
    //     width: 100%;
    //     height: 2px;
    //     background-color: black;
    //     margin-top: 1em;
    // }
`;

export const InfoTitle = styled.p`
    font-family: Breadley, serif;
    font-weight: bold;
    font-size: 3.2em;
    line-height: 0.95em;
    letter-spacing: 0.04em;
`

export const InfoType = styled.p`
    font-family: Breadley, serif;
    font-weight: bold;
    font-size: 1em;
    font-weight: 300;
    font-style: italic;
    letter-spacing: 0.04em;
`

export const InfoContent = styled.p`
    font-family: Breadley, serif;
    font-weight: bold;
    font-size: 1em;
    font-weight: 300;
    letter-spacing: 0.04em;
    margin-top: 1em;
`
