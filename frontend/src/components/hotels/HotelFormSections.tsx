"use client"

import {
  VStack,
  SimpleGrid,
  Field,
  Input,
  Textarea,
  Heading,
  Card,
} from "@chakra-ui/react"
import { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { HotelFormData } from "@/schemas/hotelSchema"
import { FaHotel, FaMapMarkerAlt, FaEuroSign, FaUsers, FaGlobe } from "react-icons/fa"

interface HotelFormSectionsProps {
  register: UseFormRegister<HotelFormData>
  control: Control<HotelFormData>
  errors: FieldErrors<HotelFormData>
}

export function HotelFormSections({ register, control, errors }: HotelFormSectionsProps) {
  return (
    <VStack gap={6} align="stretch">
      {/* Informations générales */}
      <Card.Root>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <Heading size="md" display="flex" alignItems="center" gap={2}>
              <FaHotel />
              Informations générales
            </Heading>

            <SimpleGrid columns={[1, 2]} gap={4}>
              <Field.Root invalid={!!errors.name}>
                <Field.Label>Nom de l'hôtel *</Field.Label>
                <Input
                  {...register("name")}
                  placeholder="Ex: Hôtel de la Paix"
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <Field.ErrorText id="name-error">
                    {errors.name.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.max_capacity}>
                <Field.Label>Capacité maximale *</Field.Label>
                <Input
                  type="number"
                  {...register("max_capacity", { valueAsNumber: true })}
                  placeholder="Ex: 50"
                  aria-describedby={errors.max_capacity ? "max_capacity-error" : undefined}
                />
                {errors.max_capacity && (
                  <Field.ErrorText id="max_capacity-error">
                    {errors.max_capacity.message}
                  </Field.ErrorText>
                )}
              </Field.Root>
            </SimpleGrid>

            <Field.Root invalid={!!errors.description}>
              <Field.Label>Description</Field.Label>
              <Textarea
                {...register("description")}
                placeholder="Décrivez votre hôtel, ses services, son ambiance..."
                rows={4}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              {errors.description && (
                <Field.ErrorText id="description-error">
                  {errors.description.message}
                </Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors.price_per_night}>
              <Field.Label>Prix par nuit (€) *</Field.Label>
              <Input
                type="number"
                step="0.01"
                {...register("price_per_night", { valueAsNumber: true })}
                placeholder="Ex: 120"
                aria-describedby={errors.price_per_night ? "price_per_night-error" : undefined}
              />
              {errors.price_per_night && (
                <Field.ErrorText id="price_per_night-error">
                  {errors.price_per_night.message}
                </Field.ErrorText>
              )}
            </Field.Root>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Adresse */}
      <Card.Root>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <Heading size="md" display="flex" alignItems="center" gap={2}>
              <FaMapMarkerAlt />
              Adresse
            </Heading>

            <Field.Root invalid={!!errors.address1}>
              <Field.Label>Adresse ligne 1 *</Field.Label>
              <Input
                {...register("address1")}
                placeholder="Ex: 123 Rue de la Paix"
                aria-describedby={errors.address1 ? "address1-error" : undefined}
              />
              {errors.address1 && (
                <Field.ErrorText id="address1-error">
                  {errors.address1.message}
                </Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors.address2}>
              <Field.Label>Adresse ligne 2</Field.Label>
              <Input
                {...register("address2")}
                placeholder="Ex: Bâtiment A, Appartement 5"
                aria-describedby={errors.address2 ? "address2-error" : undefined}
              />
              {errors.address2 && (
                <Field.ErrorText id="address2-error">
                  {errors.address2.message}
                </Field.ErrorText>
              )}
            </Field.Root>

            <SimpleGrid columns={[1, 2, 3]} gap={4}>
              <Field.Root invalid={!!errors.zipcode}>
                <Field.Label>Code postal *</Field.Label>
                <Input
                  {...register("zipcode")}
                  placeholder="Ex: 75001"
                  aria-describedby={errors.zipcode ? "zipcode-error" : undefined}
                />
                {errors.zipcode && (
                  <Field.ErrorText id="zipcode-error">
                    {errors.zipcode.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.city}>
                <Field.Label>Ville *</Field.Label>
                <Input
                  {...register("city")}
                  placeholder="Ex: Paris"
                  aria-describedby={errors.city ? "city-error" : undefined}
                />
                {errors.city && (
                  <Field.ErrorText id="city-error">
                    {errors.city.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.country}>
                <Field.Label>Pays *</Field.Label>
                <Input
                  {...register("country")}
                  placeholder="Ex: France"
                  aria-describedby={errors.country ? "country-error" : undefined}
                />
                {errors.country && (
                  <Field.ErrorText id="country-error">
                    {errors.country.message}
                  </Field.ErrorText>
                )}
              </Field.Root>
            </SimpleGrid>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Coordonnées GPS */}
      <Card.Root>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <Heading size="md" display="flex" alignItems="center" gap={2}>
              <FaGlobe />
              Coordonnées GPS (optionnel)
            </Heading>

            <SimpleGrid columns={[1, 2]} gap={4}>
              <Field.Root invalid={!!errors.lat}>
                <Field.Label>Latitude</Field.Label>
                <Input
                  type="number"
                  step="0.000001"
                  {...register("lat", { valueAsNumber: true })}
                  placeholder="Ex: 48.8566"
                  aria-describedby={errors.lat ? "lat-error" : undefined}
                />
                {errors.lat && (
                  <Field.ErrorText id="lat-error">
                    {errors.lat.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.lng}>
                <Field.Label>Longitude</Field.Label>
                <Input
                  type="number"
                  step="0.000001"
                  {...register("lng", { valueAsNumber: true })}
                  placeholder="Ex: 2.3522"
                  aria-describedby={errors.lng ? "lng-error" : undefined}
                />
                {errors.lng && (
                  <Field.ErrorText id="lng-error">
                    {errors.lng.message}
                  </Field.ErrorText>
                )}
              </Field.Root>
            </SimpleGrid>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}
