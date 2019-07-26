import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Styled from "styled-components";
import Sport from "./Sport";
import PaginationSport from "./PaginationSport";
import { perPage } from "../config";

const ALL_SPORTS_QUERY = gql`
  query ALL_SPORTS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    sports(skip: $skip, first: $first) {
      id
      name
      capacity
    }
  }
`;

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    sportsConnection {
      aggregate {
        count
      }
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

const Sports = ({ page }) => (
  <Center>
    <PaginationSport page={page} />
    <Query
      // fetchPolicy="network-only"
      query={ALL_SPORTS_QUERY}
      variables={{ skip: page * perPage - perPage }}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Cargando...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
          <ItemsGrid>
            {data.sports.map(sport => (
              <Sport sport={sport} key={sport.id} />
            ))}
          </ItemsGrid>
        );
      }}
    </Query>
    <PaginationSport page={page} />
  </Center>
);

export default Sports;
export { ALL_SPORTS_QUERY };
