import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BrokerSelector from "./BrokerSelector";
import {
  Broker,
  UserCredentials,
  BrokerConnectorProps,
  StyleCustomizations,
} from "./types";
import { getCustomStyles, GlobalStyle } from "./styles";
import { createConnector } from "./connector";

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const WidgetContainer = styled.div<{
  $theme: any;
  $styleCustomizations?: StyleCustomizations;
}>`
  ${(props) => getCustomStyles(props.$theme, props.$styleCustomizations)}
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const Button = styled.button<{ $customStyle?: React.CSSProperties }>`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color var(--animation-duration);
  margin: 0.5rem;

  &:hover {
    background-color: var(--secondary-color);
  }

  ${(props) => props.$customStyle && { ...props.$customStyle }}
`;

const BrokerConnector: React.FC<BrokerConnectorProps> = ({
  apiKey,
  styled = true,
  showLogos = true,
  onConnect,
  onDisconnect,
  theme,
  styleCustomizations,
}) => {
  const [connector, setConnector] = useState(createConnector(apiKey));
  const [connectedBroker, setConnectedBroker] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setConnector(createConnector(apiKey));
  }, [apiKey]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConnectBroker = async (
    broker: Broker,
    credentials: UserCredentials
  ) => {
    try {
      await connector.connectBroker({
        broker,
        loginType: broker.auth,
        credentials,
      });
      setConnectedBroker(broker.broker);
      setIsOpen(false);
      onConnect && onConnect(broker.broker);
    } catch (error) {
      console.error("Failed to connect broker:", error);
    }
  };

  const handleDisconnect = () => {
    connector.disconnectBroker();
    setConnectedBroker(null);
    onDisconnect && onDisconnect();
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <GlobalStyle />
      <Button
        onClick={toggleWidget}
        $customStyle={styleCustomizations?.buttonStyle}
      >
        {connectedBroker ? `Connected to ${connectedBroker}` : "Connect Broker"}
      </Button>
      <Overlay $isOpen={isOpen}>
        <WidgetContainer
          $theme={theme}
          $styleCustomizations={styleCustomizations}
        >
          {!connectedBroker && (
            <BrokerSelector
              styled={styled}
              showLogos={showLogos}
              onSelectBroker={handleConnectBroker}
              theme={theme}
              styleCustomizations={styleCustomizations}
              onClose={() => setIsOpen(false)}
            />
          )}
          {connectedBroker && (
            <div>
              <h2>Connected to {connectedBroker}</h2>
              <Button
                $customStyle={styleCustomizations?.buttonStyle}
                onClick={() => connector.fetchPortfolio()}
              >
                Fetch Portfolio
              </Button>
              <Button
                $customStyle={styleCustomizations?.buttonStyle}
                onClick={() => connector.fetchHoldings()}
              >
                Fetch Holdings
              </Button>
              <Button
                $customStyle={styleCustomizations?.buttonStyle}
                onClick={() => connector.fetchOrders()}
              >
                Fetch Orders
              </Button>
              <Button
                $customStyle={styleCustomizations?.buttonStyle}
                onClick={() =>
                  connector.placeTrade({
                    /* trade details */
                  })
                }
              >
                Place Trade
              </Button>
              <Button
                $customStyle={styleCustomizations?.buttonStyle}
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          )}
        </WidgetContainer>
      </Overlay>
    </>
  );
};

export default BrokerConnector;
