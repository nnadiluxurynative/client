import API from "../_lib/axios";
import { create } from "zustand";
import { GenericAPIResponse } from "../_types/api";
import { handleErrorMessage } from "../_utils/helpers";
import { Address, AddressState } from "../_types/address";
import { useAuthStore } from "./authStore";

export const useAddresStore = create<AddressState>(() => ({
  deleteAddress: async (id: string) => {
    const { user } = useAuthStore.getState();
    try {
      // Make axios call
      await API.delete<GenericAPIResponse<any>>(`/addresses/${id}`);

      // Check if user exists
      if (user) {
        let newAddresses = user.addresses.filter((addr) => addr._id !== id);

        // Make latest address default
        if (newAddresses.length > 0) newAddresses[0].isDefault = true;

        // Update user
        useAuthStore.setState({
          user: {
            ...user,
            addresses: newAddresses,
          },
        });
      }
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to Delete");
      throw Error(message);
    }
  },
  addAddress: async (data) => {
    const { user } = useAuthStore.getState();
    try {
      // Make axios call
      const address = await API.post<GenericAPIResponse<Address>>(
        "/addresses",
        data
      );

      // Update user addresses in the store
      if (user && address.data.data) {
        // Check if new address is new default and update other addresses
        let newAddresses = user.addresses;
        if (data.isDefault) {
          newAddresses = newAddresses.map((addr) => {
            if (addr.isDefault) addr.isDefault = false;
            return addr;
          });
        }
        // Add new address to user addresses
        useAuthStore.setState({
          user: {
            ...user,
            addresses: [address.data.data, ...newAddresses],
          },
        });
      }
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to Add");
      throw Error(message);
    }
  },
  updateAddress: async (data, id) => {
    const { user } = useAuthStore.getState();
    try {
      // Make axios call
      const address = await API.patch<GenericAPIResponse<Address>>(
        `/addresses/${id}`,
        data
      );

      // Get new address
      const newAddress = address.data.data;

      // Check for user and new address
      if (user && newAddress) {
        // Check if address is new default and update other addresses
        let newAddresses = user.addresses;
        if (data.isDefault) {
          newAddresses = newAddresses.map((addr) => {
            if (addr.isDefault) addr.isDefault = false;
            return addr;
          });
        }

        // Find and update the address
        newAddresses = newAddresses.map((addr) => {
          if (addr._id === newAddress._id) return newAddress;
          return addr;
        });

        // Update user addresses in the store
        useAuthStore.setState({
          user: {
            ...user,
            addresses: newAddresses,
          },
        });
      }
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to Add");
      throw Error(message);
    }
  },
}));
