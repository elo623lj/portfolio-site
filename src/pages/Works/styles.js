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
    top: 15%;
    left: 5%;
    font-size: 20px;
    height: 220px;
    width: 400px;
    overflow: hidden;
    padding-left: 1%;
    mask-image: linear-gradient(to left, black 99%, transparent 100%);

    p {
        display: inline-block;
    }
`;

export const InfoTitle = styled.p`
    font-family: Breadley, serif;
    font-weight: bold;
    font-size: 3.2em;
    letter-spacing: 0.04em;
`

export const InfoType = styled.p`
    font-family: Breadley, serif;
    font-weight: bold;
    font-size: 1em;
    letter-spacing: 0.04em;
    transition-delay: 0.2s;
`

export const InfoContent = styled.p`
    font-family: Breadley, serif;
    font-size: 1em;
    letter-spacing: 0.04em;
    margin-top: 1em;
    transition-delay: 0.35s;
`

export const BottomRow = styled.div`
    display: flex;
    font-family: CocoSharp, sans-serif;
    font-weight: 100;
    font-style: italic;
    font-size: 0.7em;
    bottom: 0;
    position: absolute;
    width: 80%;
    transform: translateX(-1.1em);

    div:last-child {
        margin-left: 3em;
    }
`   
    





