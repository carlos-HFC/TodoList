import { createGlobalStyle } from "styled-components";

import { FONTS } from "./themes/variables";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${FONTS.primary};
  }

  canvas {
    display: none;
  }

  body {
    background: ${props => props.theme.background};
    transition: background-color .3s;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
  }
`;