export type Address = {
  firstName: string;
  country?: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  isDefault?: boolean;
  user?: string;
  _id?: string;
};

export type AddressState = {
  deleteAddress: (id: string) => Promise<void>;
  updateAddress: (data: Address, id: string) => Promise<void>;
  addAddress: (data: Address) => Promise<void>;
};
