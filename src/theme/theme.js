import { createGlobalStyle } from 'styled-components';

export const theme = {
  color: {
    accent: '#3897F0',
    action: '#ED4956',
    gray: '#e0e0e0',
    darkGray: '#A3A3A3',
    black: '#262627',
    white: '#FFFFFF',
  },
  fontSize: {
    s: '1.2rem',
    m: '1.4rem',
    l: '1.6rem',
  },
  fontWeight: {
    thin: '300',
    regular: '400',
    medium: '500',
    bold: '700',
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
  },
};

export const GlobalStyles = createGlobalStyle`
    *,*::after,::before{
      box-sizing:border-box;
    }
    
    html {
    /* 1rem = 10px */
    font-size: 62.5%;
    }
    
    body {
      font-family: 'Roboto', sans-serif;
      font-size: 1.6rem;
      margin:0;
    }
`;
