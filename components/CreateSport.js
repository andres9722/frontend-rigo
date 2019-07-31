import React, { Component } from "react";
import { pick } from "lodash";
import Router from "next/router";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const CREATE_SPORT_MUTATION = gql`
  mutation CREATE_SPORT_MUTATION(
    $name: String!
    $capacity: Int!
    $type: String!
    $trainerId: ID!
    $students: [StudentCreateInput!]!
  ) {
    createSport(
      name: $name
      capacity: $capacity
      type: $type
      trainerId: $trainerId
      students: $students
    ) {
      id
      name
      capacity
      type
    }
  }
`;

export const ALL_TRAINERS_QUERY = gql`
  query ALL_TRAINERS_QUERY {
    trainers {
      id
      name
      email
    }
  }
`;

class CreateSport extends Component {
  state = {
    name: "",
    capacity: "",
    type: "INDIVIDUAL",
    trainerId: "",
    students: [],
    student: {
      studentName: "",
      studentEmail: "",
      studentAge: 0
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleChangeStudent = ({ target }) => {
    const { name, value } = target;

    this.setState({ student: { ...this.state.student, [name]: value } });
  };

  handleSubmit = createSport => async e => {
    e.preventDefault();
    const { data } = await createSport();
    Router.push({ pathname: "/sport", query: { id: data.createSport.id } });
  };

  updateValue = v => {
    this.setState({ trainerId: v.trainers[0].id });
  };

  addStudent = () => {
    this.setState({
      students: [...this.state.students, this.state.student]
    });
  };

  render() {
    const { name, capacity, type, trainerId, student } = this.state;

    return (
      <Mutation
        mutation={CREATE_SPORT_MUTATION}
        variables={pick(
          this.state,
          "name",
          "capacity",
          "type",
          "trainerId",
          "students"
        )}
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
            <label htmlFor="title">
              Tipo:
              <select
                onChange={this.handleChange}
                value={type}
                name="type"
                id="type"
                required
              >
                <option value="INDIVIDUAL">INDIVIDUAL</option>
                <option value="GRUPAL">GRUPAL</option>
              </select>
            </label>
            <Query query={ALL_TRAINERS_QUERY} onCompleted={this.updateValue}>
              {({ data, loading, error }) => {
                if (error) return <Error error={error} />;

                if (loading) return <p>Cargando entrenadores</p>;
                return (
                  <label htmlFor="trainerId">
                    Profesor asignado:
                    <select
                      onChange={this.handleChange}
                      value={trainerId}
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
            <br />
            <br />
            Estudiantes
            <br />
            <br />
            <div>
              <label htmlFor="studentName">
                Nombre:
                <input
                  id="studentName"
                  name="studentName"
                  onChange={this.handleChangeStudent}
                  placeholder="Nombre: "
                  required
                  type="text"
                  value={student.studentName}
                />
              </label>
              <label htmlFor="studentEmail">
                Email:
                <input
                  id="studentEmail"
                  name="studentEmail"
                  onChange={this.handleChangeStudent}
                  placeholder="Email: "
                  required
                  type="email"
                  value={student.studentEmail}
                />
              </label>
              <label htmlFor="studentAge">
                Edad:
                <input
                  id="studentAge"
                  name="studentAge"
                  onChange={this.handleChangeStudent}
                  placeholder="Edad: "
                  required
                  type="number"
                  value={student.studentAge}
                />
              </label>

              <button type="button" onClick={this.addStudent}>
                Agregar estudiante
              </button>
            </div>
            <br />
            {this.state.students.map(student => (
              <div>
                <p>Name {student.studentName}</p>
                <p>Email {student.studentEmail}</p>
                <p>Age {student.studentAge}</p>
              </div>
            ))}
            <button type="submit">Crear</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateSport;
