import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;
// 화면 채우는 스타일
