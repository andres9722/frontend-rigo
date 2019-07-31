import React from "react";
import User from "./User";

const Profile = () => {
  return (
    <div>
      <User>
        {({ data: { me } }) => {
          return (
            <div>
              <h2>Perfil</h2>
              {me && (
                <React.Fragment>
                  <h4>Nombre: {me.name}</h4>
                  <h4>Email: {me.email}</h4>
                  <h3>Permisos</h3>
                  {me.permissions.map((permission, index) => (
                    <p key={index}>
                      {index + 1} - {permission}
                    </p>
                  ))}
                </React.Fragment>
              )}
            </div>
          );
        }}
      </User>
    </div>
  );
};

export default Profile;
