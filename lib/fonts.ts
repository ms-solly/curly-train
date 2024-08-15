"use client"
import { createGlobalStyle } from "styled-components";

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Regular.woff2') format('woff2'),
         url('/fonts/Inter-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2'),
         url('/fonts/JetBrainsMono-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;
