import { ConnectBrokerParams, Connector } from "./types";
import {
  registerUser,
  loginUser,
  fetchPortfolio,
  fetchHoldings,
  fetchOrders,
  placeTrade,
} from "./api";

class NVSTxConnector implements Connector {
  private apiKey: string;
  private userId: string | null = null;
  private userSecret: string | null = null;
  private connectedBroker: string | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async ensureUserRegistered() {
    if (!this.userId || !this.userSecret) {
      const uid = `user_${Date.now()}`;
      this.userSecret = await registerUser(this.apiKey, uid);
      this.userId = uid;
    }
  }

  async connectBroker({
    broker,
    loginType,
    credentials,
  }: ConnectBrokerParams): Promise<void> {
    await this.ensureUserRegistered();
    await loginUser(
      this.apiKey,
      this.userId!,
      this.userSecret!,
      broker.broker,
      credentials
    );
    this.connectedBroker = broker.broker;
  }

  disconnectBroker(): void {
    this.connectedBroker = null;
  }

  async fetchPortfolio(): Promise<void> {
    if (!this.connectedBroker) throw new Error("No broker connected");
    await fetchPortfolio(this.apiKey, this.userId!, this.userSecret!);
  }

  async fetchHoldings(): Promise<void> {
    if (!this.connectedBroker) throw new Error("No broker connected");
    await fetchHoldings(this.apiKey, this.userId!, this.userSecret!);
  }

  async fetchOrders(): Promise<void> {
    if (!this.connectedBroker) throw new Error("No broker connected");
    await fetchOrders(this.apiKey, this.userId!, this.userSecret!);
  }

  async placeTrade(tradeDetails: any): Promise<void> {
    if (!this.connectedBroker) throw new Error("No broker connected");
    await placeTrade(this.apiKey, this.userId!, this.userSecret!, tradeDetails);
  }
}

export const createConnector = (apiKey: string): Connector => {
  return new NVSTxConnector(apiKey);
};
