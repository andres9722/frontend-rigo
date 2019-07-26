import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";

import DeleteTrainer from "./DeleteTrainer";

const Trainer = ({ trainer }) => {
  return (
    <ItemStyles>
      <Title>
        <Link href={{ pathname: "/trainer", query: { id: trainer.id } }}>
          <a>{trainer.name}</a>
        </Link>
      </Title>
      <p>{trainer.email}</p>

      <div className="buttonList">
        <Link href={{ pathname: "update-trainer", query: { id: trainer.id } }}>
          <a> Editar ✏️</a>
        </Link>
        <DeleteTrainer id={trainer.id}>Eliminar entrenador 🚨</DeleteTrainer>
      </div>
    </ItemStyles>
  );
};

Trainer.propTypes = {
  trainer: PropTypes.object.isRequired
};

export default Trainer;
