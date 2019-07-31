import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import Error from "./ErrorMessage";
import Styled from "styled-components";

const SingleItemStyles = Styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_SPORT_QUERY = gql`
  query SINGLE_SPORT_QUERY($where: SportWhereUniqueInput!) {
    sport(where: $where) {
      id
      name
      capacity
      type

      user {
        name
      }

      trainer {
        name
      }
    }
  }
`;

const SingleSport = ({ id }) => (
  <Query query={SINGLE_SPORT_QUERY} variables={{ where: { id } }}>
    {({ data, loading, error }) => {
      if (error) return <Error error={error} />;
      if (loading) return <p>Loading...</p>;
      if (!data.sport) return <p>No sport found for {id}</p>;

      let sport = data.sport;
      return (
        <SingleItemStyles>
          <Head>
            <title>Sports app! | {sport.name}</title>
          </Head>
          <div className="details">
            <span>Deport: </span>
            <h3>Nombre: {sport.name}</h3>
            <h3>Capacidad: {sport.capacity}</h3>
            <h3>Tipo: {sport.type}</h3>
            <h3>Creado por: {sport.user.name}</h3>
            <h3>Profesor asignado: {sport.trainer.name}</h3>
          </div>
        </SingleItemStyles>
      );
    }}
  </Query>
);

export default SingleSport;
