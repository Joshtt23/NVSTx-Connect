import React from "react";
import styled, { css } from "styled-components";
import { Broker, UserCredentials } from "../types";
import { getCustomStyles } from "../styles";

interface OAuthLoginProps {
  broker: Broker;
  onLogin: (credentials: UserCredentials) => void;
  onBack: () => void;
  theme?: any;
}

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color var(--animation-duration);

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const Wrapper = styled.div<{ $customStyles: any }>`
  ${(props) => props.$customStyles}
`;

const OAuthLogin: React.FC<OAuthLoginProps> = ({
  broker,
  onLogin,
  onBack,
  theme,
}) => {
  const customStyles = getCustomStyles(theme);

  const handleOAuthLogin = () => {
    // Simulate OAuth login
    setTimeout(() => {
      onLogin({ oauthToken: "fake-oauth-token" });
    }, 1000);
  };

  return (
    <Wrapper $customStyles={customStyles}>
      <h3>Login to {broker.broker}</h3>
      <Button onClick={handleOAuthLogin}>Login with OAuth</Button>
      <Button onClick={onBack}>Back</Button>
    </Wrapper>
  );
};

export default OAuthLogin;
