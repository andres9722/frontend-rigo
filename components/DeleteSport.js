import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_SPORTS_QUERY } from "./Sports";

const DELETE_SPORT_MUTATION = gql`
  mutation DELETE_SPORT_MUTATION($where: SportWhereUniqueInput!) {
    deleteSport(where: $where) {
      id
      name
      capacity
      type
    }
  }
`;

class DeleteSport extends React.Component {
  handleDelete = deleteSport => () => {
    if (confirm("Are you sure you want to delete this?")) {
      deleteSport();
    }
  };

  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_SPORTS_QUERY });

    data.sports = data.sports.filter(
      ({ id }) => id !== payload.data.deleteSport.id
    );
    cache.writeQuery({ query: ALL_SPORTS_QUERY, data });
  };

  render() {
    const { children, id } = this.props;

    return (
      <Mutation
        mutation={DELETE_SPORT_MUTATION}
        variables={{ where: { id } }}
        update={this.update}
      >
        {(deleteSport, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <button onClick={this.handleDelete(deleteSport)}>{children}</button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteSport;
