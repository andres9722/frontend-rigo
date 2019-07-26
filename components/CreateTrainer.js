import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const CREATE_TRAINER_MUTATION = gql`
  mutation CREATE_TRAINER_MUTATION($data: TrainerCreateInput!) {
    createTrainer(data: $data) {
      id
      email
      name
    }
  }
`;

class CreateTrainer extends Component {
  state = {
    name: "",
    email: ""
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = createTrainer => async e => {
    e.preventDefault();
    const { data } = await createTrainer();
    Router.push({ pathname: "/trainer", query: { id: data.createTrainer.id } });
  };

  render() {
    const { name, email } = this.state;

    return (
      <Mutation
        mutation={CREATE_TRAINER_MUTATION}
        variables={{ data: this.state }}
      >
        {(createTrainer, { loading, error }) => (
          <Form onSubmit={this.handleSubmit(createTrainer)}>
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
                value={name}
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
                value={email}
              />
            </label>
            <button type="submit">Crear</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateTrainer;
