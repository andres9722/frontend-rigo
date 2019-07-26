import React from "react";
import SingleTrainer from "../components/SingleTrainer";

const Trainer = ({ query }) => {
  return (
    <div>
      <SingleTrainer id={query.id} />
    </div>
  );
};

export default Trainer;
