"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {
  Box,
  Button,
  Field,
  Input,
  Textarea,
  NumberInput,
  VStack,
  HStack,
  Grid,
  GridItem,
  Text,
  Card,
} from "@chakra-ui/react"
import { Toaster, createToaster } from "@chakra-ui/react"
import type { HotelFormData } from "@/types/hotel"
import { hotelApi } from "@/services/api"

const schema = yup.object({
  name: yup
    .string()
    .required("Hotel name is required")
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name is too long"),
  address1: yup.string().required("Street address is required").max(255, "Address is too long"),
  address2: yup.string().max(255, "Address is too long"),
  zipcode: yup.string().required("Zipcode is required").max(20, "Zipcode is too long"),
  city: yup.string().required("City is required").max(100, "City name is too long"),
  country: yup.string().required("Country is required").max(100, "Country name is too long"),
  lat: yup
    .number()
    .required("Latitude is required")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  lng: yup
    .number()
    .required("Longitude is required")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  description: yup.string().max(5000, "Description is too long (max 5000 characters)"),
  max_capacity: yup
    .number()
    .required("Maximum capacity is required")
    .min(1, "Capacity must be at least 1 guest")
    .max(200, "Capacity cannot exceed 200 guests"),
  price_per_night: yup.number().required("Price per night is required").min(0, "Price must be a positive number"),
})

const toaster = createToaster({
  placement: "top-end",
  duration: 4000,
})

interface HotelFormProps {
  initialData?: Partial<HotelFormData>
  hotelId?: number
  onSuccess: () => void
}

export default function HotelForm({ initialData, hotelId, onSuccess }: HotelFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<HotelFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: HotelFormData) => {
    setIsSubmitting(true)
    try {
      if (hotelId) {
        await hotelApi.updateHotel(hotelId, data)
        toaster.create({
          title: "Success!",
          description: "Hotel updated successfully",
          type: "success",
        })
      } else {
        await hotelApi.createHotel(data)
        toaster.create({
          title: "Success!",
          description: "Hotel created successfully",
          type: "success",
        })
      }
      onSuccess()
    } catch (error) {
      toaster.create({
        title: "Error",
        description: hotelId
          ? "Failed to update hotel. Please try again."
          : "Failed to create hotel. Please try again.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster toaster={toaster} />
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={6} align="stretch">
          <Card.Root>
            <Card.Header>
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Basic Information
              </Text>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                <Field.Root invalid={!!errors.name} required>
                  <Field.Label fontWeight="semibold">Hotel Name</Field.Label>
                  <Input {...register("name")} placeholder="Enter hotel name" size="lg" />
                  {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
                </Field.Root>

                <Field.Root invalid={!!errors.description}>
                  <Field.Label fontWeight="semibold">Description</Field.Label>
                  <Textarea
                    {...register("description")}
                    placeholder="Describe the hotel, its amenities, and what makes it special..."
                    rows={5}
                    size="lg"
                  />
                  {errors.description && <Field.ErrorText>{errors.description.message}</Field.ErrorText>}
                </Field.Root>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Address
              </Text>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <GridItem>
                    <Field.Root invalid={!!errors.address1} required>
                      <Field.Label fontWeight="semibold">Street Address</Field.Label>
                      <Input {...register("address1")} placeholder="123 Main Street" size="lg" />
                      {errors.address1 && <Field.ErrorText>{errors.address1.message}</Field.ErrorText>}
                    </Field.Root>
                  </GridItem>
                  <GridItem>
                    <Field.Root invalid={!!errors.address2}>
                      <Field.Label fontWeight="semibold">Address Line 2</Field.Label>
                      <Input {...register("address2")} placeholder="Apartment, suite, etc. (optional)" size="lg" />
                      {errors.address2 && <Field.ErrorText>{errors.address2.message}</Field.ErrorText>}
                    </Field.Root>
                  </GridItem>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4}>
                  <GridItem>
                    <Field.Root invalid={!!errors.zipcode} required>
                      <Field.Label fontWeight="semibold">Zipcode</Field.Label>
                      <Input {...register("zipcode")} placeholder="12345" size="lg" />
                      {errors.zipcode && <Field.ErrorText>{errors.zipcode.message}</Field.ErrorText>}
                    </Field.Root>
                  </GridItem>
                  <GridItem>
                    <Field.Root invalid={!!errors.city} required>
                      <Field.Label fontWeight="semibold">City</Field.Label>
                      <Input {...register("city")} placeholder="Paris" size="lg" />
                      {errors.city && <Field.ErrorText>{errors.city.message}</Field.ErrorText>}
                    </Field.Root>
                  </GridItem>
                  <GridItem>
                    <Field.Root invalid={!!errors.country} required>
                      <Field.Label fontWeight="semibold">Country</Field.Label>
                      <Input {...register("country")} placeholder="France" size="lg" />
                      {errors.country && <Field.ErrorText>{errors.country.message}</Field.ErrorText>}
                    </Field.Root>
                  </GridItem>
                </Grid>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Coordinates
              </Text>
            </Card.Header>
            <Card.Body>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <GridItem>
                  <Field.Root invalid={!!errors.lat} required>
                    <Field.Label fontWeight="semibold">Latitude</Field.Label>
                    <NumberInput.Root
                      value={watch("lat")?.toString() || ""}
                      onValueChange={(e) => setValue("lat", Number.parseFloat(e.value))}
                      min={-90}
                      max={90}
                      size="lg"
                    >
                      <NumberInput.Input placeholder="48.8566" />
                    </NumberInput.Root>
                    {errors.lat && <Field.ErrorText>{errors.lat.message}</Field.ErrorText>}
                  </Field.Root>
                </GridItem>
                <GridItem>
                  <Field.Root invalid={!!errors.lng} required>
                    <Field.Label fontWeight="semibold">Longitude</Field.Label>
                    <NumberInput.Root
                      value={watch("lng")?.toString() || ""}
                      onValueChange={(e) => setValue("lng", Number.parseFloat(e.value))}
                      min={-180}
                      max={180}
                      size="lg"
                    >
                      <NumberInput.Input placeholder="2.3522" />
                    </NumberInput.Root>
                    {errors.lng && <Field.ErrorText>{errors.lng.message}</Field.ErrorText>}
                  </Field.Root>
                </GridItem>
              </Grid>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Capacity & Pricing
              </Text>
            </Card.Header>
            <Card.Body>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <GridItem>
                  <Field.Root invalid={!!errors.max_capacity} required>
                    <Field.Label fontWeight="semibold">Maximum Capacity</Field.Label>
                    <NumberInput.Root
                      value={watch("max_capacity")?.toString() || ""}
                      onValueChange={(e) => setValue("max_capacity", Number.parseInt(e.value))}
                      min={1}
                      max={200}
                      size="lg"
                    >
                      <NumberInput.Input placeholder="50" />
                    </NumberInput.Root>
                    {errors.max_capacity && <Field.ErrorText>{errors.max_capacity.message}</Field.ErrorText>}
                  </Field.Root>
                </GridItem>
                <GridItem>
                  <Field.Root invalid={!!errors.price_per_night} required>
                    <Field.Label fontWeight="semibold">Price per Night (€)</Field.Label>
                    <NumberInput.Root
                      value={watch("price_per_night")?.toString() || ""}
                      onValueChange={(e) => setValue("price_per_night", Number.parseFloat(e.value))}
                      min={0}
                      size="lg"
                    >
                      <NumberInput.Input placeholder="99.00" />
                    </NumberInput.Root>
                    {errors.price_per_night && <Field.ErrorText>{errors.price_per_night.message}</Field.ErrorText>}
                  </Field.Root>
                </GridItem>
              </Grid>
            </Card.Body>
          </Card.Root>

          <HStack justify="flex-end" gap={4}>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={isSubmitting}
              loadingText={hotelId ? "Updating..." : "Creating..."}
            >
              {hotelId ? "Update Hotel" : "Create Hotel"}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  )
}
