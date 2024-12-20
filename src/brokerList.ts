import { Broker } from "./types";

export const brokers: Broker[] = [
  { broker: "Broker1", auth: "username_password", logo: "broker1.png" },

  { broker: "Broker2", auth: "api_key_secret", logo: "broker2.png" },

  { broker: "Broker3", auth: "oauth", logo: "broker3.png" },
];
