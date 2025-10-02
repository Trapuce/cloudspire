"use client"

import {
  Card,
  Image,
  Box,
  Badge,
  VStack,
  Heading,
  HStack,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react"
import { FaEye, FaEdit, FaTrash, FaMapMarkerAlt, FaUsers } from "react-icons/fa"
import { Hotel } from "@/types/types"

interface HotelCardProps {
  hotel: Hotel
  onView: (hotel: Hotel) => void
  onEdit: (hotel: Hotel) => void
  onDelete: (hotel: Hotel) => void
  getHotelImage: (hotel: Hotel) => string
  formatPrice: (price: string) => string
}

export function HotelCard({
  hotel,
  onView,
  onEdit,
  onDelete,
  getHotelImage,
  formatPrice,
}: HotelCardProps) {
  return (
    <Card.Root
      key={hotel.id}
      overflow="hidden"
      borderRadius="xl"
      boxShadow="lg"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
      transition="all 0.3s"
    >
      {/* Image de l'hôtel */}
      <Box position="relative" height="200px" overflow="hidden">
        <Image
          src={getHotelImage(hotel)}
          alt={`Photo de ${hotel.name}`}
          width="100%"
          height="100%"
          objectFit="cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-hotel.svg"
          }}
        />
        <Box
          position="absolute"
          top={3}
          right={3}
          bg="white"
          borderRadius="full"
          p={2}
          boxShadow="md"
        >
          <Badge colorScheme="teal" variant="solid">
            {formatPrice(hotel.price_per_night)}
          </Badge>
        </Box>
        <Box
          position="absolute"
          top={3}
          left={3}
          bg="white"
          borderRadius="full"
          p={2}
          boxShadow="md"
        >
          <Badge colorScheme="blue" variant="solid">
            {hotel.city}
          </Badge>
        </Box>
      </Box>

      {/* Contenu de la carte */}
      <Card.Body p={4}>
        <VStack align="stretch" gap={3}>
          {/* Nom et adresse */}
          <Box>
            <Heading size="md" mb={1} lineHeight="1.2">
              {hotel.name}
            </Heading>
            <HStack gap={1} color="gray.600">
              <FaMapMarkerAlt size="12" />
              <Text fontSize="sm" truncate>
                {hotel.address1}, {hotel.zipcode} {hotel.city}
              </Text>
            </HStack>
          </Box>

          {/* Description */}
          {hotel.description && (
            <Text fontSize="sm" color="gray.600" lineHeight="1.4" maxH="2.8em" overflow="hidden">
              {hotel.description}
            </Text>
          )}

          {/* Capacité */}
          <HStack gap={2} color="gray.600">
            <FaUsers size="14" />
            <Text fontSize="sm">
              {hotel.max_capacity} personnes maximum
            </Text>
          </HStack>

          {/* Actions */}
          <HStack gap={2} pt={2}>
            <Button
              size="sm"
              colorScheme="blue"
              variant="outline"
              flex={1}
              onClick={() => onView(hotel)}
              _focus={{
                boxShadow: "0 0 0 3px var(--chakra-colors-blue-200)"
              }}
            >
              <FaEye style={{ marginRight: '4px' }} />
              Voir
            </Button>
            <Button
              size="sm"
              colorScheme="orange"
              variant="outline"
              flex={1}
              onClick={() => onEdit(hotel)}
              _focus={{
                boxShadow: "0 0 0 3px var(--chakra-colors-orange-200)"
              }}
            >
              <FaEdit style={{ marginRight: '4px' }} />
              Modifier
            </Button>
            <IconButton
              size="sm"
              colorScheme="red"
              variant="outline"
              aria-label={`Supprimer ${hotel.name}`}
              onClick={() => onDelete(hotel)}
              _focus={{
                boxShadow: "0 0 0 3px var(--chakra-colors-red-200)"
              }}
            >
              <FaTrash />
            </IconButton>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}
