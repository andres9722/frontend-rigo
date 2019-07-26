import React, { Component } from "react";
import Router from "next/router";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";

const SINGLE_SPORT_QUERY = gql`
  query SINGLE_SPORT_QUERY($where: SportWhereUniqueInput!) {
    sport(where: $where) {
      id
      name
      capacity
    }
  }
`;

const UPDATE_SPORT_MUTATION = gql`
  mutation UPDATE_SPORT_MUTATION(
    $data: SportUpdateInput!
    $where: SportWhereUniqueInput!
  ) {
    updateSport(data: $data, where: $where) {
      id
    }
  }
`;

class UpdateSport extends Component {
  state = {};

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = updateSport => async e => {
    e.preventDefault();
    const { data } = await updateSport();

    Router.push({ pathname: "/sport", query: { id: data.updateSport.id } });
  };

  render() {
    const { id } = this.props;

    return (
      <Query query={SINGLE_SPORT_QUERY} variables={{ where: { id } }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <Mutation
              mutation={UPDATE_SPORT_MUTATION}
              variables={{ data: { ...this.state }, where: { id } }}
            >
              {(updateSport, { loading, error }) => (
                <Form onSubmit={this.handleSubmit(updateSport)}>
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
                      defaultValue={data.sport.name}
                    />
                  </label>
                  <label htmlFor="email">
                    Capacidad:
                    <input
                      id="capacity"
                      name="capacity"
                      onChange={this.handleChange}
                      placeholder="Capacidad"
                      required
                      type="number"
                      defaultValue={data.sport.capacity}
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

export default UpdateSport;
