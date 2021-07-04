import styled from 'styled-components';

export const CardsWrapper = styled.div`
    position: absolute;
    top: 30%;
    right: 10%;
    // transform: translateX(-50%) translateY(-50%);
    cursor: pointer;
`;

export const CardContainer = styled.div`
    position: absolute;
`;

export const CardInner = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    // border: 3px solid black;
    transform-origin: 100% 0;
    // border-radius: 10px;
    overflow: hidden;
    // box-shadow: 10px 15px 30px -10px rgba(50, 50, 50, 0.2);
`;

export const CardOverlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: grayscale(100%);
`;

