import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    email: "",
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

    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form onSubmit={this.onSubmitForm(signup)}>
            <h2>Iniciar sesión!</h2>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
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
              />
            </label>
            <button type="submit">{loading ? "Cargando..." : "Entrar"}</button>
            {error && <Error error={error} />}
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
