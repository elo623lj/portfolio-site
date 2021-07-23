import styled from 'styled-components';

export const DarkButtonWrapper = styled.div`
    position: absolute;
    bottom: 8%;
    left: 4%;
    opacity: 0.2;
    transition: opacity 0.6s ease-in-out;
    cursor: pointer;
    padding: 8px;

    &:hover {
        opacity: 1;
    }

    svg {
        width: 30px;
        height: 30px;
    }
`


