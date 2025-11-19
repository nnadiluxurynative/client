import { Address } from "./address";
import { Measurement } from "./measurement";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  addresses: Address[];
  measurements: Measurement[];
};
