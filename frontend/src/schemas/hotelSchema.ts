import { z } from "zod";

export const hotelFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis").min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().optional(),
  address1: z.string().min(1, "L'adresse est requise"),
  address2: z.string().optional(),
  zipcode: z.string().min(1, "Le code postal est requis").regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
  city: z.string().min(1, "La ville est requise"),
  country: z.string().min(1, "Le pays est requis"),
  lat: z.number().optional(),
  lng: z.number().optional(),
  max_capacity: z.number().min(1, "La capacité doit être d'au moins 1").max(200, "La capacité ne peut pas dépasser 200"),
  price_per_night: z.number().min(1, "Le prix doit être d'au moins 1€").max(10000, "Le prix ne peut pas dépasser 10000€"),
});

export type HotelFormData = z.infer<typeof hotelFormSchema>;
