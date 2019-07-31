import React, { Component } from "react";
import Router from "next/router";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";
import { ALL_TRAINERS_QUERY } from "./CreateSport";

const SINGLE_SPORT_QUERY = gql`
  query SINGLE_SPORT_QUERY($where: SportWhereUniqueInput!) {
    sport(where: $where) {
      id
      name
      capacity
      type

      trainer {
        id
        name
      }
    }
  }
`;

const UPDATE_SPORT_MUTATION = gql`
  mutation UPDATE_SPORT_MUTATION(
    $name: String!
    $capacity: Int!
    $type: String!
    $trainerId: ID!
    $where: SportWhereUniqueInput!
  ) {
    updateSport(
      name: $name
      capacity: $capacity
      type: $type
      trainerId: $trainerId
      where: $where
    ) {
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

  updateType = v => {
    this.setState({
      type: v.sport.type,
      capacity: v.sport.capacity,
      name: v.sport.name,
      trainerId: v.sport.trainer.id
    });
  };

  render() {
    const { id } = this.props;

    return (
      <Query
        query={SINGLE_SPORT_QUERY}
        variables={{ where: { id } }}
        onCompleted={this.updateType}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <Mutation
              mutation={UPDATE_SPORT_MUTATION}
              variables={{ ...this.state, where: { id } }}
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

                  <label htmlFor="title">
                    Tipo:
                    <select
                      onChange={this.handleChange}
                      defaultValue={data.sport.type}
                      name="type"
                      id="type"
                      required
                    >
                      <option value="INDIVIDUAL">INDIVIDUAL</option>
                      <option value="GRUPAL">GRUPAL</option>
                    </select>
                  </label>

                  <Query query={ALL_TRAINERS_QUERY}>
                    {({ data, loading, error }) => {
                      if (error) return <Error error={error} />;

                      if (loading) return <p>Cargando entrenadores</p>;
                      return (
                        <label htmlFor="trainerId">
                          Profesor asignado:
                          <select
                            onChange={this.handleChange}
                            defaultValue={this.state.trainerId}
                            name="trainerId"
                            id="trainerId"
                            required
                          >
                            {data.trainers.map(trainer => (
                              <option value={trainer.id}>{trainer.name}</option>
                            ))}
                          </select>
                        </label>
                      );
                    }}
                  </Query>

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
