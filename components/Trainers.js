import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Styled from "styled-components";
import Trainer from "./Trainer";
import PaginationTrainer from "./PaginationTrainer";
import { perPage } from "../config";

const ALL_TRAINERS_QUERY = gql`
  query ALL_TRAINERS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    trainers(skip: $skip, first: $first) {
      id
      name
      email
    }
  }
`;

const Center = Styled.div`
  text-align: center;
`;

const ItemsGrid = Styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Trainers = ({ page }) => (
  <Center>
    <PaginationTrainer page={page} />
    <Query
      fetchPolicy="network-only"
      query={ALL_TRAINERS_QUERY}
      variables={{ skip: page * perPage - perPage }}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading..</p>;
        if (error) return <p>Error: {error}</p>;

        return (
          <ItemsGrid>
            {data.trainers.map(trainer => (
              <Trainer trainer={trainer} key={trainer.id} />
            ))}
          </ItemsGrid>
        );
      }}
    </Query>
    <PaginationTrainer page={page} />
  </Center>
);

export default Trainers;
export { ALL_TRAINERS_QUERY };
