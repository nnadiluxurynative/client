import API from "../_lib/axios";
import { create } from "zustand";
import { GenericAPIResponse } from "@/app/_types/api";
import { handleErrorMessage } from "@/app/_utils/helpers";
import { Measurement, MeasurementState } from "@/app/_types/measurement";
import { useAuthStore } from "./authStore";

export const useMeasurementStore = create<MeasurementState>(() => ({
  addMeasurement: async (data) => {
    const { user } = useAuthStore.getState();
    try {
      // Send request to create measurement
      const res = await API.post<GenericAPIResponse<Measurement>>(
        "/measurements",
        data
      );

      // Newly created measurement
      const newMeasurement = res.data.data;

      // Update user store with new measurement
      if (user && newMeasurement) {
        // If new measurement is default, unset existing defaults
        let newMeasurements = user.measurements ?? [];
        if (data.isDefault) {
          newMeasurements = newMeasurements.map((m) => {
            if (m.isDefault) m.isDefault = false;
            return m;
          });
        }

        // Prepend the newly created measurement
        useAuthStore.setState({
          user: {
            ...user,
            measurements: [newMeasurement, ...newMeasurements],
          },
        });
      }
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to add measurement");
      throw Error(message);
    }
  },

  updateMeasurement: async (data, id) => {
    // Get current user
    const { user } = useAuthStore.getState();
    try {
      // Send update request
      const res = await API.patch<GenericAPIResponse<Measurement>>(
        `/measurements/${id}`,
        data
      );

      // Updated measurement
      const updated = res.data.data;

      // Update user store with updated measurement
      if (user && updated) {
        let newMeasurements = user.measurements ?? [];

        // If measurement is set to default, unset other defaults
        if (data.isDefault) {
          newMeasurements = newMeasurements.map((m) => {
            if (m.isDefault) m.isDefault = false;
            return m;
          });
        }

        // Replace the updated measurement in the list
        newMeasurements = newMeasurements.map((m) => {
          if (m._id && updated._id) {
            return m._id === updated._id ? updated : m;
          }
          return m;
        });

        useAuthStore.setState({
          user: {
            ...user,
            measurements: newMeasurements,
          },
        });
      }
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to update measurement");
      throw Error(message);
    }
  },

  deleteMeasurement: async (id) => {
    // Get current user
    const { user } = useAuthStore.getState();
    try {
      await API.delete<GenericAPIResponse<any>>(`/measurements/${id}`);

      if (user) {
        let newMeasurements = user.measurements.filter((m) => m._id !== id);

        // If the deleted measurement was default, make the first one default
        if (
          newMeasurements.length > 0 &&
          !newMeasurements.some((m) => m.isDefault)
        ) {
          newMeasurements[0].isDefault = true;
        }

        // Update user store
        useAuthStore.setState({
          user: {
            ...user,
            measurements: newMeasurements,
          },
        });
      }
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to delete measurement");
      throw Error(message);
    }
  },
}));
