import { z } from "zod";

export const addAddressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  phone: z.string(),
  isDefault: z.boolean().optional(),
});

export type UpdateAddressInput = z.infer<typeof addAddressSchema>;

export type AddAddressInput = z.infer<typeof addAddressSchema>;
