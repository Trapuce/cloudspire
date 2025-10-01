"use client"
import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Button,
  Input,
  Select,
  Table,
  Image,
  Text,
  Badge,
  HStack,
  VStack,
  Spinner,
  Alert,
  Flex,
  IconButton,
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
import { LuSearch, LuPlus, LuPencil, LuTrash2, LuEye } from "react-icons/lu"
import { useHotels } from "@/hooks/useHotels"
import { hotelApi } from "@/services/api"
import type { Hotel } from "@/types/hotel"
import { useRouter } from "next/navigation"

const toaster = createToaster({
  placement: "top-end",
  duration: 3000,
})

export default function HotelsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteHotelId, setDeleteHotelId] = useState<number | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data, loading, error, refetch } = useHotels({
    page: currentPage,
    per_page: 15,
    q: searchTerm || undefined,
    sort: sortBy,
    order: sortOrder,
  })

  const handleDelete = async () => {
    if (!deleteHotelId) return

    try {
      await hotelApi.deleteHotel(deleteHotelId)
      toaster.create({
        title: "Hotel deleted successfully",
        type: "success",
        duration: 3000,
      })
      refetch()
      setIsDeleteOpen(false)
    } catch (error) {
      toaster.create({
        title: "Error deleting hotel",
        description: "Please try again",
        type: "error",
        duration: 3000,
      })
    }
  }

  const openDeleteModal = (hotelId: number) => {
    setDeleteHotelId(hotelId)
    setIsDeleteOpen(true)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  if (loading && !data) {
    return (
      <Container maxW="container.xl" py={8}>
        <Flex justify="center" align="center" minH="400px">
          <VStack gap={4}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
            <Text color="gray.600">Loading hotels...</Text>
          </VStack>
        </Flex>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>{error}</Alert.Title>
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
            <Flex justify="space-between" align="center" mb={2}>
              <VStack align="start" gap={1}>
                <Heading size="2xl" color="gray.800" fontWeight="bold">
                  Hotel Management
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  Manage your accommodations and properties
                </Text>
              </VStack>
              <Button onClick={() => router.push("/hotels/new")} colorPalette="blue" size="lg" gap={2}>
                <LuPlus />
                Add New Hotel
              </Button>
            </Flex>

            <Card.Root bg="white" shadow="sm">
              <Card.Body>
                <HStack gap={4} flexWrap="wrap">
                  <Box flex="1" minW="300px" position="relative">
                    <Box
                      position="absolute"
                      left="3"
                      top="50%"
                      transform="translateY(-50%)"
                      pointerEvents="none"
                      color="gray.400"
                    >
                      <LuSearch size={20} />
                    </Box>
                    <Input
                      placeholder="Search by hotel name or city..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      ps="2.5rem"
                      size="lg"
                      borderColor="gray.300"
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                    />
                  </Box>

                  <Select.Root value={[sortBy]} onValueChange={(e) => setSortBy(e.value[0])} size="lg" width="200px">
                    <Select.Trigger>
                      <Select.ValueText placeholder="Sort by" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item item="created_at">Date Created</Select.Item>
                      <Select.Item item="name">Name</Select.Item>
                      <Select.Item item="city">City</Select.Item>
                      <Select.Item item="price_per_night">Price</Select.Item>
                    </Select.Content>
                  </Select.Root>

                  <Select.Root
                    value={[sortOrder]}
                    onValueChange={(e) => setSortOrder(e.value[0] as "asc" | "desc")}
                    size="lg"
                    width="150px"
                  >
                    <Select.Trigger>
                      <Select.ValueText placeholder="Order" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item item="desc">Descending</Select.Item>
                      <Select.Item item="asc">Ascending</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </HStack>
              </Card.Body>
            </Card.Root>

            {data && (
              <Text color="gray.600" fontSize="sm">
                Showing {data.meta.from || 0} to {data.meta.to || 0} of {data.meta.total} hotels
              </Text>
            )}

            <Card.Root bg="white" shadow="md" overflow="hidden">
              <Table.Root variant="simple" size="lg">
                <Table.Header bg="gray.100">
                  <Table.Row>
                    <Table.ColumnHeader fontWeight="bold" color="gray.700">
                      Image
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" color="gray.700">
                      Hotel Details
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" color="gray.700">
                      Location
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" color="gray.700">
                      Description
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" color="gray.700">
                      Capacity
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" color="gray.700">
                      Price/Night
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" color="gray.700" textAlign="center">
                      Actions
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data?.data.map((hotel: Hotel) => (
                    <Table.Row key={hotel.id} _hover={{ bg: "blue.50" }} transition="background 0.2s">
                      <Table.Cell>
                        {hotel.first_picture ? (
                          <Image
                            src={hotel.first_picture.url || "/placeholder.svg"}
                            alt={hotel.name}
                            boxSize="80px"
                            objectFit="cover"
                            borderRadius="lg"
                            shadow="sm"
                          />
                        ) : (
                          <Box
                            boxSize="80px"
                            bg="gray.100"
                            borderRadius="lg"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="2px dashed"
                            borderColor="gray.300"
                          >
                            <Text fontSize="xs" color="gray.500" textAlign="center" px={2}>
                              No Image
                            </Text>
                          </Box>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <VStack align="start" gap={2}>
                          <Text fontWeight="bold" fontSize="md" color="gray.800">
                            {hotel.name}
                          </Text>
                          <Badge colorPalette="blue" size="sm" variant="subtle">
                            {hotel.country}
                          </Badge>
                        </VStack>
                      </Table.Cell>
                      <Table.Cell>
                        <VStack align="start" gap={1}>
                          <Text fontSize="sm" fontWeight="medium" color="gray.700">
                            {hotel.city}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {hotel.zipcode}
                          </Text>
                        </VStack>
                      </Table.Cell>
                      <Table.Cell maxW="250px">
                        <Text fontSize="sm" lineClamp={2} color="gray.600">
                          {hotel.description ? truncateText(hotel.description, 100) : "No description available"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <HStack gap={1}>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                            {hotel.max_capacity}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            guests
                          </Text>
                        </HStack>
                      </Table.Cell>
                      <Table.Cell>
                        <Text fontSize="lg" fontWeight="bold" color="green.600">
                          €{hotel.price_per_night}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <HStack gap={1} justify="center">
                          <IconButton
                            aria-label="View hotel details"
                            size="sm"
                            variant="ghost"
                            colorPalette="blue"
                            onClick={() => router.push(`/hotels/${hotel.id}`)}
                          >
                            <LuEye />
                          </IconButton>
                          <IconButton
                            aria-label="Edit hotel"
                            size="sm"
                            variant="ghost"
                            colorPalette="orange"
                            onClick={() => router.push(`/hotels/${hotel.id}/edit`)}
                          >
                            <LuPencil />
                          </IconButton>
                          <IconButton
                            aria-label="Delete hotel"
                            size="sm"
                            variant="ghost"
                            colorPalette="red"
                            onClick={() => openDeleteModal(hotel.id)}
                          >
                            <LuTrash2 />
                          </IconButton>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Card.Root>

            {data && data.meta.last_page > 1 && (
              <Flex justify="center" gap={3} align="center">
                <Button
                  size="md"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  colorPalette="blue"
                >
                  Previous
                </Button>
                <HStack gap={2}>
                  <Text fontWeight="medium" color="gray.700">
                    Page {data.meta.current_page} of {data.meta.last_page}
                  </Text>
                </HStack>
                <Button
                  size="md"
                  variant="outline"
                  disabled={currentPage === data.meta.last_page}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  colorPalette="blue"
                >
                  Next
                </Button>
              </Flex>
            )}

            {/* Delete Confirmation Modal */}
            <DialogRoot open={isDeleteOpen} onOpenChange={(e) => setIsDeleteOpen(e.open)}>
              <DialogContent>
                <DialogHeader fontSize="xl" fontWeight="bold">
                  Delete Hotel
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody>
                  <Text>
                    Are you sure you want to delete this hotel? This action cannot be undone and will also delete all
                    associated photos.
                  </Text>
                </DialogBody>
                <DialogFooter gap={3}>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button colorPalette="red" onClick={handleDelete}>
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
