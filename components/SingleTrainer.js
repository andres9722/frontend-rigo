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

const SINGLE_TRAINER_QUERY = gql`
  query SINGLE_TRAINER_QUERY($where: TrainerWhereUniqueInput!) {
    trainer(where: $where) {
      id
      name
      email
    }
  }
`;

const SingleTrainer = ({ id }) => (
  <Query query={SINGLE_TRAINER_QUERY} variables={{ where: { id } }}>
    {({ data, loading, error }) => {
      if (error) return <Error error={error} />;
      if (loading) return <p>Loading...</p>;
      if (!data.trainer) return <p>No Trainer found for {id}</p>;

      let trainer = data.trainer;
      return (
        <SingleItemStyles>
          <Head>
            <title>Sports app! | {trainer.name}</title>
          </Head>
          <div className="details">
            <span>Profesor: </span>
            <h3>Nombre: {trainer.name}</h3>
            <p>Email: {trainer.email}</p>
          </div>
        </SingleItemStyles>
      );
    }}
  </Query>
);

export default SingleTrainer;
