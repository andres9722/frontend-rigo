import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";

const Nav = () => {
  return (
    <User>
      {({ data: { me } }) => {
        console.log("TCL: Nav -> me", me);
        return (
          <NavStyles>
            <Link href="/">
              <a>Inicio</a>
            </Link>
            {me && (
              <React.Fragment>
                <Link href="/trainers">
                  <a>Entrenadores</a>
                </Link>
                <Link href="/sports">
                  <a>Deportes</a>
                </Link>
                <Link href="/me">
                  <a>Cuenta</a>
                </Link>
                <Signout />
              </React.Fragment>
            )}
            {!me && (
              <Link href="/signup">
                <a>Iniciar sesion</a>
              </Link>
            )}
          </NavStyles>
        );
      }}
    </User>
  );
};

export default Nav;
