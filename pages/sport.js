import React from "react";
import SingleSport from "../components/SingleSport";

const Sport = ({ query }) => {
  return (
    <div>
      <SingleSport id={query.id} />
    </div>
  );
};

export default Sport;
