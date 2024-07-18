// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Wittgenstein", serif;
    background-color: #202020;
  }

  a {
    text-decoration: none;
    font-size: 20px;
    color: #ffee32;
    font-style: italic;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    max-width: 400px;
    min-height: 100px;
    margin: 0 auto;
    padding: 20px;
    gap: 10px;
  }

  input {
     background-color: transparent;
     border: none;
     width: 300px;
     padding: 10px;
  }

  button {
    background-color: #333533;
    color: #F3D9DC;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 1em;
    width: 100px;
    cursor: pointer;
  }

  h1 {
    font-size: 2.5em;
    text-align: center;
    color: #ffd100;
    @media (max-width: ${breakpoints.tablet}) {
    font-size: 2em;
    }
  }

  h2, h3 {
    text-align: center;
    color: #D7BEA8;
  }

  li {
    list-style: none;
  }

  p, ul {
    color: #F3D9DC;
  }
`;

export default GlobalStyle;
