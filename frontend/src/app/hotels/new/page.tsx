"use client"

import { useRouter } from "next/navigation"
import { Container, Heading, Box, VStack, HStack, Button, Text } from "@chakra-ui/react"
import { LuArrowLeft } from "react-icons/lu"
import HotelForm from "@/components/HotelForm"

export default function NewHotelPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/hotels")
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.lg" py={8}>
        <VStack gap={6} align="stretch">
          <HStack gap={4}>
            <Button variant="ghost" onClick={() => router.push("/hotels")} gap={2}>
              <LuArrowLeft />
              Back to Hotels
            </Button>
          </HStack>

          <VStack align="start" gap={2}>
            <Heading size="2xl" color="gray.800" fontWeight="bold">
              Create New Hotel
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Add a new accommodation to your portfolio
            </Text>
          </VStack>

          <Box bg="white" p={8} borderRadius="lg" shadow="md">
            <HotelForm onSuccess={handleSuccess} />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
