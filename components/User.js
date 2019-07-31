import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import React from "react";

const CURRENT_USER_QUERY = gql`
  query me {
    me {
      id
      name
      email
      permissions
    }
  }
`;

const User = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {payload => props.children(payload)}
    </Query>
  );
};

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
