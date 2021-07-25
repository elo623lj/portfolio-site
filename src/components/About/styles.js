import styled from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Container = styled.div`
    width: 400px;
    height: 400px;
    margin: 0 auto;
    position: relative;
    font-family: CocoSharp;
    font-weight: 100;
    // font-style: italic;

    &::before {
        content: '';
        float: right;
        height: 100%;
        width: 50%;
        shape-outside: polygon(
            100% 0,
            0% 1%,
            80% 22%,
            100% 65%,
            46% 99%,
            100% 100%
        );
        shape-margin: 3%;
    }

    svg {
        position: absolute;
        top: 0;
        left: 0;
    }

    div {
        &:nth-child(1) {
            float: left;
            height: 100%;
            width: 50%;
            shape-outside: polygon(
                0 0,
                100% 1%,
                20% 22%,
                0% 65%,
                54% 99%,
                0 100%
            );
            shape-margin: 3%;
        }
    }

    p {
        position: relative;
        height: 100%;
        width: 100%;
        padding-top: 30%;
    }

`;

    





