import Sports from "../components/Sports";
import Link from "next/link";
import styled from "styled-components";

const LinkStyled = styled.a`
  display: block;
  width: "100%";
  margin: 0 auto;
  color: green;
  padding: 1em 3em;
`;

const ContainerLink = styled.div`
  width: "100%";
  display: flex;
  justify-content: center;
`;

const SportsPage = ({ query }) => {
  return (
    <div>
      <ContainerLink>
        <LinkStyled href="/create-sport">Crear deporte</LinkStyled>
      </ContainerLink>
      <Sports page={+query.page || 1} />
    </div>
  );
};

export default SportsPage;
