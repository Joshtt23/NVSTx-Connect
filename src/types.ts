export interface Broker {
  broker: string;
  auth: "username_password" | "api_key_secret" | "oauth";
  logo?: string;
}

export interface UserCredentials {
  username?: string;
  password?: string;
  apiKey?: string;
  apiSecret?: string;
  oauthToken?: string;
}

export interface ConnectBrokerParams {
  broker: Broker;
  loginType: "username_password" | "api_key_secret" | "oauth";
  credentials: UserCredentials;
}

export interface BrokerConnectorProps {
  apiKey: string;
  styled?: boolean;
  showLogos?: boolean;
  onConnect?: (broker: string) => void;
  onDisconnect?: () => void;
  theme?: any;
  styleCustomizations?: StyleCustomizations;
}

export interface Connector {
  connectBroker: (params: ConnectBrokerParams) => Promise<void>;
  disconnectBroker: () => void;
  fetchPortfolio: () => Promise<void>;
  fetchHoldings: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  placeTrade: (tradeDetails: any) => Promise<void>;
}

export interface StyleCustomizations {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  borderRadius?: string;
  buttonStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}
