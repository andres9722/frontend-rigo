import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const CREATE_SPORT_MUTATION = gql`
  mutation CREATE_SPORT_MUTATION($data: SportCreateInput!) {
    createSport(data: $data) {
      id
      name
      capacity
    }
  }
`;

class CreateSport extends Component {
  state = {
    name: "",
    capacity: ""
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = createSport => async e => {
    e.preventDefault();
    const { data } = await createSport();
    Router.push({ pathname: "/sport", query: { id: data.createSport.id } });
  };

  render() {
    const { name, capacity } = this.state;

    return (
      <Mutation
        mutation={CREATE_SPORT_MUTATION}
        variables={{ data: this.state }}
      >
        {(createSport, { loading, error }) => (
          <Form onSubmit={this.handleSubmit(createSport)}>
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
            <label htmlFor="Capacidad">
              Capacidad:
              <input
                id="capacity"
                name="capacity"
                onChange={this.handleChange}
                placeholder="Capacidad"
                required
                type="number"
                value={capacity}
              />
            </label>

            <button type="submit">Crear</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateSport;
