import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Styled from "styled-components";
import Nav from "./Nav";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = Styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;

  a {
    background: ${props => props.theme.green};
    color: white;
    padding: .5rem 1rem;
    text-decoration: none;
    text-transform: uppercase;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = Styled.header`
  .bar {
    align-items: stretch;
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Sports app!</a>
          </Link>
        </Logo>
        <Nav />
      </div>
    </StyledHeader>
  );
};

export default Header;
