"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Container,
  Heading,
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Grid,
  GridItem,
  Button,
  Spinner,
  Alert,
  Card,
} from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  Toaster,
  createToaster,
} from "@chakra-ui/react"
import { LuPencil, LuTrash2, LuArrowLeft, LuMapPin, LuUsers, LuEuro } from "react-icons/lu"
import { useHotel } from "@/hooks/useHotel"
import { hotelApi } from "@/services/api"
import ImageUpload from "@/components/ImageUpload"
import ImageGallery from "@/components/ImageGallery"

const toaster = createToaster({
  placement: "top-end",
  duration: 3000,
})

export default function HotelDetailPage() {
  const params = useParams()
  const router = useRouter()
  const hotelId = Number.parseInt(params.id as string)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data: hotel, loading, error, refetch } = useHotel(hotelId)

  const handleDelete = async () => {
    if (!hotel) return

    setIsDeleting(true)
    try {
      await hotelApi.deleteHotel(hotel.id)
      toaster.create({
        title: "Hotel deleted successfully",
        type: "success",
      })
      router.push("/hotels")
    } catch (error) {
      toaster.create({
        title: "Error deleting hotel",
        description: "Please try again",
        type: "error",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteOpen(false)
    }
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
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
      <Container maxW="container.xl" py={8}>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>{error || "Hotel not found"}</Alert.Title>
        </Alert.Root>
      </Container>
    )
  }

  return (
    <>
      <Toaster toaster={toaster} />
      <Box bg="gray.50" minH="100vh">
        <Container maxW="container.xl" py={8}>
          <VStack gap={6} align="stretch">
            <HStack gap={4}>
              <Button variant="ghost" onClick={() => router.push("/hotels")} gap={2}>
                <LuArrowLeft />
                Back to Hotels
              </Button>
            </HStack>

            <HStack justify="space-between" align="start">
              <VStack align="start" gap={3}>
                <Heading size="2xl" color="gray.800" fontWeight="bold">
                  {hotel.name}
                </Heading>
                <HStack gap={2}>
                  <Badge colorPalette="blue" size="lg" variant="subtle">
                    {hotel.country}
                  </Badge>
                  <Badge colorPalette="green" size="lg" variant="subtle">
                    {hotel.city}
                  </Badge>
                </HStack>
              </VStack>
              <HStack gap={3}>
                <Button colorPalette="orange" onClick={() => router.push(`/hotels/${hotel.id}/edit`)} gap={2} size="lg">
                  <LuPencil />
                  Edit
                </Button>
                <Button colorPalette="red" variant="outline" onClick={() => setIsDeleteOpen(true)} gap={2} size="lg">
                  <LuTrash2 />
                  Delete
                </Button>
              </HStack>
            </HStack>

            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
              {/* Main Content */}
              <GridItem>
                <VStack gap={6} align="stretch">
                  <Card.Root>
                    <Card.Header>
                      <Heading size="lg" color="gray.800">
                        Photos
                      </Heading>
                    </Card.Header>
                    <Card.Body>
                      <VStack gap={6} align="stretch">
                        <ImageGallery pictures={hotel.pictures || []} hotelName={hotel.name} />
                        <ImageUpload hotelId={hotel.id} onUploadComplete={refetch} maxFiles={10} multiple={true} />
                      </VStack>
                    </Card.Body>
                  </Card.Root>

                  {/* Description */}
                  {hotel.description && (
                    <Card.Root>
                      <Card.Header>
                        <Heading size="lg" color="gray.800">
                          Description
                        </Heading>
                      </Card.Header>
                      <Card.Body>
                        <Text color="gray.700" lineHeight="tall">
                          {hotel.description}
                        </Text>
                      </Card.Body>
                    </Card.Root>
                  )}
                </VStack>
              </GridItem>

              <GridItem>
                <VStack gap={6} align="stretch">
                  {/* Hotel Info Card */}
                  <Card.Root shadow="lg">
                    <Card.Header>
                      <Heading size="lg" color="gray.800">
                        Hotel Information
                      </Heading>
                    </Card.Header>
                    <Card.Body>
                      <VStack gap={5} align="stretch">
                        <Box>
                          <HStack gap={2} mb={2}>
                            <LuMapPin color="var(--chakra-colors-blue-500)" />
                            <Text fontSize="sm" fontWeight="bold" color="gray.600">
                              ADDRESS
                            </Text>
                          </HStack>
                          <Text color="gray.700" lineHeight="relaxed">
                            {hotel.address1}
                            {hotel.address2 && (
                              <>
                                <br />
                                {hotel.address2}
                              </>
                            )}
                            <br />
                            {hotel.zipcode} {hotel.city}
                            <br />
                            {hotel.country}
                          </Text>
                        </Box>

                        <Box>
                          <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2}>
                            COORDINATES
                          </Text>
                          <Text fontSize="sm" color="gray.700" fontFamily="mono">
                            {hotel.lat}, {hotel.lng}
                          </Text>
                        </Box>

                        <Box>
                          <HStack gap={2} mb={2}>
                            <LuUsers color="var(--chakra-colors-green-500)" />
                            <Text fontSize="sm" fontWeight="bold" color="gray.600">
                              MAXIMUM CAPACITY
                            </Text>
                          </HStack>
                          <Text fontSize="xl" fontWeight="bold" color="gray.800">
                            {hotel.max_capacity} guests
                          </Text>
                        </Box>

                        <Box>
                          <HStack gap={2} mb={2}>
                            <LuEuro color="var(--chakra-colors-green-500)" />
                            <Text fontSize="sm" fontWeight="bold" color="gray.600">
                              PRICE PER NIGHT
                            </Text>
                          </HStack>
                          <Text fontSize="3xl" fontWeight="bold" color="green.600">
                            €{hotel.price_per_night}
                          </Text>
                        </Box>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              </GridItem>
            </Grid>

            {/* Delete Confirmation Modal */}
            <DialogRoot open={isDeleteOpen} onOpenChange={(e) => setIsDeleteOpen(e.open)}>
              <DialogContent>
                <DialogHeader fontSize="xl" fontWeight="bold">
                  Delete Hotel
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody>
                  <Text>
                    Are you sure you want to delete <strong>"{hotel.name}"</strong>? This action cannot be undone and
                    will also delete all associated photos.
                  </Text>
                </DialogBody>
                <DialogFooter gap={3}>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button colorPalette="red" onClick={handleDelete} loading={isDeleting} loadingText="Deleting...">
                    Delete Hotel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </VStack>
        </Container>
      </Box>
    </>
  )
}
