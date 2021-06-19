import styled from 'styled-components';

export const CardsWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    cursor: pointer;
`;

export const CardContainer = styled.div`
    position: absolute;
    transform-origin: 0 0;
`;

export const CardInner = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 10px 15px 30px -10px rgba(50, 50, 50, 0.2);
`;

