import React, { useState } from "react";
import styled from "styled-components";
import { Broker, UserCredentials, StyleCustomizations } from "../types";
import { getCustomStyles } from "../styles";

interface UsernamePasswordLoginProps {
  broker: Broker;
  onLogin: (credentials: UserCredentials) => void;
  onBack: () => void;
  theme?: any;
  styleCustomizations?: StyleCustomizations;
}

const Wrapper = styled.div<{
  $theme: any;
  $styleCustomizations?: StyleCustomizations;
}>`
  ${(props) => getCustomStyles(props.$theme, props.$styleCustomizations)}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input<{ $customStyle?: React.CSSProperties }>`
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
  ${(props) => props.$customStyle && { ...props.$customStyle }}
`;

const Button = styled.button<{ $customStyle?: React.CSSProperties }>`
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

  ${(props) => props.$customStyle && { ...props.$customStyle }}
`;

const UsernamePasswordLogin: React.FC<UsernamePasswordLoginProps> = ({
  broker,
  onLogin,
  onBack,
  theme,
  styleCustomizations,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <Wrapper $theme={theme} $styleCustomizations={styleCustomizations}>
      <h3>Login to {broker.broker}</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          $customStyle={styleCustomizations?.inputStyle}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          $customStyle={styleCustomizations?.inputStyle}
        />
        <Button type="submit" $customStyle={styleCustomizations?.buttonStyle}>
          Login
        </Button>
        <Button
          type="button"
          onClick={onBack}
          $customStyle={styleCustomizations?.buttonStyle}
        >
          Back
        </Button>
      </Form>
    </Wrapper>
  );
};

export default UsernamePasswordLogin;
