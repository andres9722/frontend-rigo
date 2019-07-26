import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_TRAINERS_QUERY } from "./Trainers";

const DELETE_TRAINER_MUTATION = gql`
  mutation DELETE_TRAINER_MUTATION($where: TrainerWhereUniqueInput!) {
    deleteTrainer(where: $where) {
      id
      name
    }
  }
`;

class DeleteTrainer extends React.Component {
  handleDelete = deleteTrainer => () => {
    if (confirm("Are you sure you want to delete this?")) {
      deleteTrainer();
    }
  };

  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_TRAINERS_QUERY });

    data.trainers = data.trainers.filter(
      ({ id }) => id !== payload.data.deleteTrainer.id
    );
    cache.writeQuery({ query: ALL_TRAINERS_QUERY, data });
  };

  render() {
    const { children, id } = this.props;

    return (
      <Mutation
        mutation={DELETE_TRAINER_MUTATION}
        variables={{ where: { id } }}
        update={this.update}
      >
        {(deleteTrainer, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <button onClick={this.handleDelete(deleteTrainer)}>
              {children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteTrainer;
