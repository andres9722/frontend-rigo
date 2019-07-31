import React from "react";
import Permissions from "../components/Permissions";
import styled from "styled-components";

const PermissionStyled = styled.div`
  position: absolute;
  top: 100px;
  left: 24px;
`;

const PermissionsPage = () => {
  return (
    <PermissionStyled>
      <Permissions />
    </PermissionStyled>
  );
};

export default PermissionsPage;
