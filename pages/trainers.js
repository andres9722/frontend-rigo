import Trainers from "../components/Trainers";
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

const TrainersPage = ({ query }) => {
  return (
    <div>
      <ContainerLink>
        <Link>
          <LinkStyled href="/create-trainer">Crear entrenador</LinkStyled>
        </Link>
      </ContainerLink>
      <Trainers page={+query.page || 1} />
    </div>
  );
};

export default TrainersPage;
