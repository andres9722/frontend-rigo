import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state = {
    email: "",
    name: "",
    password: ""
  };

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  onSubmitForm = signup => async e => {
    e.preventDefault();
    await signup(this.state);

    this.setState({ email: "", name: "", password: "" });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form onSubmit={this.onSubmitForm(signup)}>
            <h2>Registrarse!</h2>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </label>
            <label htmlFor="name">
              Nombre:
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
            </label>
            <label htmlFor="password">
              Contraseña:
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
            </label>
            <button type="submit">
              {loading ? "Cargando..." : "Registrarse"}{" "}
            </button>
            {error && <Error error={error} />}
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
