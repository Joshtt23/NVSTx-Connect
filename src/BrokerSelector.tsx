import React, { useState } from "react";
import styled from "styled-components";
import { Broker, UserCredentials, StyleCustomizations } from "./types";
import UsernamePasswordLogin from "./auth/UsernamePasswordLogin";
import { getCustomStyles } from "./styles";
import { brokers } from "./brokerList";

interface BrokerSelectorProps {
  styled: boolean;
  showLogos: boolean;
  onSelectBroker: (broker: Broker, credentials: UserCredentials) => void;
  theme?: any;
  styleCustomizations?: StyleCustomizations;
  onClose: () => void;
}

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const BrokerList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const BrokerItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
  transition: background-color var(--animation-duration);

  &:hover {
    background-color: var(--secondary-color);
    color: var(--background-color);
  }
`;

const BrokerLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
`;

const BrokerSelector: React.FC<BrokerSelectorProps> = ({
  styled: isStyled,
  showLogos,
  onSelectBroker,
  theme,
  styleCustomizations,
  onClose,
}) => {
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);

  const handleBrokerSelect = (broker: Broker) => {
    setSelectedBroker(broker);
  };

  const handleLogin = (credentials: UserCredentials) => {
    if (selectedBroker) {
      onSelectBroker(selectedBroker, credentials);
    }
  };

  const handleBack = () => {
    setSelectedBroker(null);
  };

  const renderAuthForm = () => {
    if (!selectedBroker) return null;

    return (
      <UsernamePasswordLogin
        broker={selectedBroker}
        onLogin={handleLogin}
        onBack={handleBack}
        theme={theme}
        styleCustomizations={styleCustomizations}
      />
    );
  };

  return (
    <div>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <Title>Select a Broker</Title>
      {!selectedBroker ? (
        <BrokerList>
          {brokers.map((broker) => (
            <BrokerItem
              key={broker.broker}
              onClick={() => handleBrokerSelect(broker)}
            >
              {showLogos && broker.logo && (
                <BrokerLogo src={broker.logo} alt={`${broker.broker} logo`} />
              )}
              {broker.broker}
            </BrokerItem>
          ))}
        </BrokerList>
      ) : (
        renderAuthForm()
      )}
    </div>
  );
};

export default BrokerSelector;
