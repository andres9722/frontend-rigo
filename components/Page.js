import React, { Component } from "react";
import Header from "./Header";
import Meta from "./Meta";
import Styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  green: "#1f4f46",
  black: "#393939",
  grey: "#3A3A3A",
  lightGrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 4px 0 rgba(0, 0, 0, 0.09)"
};

const StyledPage = Styled.div`
  color: ${props => props.theme.black};
`;

const Inner = Styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }

  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

class Page extends Component {
  render() {
    const { children } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{children}</Inner>
          <GlobalStyle />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
