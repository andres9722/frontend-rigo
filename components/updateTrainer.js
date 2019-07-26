import React, { Component } from "react";
import Router from "next/router";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";

const SINGLE_TRAINER_QUERY = gql`
  query SINGLE_Trainer_QUERY($where: TrainerWhereUniqueInput!) {
    trainer(where: $where) {
      id
      name
      email
    }
  }
`;

const UPDATE_TRAINER_MUTATION = gql`
  mutation UPDATE_TRAINER_MUTATION(
    $data: TrainerUpdateInput!
    $where: TrainerWhereUniqueInput!
  ) {
    updateTrainer(data: $data, where: $where) {
      id
    }
  }
`;

class UpdateTrainer extends Component {
  state = {};

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = updateTrainer => async e => {
    e.preventDefault();
    const { data } = await updateTrainer();

    Router.push({ pathname: "/trainer", query: { id: data.updateTrainer.id } });
  };

  render() {
    const { id } = this.props;

    return (
      <Query query={SINGLE_TRAINER_QUERY} variables={{ where: { id } }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <Mutation
              mutation={UPDATE_TRAINER_MUTATION}
              variables={{ data: { ...this.state }, where: { id } }}
            >
              {(updateTrainer, { loading, error }) => (
                <Form onSubmit={this.handleSubmit(updateTrainer)}>
                  <Error error={error} />
                  <label htmlFor="title">
                    Nombre:
                    <input
                      id="name"
                      name="name"
                      onChange={this.handleChange}
                      placeholder="Nombre"
                      required
                      type="text"
                      defaultValue={data.trainer.name}
                    />
                  </label>
                  <label htmlFor="email">
                    Email:
                    <input
                      id="email"
                      name="email"
                      onChange={this.handleChange}
                      placeholder="Email"
                      required
                      type="email"
                      defaultValue={data.trainer.email}
                    />
                  </label>
                  <button type="submit">
                    Guarda{loading ? "ndo" : "r"} cambios
                  </button>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateTrainer;
