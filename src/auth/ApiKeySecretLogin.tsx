import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Broker, UserCredentials } from "../types";
import { getCustomStyles } from "../styles";

interface ApiKeySecretLoginProps {
  broker: Broker;
  onLogin: (credentials: UserCredentials) => void;
  onBack: () => void;
  theme?: any;
}

const Wrapper = styled.div<{ customStyles: any }>`
  ${(props) => props.customStyles}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
`;

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

const ApiKeySecretLogin: React.FC<ApiKeySecretLoginProps> = ({
  broker,
  onLogin,
  onBack,
  theme,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const customStyles = getCustomStyles(theme);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ apiKey, apiSecret });
  };

  return (
    <Wrapper customStyles={customStyles}>
      <h3>Login to {broker.broker}</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Input
          type="password"
          placeholder="API Secret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <Button type="button" onClick={onBack}>
          Back
        </Button>
      </Form>
    </Wrapper>
  );
};

export default ApiKeySecretLogin;
