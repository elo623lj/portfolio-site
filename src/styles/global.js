import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* Default */

  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  body {
    position: fixed;
    overflow: hidden;
    overscroll-behavior-y: none;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, textarea {
    // font-family: 'Biko', sans-serif !important;
  }
  
  a, button {
    outline: none;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
  }

  .button {
    position: relative;
    display: flex;
    justify-content: center;
    font-family: CocoSharp, sans-serif;
    font-weight: 100;
    margin: 0 0px;
    text-decoration: none;
    width: 7em;
    height: 1.4em;
    text-align: center;
    color: black!important;
    overflow: hidden;

    .is-dark & {
        color: #898989 !important;
    }

    .is-transitioning & {
        overflow: hidden;
    }

    span {
      letter-spacing: 0.2em;
      transition: all 0.5s ease-in-out;
      position: relative;
  
      .is-route-changing &:not(nav *), .is-transitioning &, .not-ready & {
        transform: translateY(100%);
      }
  
      ::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 1px;
          background-color: black;
          transition: all 0.5s ease-in-out;
  
          .is-dark & {
              background-color: #999999;
          }
      }
  
      &:hover {
          letter-spacing: 0.4em;
          ::after {
              width: 90%;
          }
      }
    }

  }

  .reveal-text {
    transition: all 0.8s ease-in-out;
    mask-image: linear-gradient(to right, black 0%, black 33.33%, transparent 66.66%);
    mask-size: 300% 200%;
    mask-position: 100% 0%;
    transform: translateX(-50%);

    &.revealed:not(.is-route-changing *) {
      mask-position: 0% 0%;
      transform: translateX(0);
    }
  }

  .canvas-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    canvas {
      transition: opacity 0.5s ease-in-out;
      .not-ready &, .is-route-changing &:not(.home *), .is-three-loading & {
        opacity: 0;
      }
    }
  }

`;

export default GlobalStyle
