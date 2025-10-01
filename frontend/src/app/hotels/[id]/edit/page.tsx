"use client"

import { useParams, useRouter } from "next/navigation"
import { Container, Heading, Box, VStack, HStack, Button, Spinner, Alert, Text } from "@chakra-ui/react"
import { LuArrowLeft } from "react-icons/lu"
import { useHotel } from "@/hooks/useHotel"
import HotelForm from "@/components/HotelForm"

export default function HotelEditPage() {
  const params = useParams()
  const router = useRouter()
  const hotelId = Number.parseInt(params.id as string)

  const { data: hotel, loading, error } = useHotel(hotelId)

  const handleSuccess = () => {
    router.push(`/hotels/${hotelId}`)
  }

  if (loading) {
    return (
      <Container maxW="container.lg" py={8}>
        <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
          <VStack gap={4}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
            <Text color="gray.600">Loading hotel details...</Text>
          </VStack>
        </Box>
      </Container>
    )
  }

  if (error || !hotel) {
    return (
      <Container maxW="container.lg" py={8}>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>{error || "Hotel not found"}</Alert.Title>
        </Alert.Root>
      </Container>
    )
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.lg" py={8}>
        <VStack gap={6} align="stretch">
          {/* Header */}
          <HStack gap={4}>
            <Button variant="ghost" onClick={() => router.push(`/hotels/${hotelId}`)} gap={2}>
              <LuArrowLeft />
              Back
            </Button>
          </HStack>

          <VStack align="start" gap={2}>
            <Heading size="2xl" color="gray.800" fontWeight="bold">
              Edit Hotel
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Update information for {hotel.name}
            </Text>
          </VStack>

          {/* Form */}
          <Box bg="white" p={8} borderRadius="lg" shadow="md">
            <HotelForm initialData={hotel} hotelId={hotelId} onSuccess={handleSuccess} />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
