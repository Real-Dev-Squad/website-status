import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 :root {
   --textColor: ${({ theme }) => theme.textColor};
   --titleColor: ${({ theme }) => theme.titleColor};
 }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.5s ease-in;
  } `;

export default GlobalStyles;
