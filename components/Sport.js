import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";

import DeleteSport from "./DeleteSport";

const Sport = ({ sport }) => {
  return (
    <ItemStyles>
      <Title>
        <Link href={{ pathname: "/sport", query: { id: sport.id } }}>
          <a>{sport.name}</a>
        </Link>
      </Title>
      <p>Capacidad: {sport.capacity}</p>
      <p>Tipo: {sport.type}</p>
      <p>Creador por: {sport.user.name}</p>
      <p>Entrenador asignado: {sport.trainer.name}</p>
      <p>Numero de estudiantes matriculados: {sport.students.length}</p>

      <div className="buttonList">
        <Link href={{ pathname: "update-sport", query: { id: sport.id } }}>
          <a> Editar ✏️</a>
        </Link>
        <DeleteSport id={sport.id}>Eliminar deporte 🚨</DeleteSport>
      </div>
    </ItemStyles>
  );
};

Sport.propTypes = {
  sport: PropTypes.object.isRequired
};

export default Sport;
