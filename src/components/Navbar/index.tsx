import React from "react";
import styled from "@emotion/styled/macro";
import { useAuthDispatchContext, useAuthStateContext } from "context/auth";
import { Layout } from "antd";

const { Header } = Layout;

export const Navbar: React.FC = () => {
  const { logout } = useAuthDispatchContext();
  const { isAuthenticated } = useAuthStateContext();

  if (!isAuthenticated) {
    return null;
  }
  return (
    <StyledHeader>
      <InnerWrapper>
        <LogoutButton id="logout" onClick={logout}>
          Logout
        </LogoutButton>
      </InnerWrapper>
    </StyledHeader>
  );
};

const StyledHeader = styled(Header)`
  background-color: #20313c;
  background: #20313c;
  margin-bottom: 16px;
`;
const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;
const LogoutButton = styled.div`
  cursor: pointer;
`;
