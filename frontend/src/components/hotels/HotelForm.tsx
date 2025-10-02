"use client"

import {
  Box,
  VStack,
  Button,
  Alert,
  Text,
  Spinner,
  Card,
  Heading,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { hotelFormSchema, HotelFormData } from "@/schemas/hotelSchema"
import { HotelFormSections } from "@/components/hotels/HotelFormSections"

interface HotelFormProps {
  initialData?: Partial<HotelFormData>
  onSubmit: (data: HotelFormData) => Promise<void>
  loading?: boolean
  error?: string | null
  submitText?: string
  loadingText?: string
}

export function HotelForm({
  initialData,
  onSubmit,
  loading = false,
  error = null,
  submitText = "Enregistrer",
  loadingText = "Enregistrement...",
}: HotelFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: initialData,
  })

  return (
    <Box maxW="1000px" mx="auto" mt={10} p={6}>
      <Card.Root>
        <Card.Body>
          <VStack gap={6} align="stretch">
            {error && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Erreur!</Alert.Title>
                  <Alert.Description>{error}</Alert.Description>
                </Alert.Content>
              </Alert.Root>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={6} align="stretch">
                <HotelFormSections
                  register={register}
                  control={control}
                  errors={errors}
                />

                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  isLoading={loading}
                  loadingText={loadingText}
                  disabled={loading}
                >
                  {submitText}
                </Button>
              </VStack>
            </form>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  )
}
