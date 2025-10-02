"use client"

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Button,
  Card,
  Flex,
  Icon,
} from "@chakra-ui/react"
import { Hotel } from "@/types/types"
import { FaMapMarkerAlt, FaUsers, FaEuroSign, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa"

interface HotelInfoCardProps {
  hotel: Hotel
  onEdit?: (hotel: Hotel) => void
  onDelete?: (hotel: Hotel) => void
  onBack?: () => void
}

export function HotelInfoCard({ hotel, onEdit, onDelete, onBack }: HotelInfoCardProps) {
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price)
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(numPrice)
  }

  return (
    <Card.Root height="fit-content" position="sticky" top="20px">
      <Card.Body p={6}>
        <VStack gap={6} align="stretch">
          {/* Header avec bouton retour */}
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<FaArrowLeft />}
              onClick={onBack}
              alignSelf="flex-start"
            >
              Retour
            </Button>
          )}

          {/* Titre et prix */}
          <VStack gap={3} align="stretch">
            <Heading size="xl" lineHeight="1.2">
              {hotel.name}
            </Heading>
            
            <HStack gap={2} align="center">
              <Icon as={FaEuroSign} color="teal.500" />
              <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                {formatPrice(hotel.price_per_night)}
              </Text>
              <Text fontSize="lg" color="gray.600">
                par nuit
              </Text>
            </HStack>
          </VStack>

          {/* Tags */}
          <HStack gap={2} wrap="wrap">
            <Badge colorScheme="blue" variant="solid" px={3} py={1} borderRadius="full">
              {hotel.city}
            </Badge>
            <Badge colorScheme="green" variant="solid" px={3} py={1} borderRadius="full">
              {hotel.country}
            </Badge>
            <Badge colorScheme="purple" variant="solid" px={3} py={1} borderRadius="full">
              {hotel.max_capacity} personnes
            </Badge>
          </HStack>

          {/* Adresse */}
          <VStack gap={2} align="stretch">
            <HStack gap={2} align="flex-start">
              <Icon as={FaMapMarkerAlt} color="gray.500" mt={1} />
              <VStack gap={1} align="stretch" flex={1}>
                <Text fontWeight="medium">
                  {hotel.address1}
                </Text>
                {hotel.address2 && (
                  <Text color="gray.600" fontSize="sm">
                    {hotel.address2}
                  </Text>
                )}
                <Text color="gray.600" fontSize="sm">
                  {hotel.zipcode} {hotel.city}, {hotel.country}
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Capacité */}
          <HStack gap={2} align="center">
            <Icon as={FaUsers} color="gray.500" />
            <Text>
              <Text as="span" fontWeight="medium">
                Capacité maximale :
              </Text>{" "}
              {hotel.max_capacity} personnes
            </Text>
          </HStack>

          {/* Description */}
          {hotel.description && (
            <VStack gap={2} align="stretch">
              <Text fontWeight="medium" color="gray.700">
                Description
              </Text>
              <Text color="gray.600" lineHeight="1.6">
                {hotel.description}
              </Text>
            </VStack>
          )}

          {/* Coordonnées GPS */}
          {(hotel.lat || hotel.lng) && (
            <VStack gap={2} align="stretch">
              <Text fontWeight="medium" color="gray.700">
                Coordonnées GPS
              </Text>
              <HStack gap={4}>
                {hotel.lat && (
                  <Text fontSize="sm" color="gray.600">
                    <Text as="span" fontWeight="medium">Lat :</Text> {hotel.lat}
                  </Text>
                )}
                {hotel.lng && (
                  <Text fontSize="sm" color="gray.600">
                    <Text as="span" fontWeight="medium">Lng :</Text> {hotel.lng}
                  </Text>
                )}
              </HStack>
            </VStack>
          )}

          {/* Actions */}
          <VStack gap={3} align="stretch" pt={4}>
            {onEdit && (
              <Button
                colorScheme="orange"
                size="lg"
                leftIcon={<FaEdit />}
                onClick={() => onEdit(hotel)}
                _focus={{
                  boxShadow: "0 0 0 3px var(--chakra-colors-orange-200)"
                }}
              >
                Modifier l'hôtel
              </Button>
            )}
            
            {onDelete && (
              <Button
                colorScheme="red"
                variant="outline"
                size="lg"
                leftIcon={<FaTrash />}
                onClick={() => onDelete(hotel)}
                _focus={{
                  boxShadow: "0 0 0 3px var(--chakra-colors-red-200)"
                }}
              >
                Supprimer l'hôtel
              </Button>
            )}
          </VStack>

          {/* Informations de création */}
          <Box pt={4} borderTop="1px solid" borderColor="gray.200">
            <VStack gap={1} align="stretch">
              <Text fontSize="xs" color="gray.500">
                Créé le {new Date(hotel.created_at).toLocaleDateString('fr-FR')}
              </Text>
              {hotel.updated_at !== hotel.created_at && (
                <Text fontSize="xs" color="gray.500">
                  Modifié le {new Date(hotel.updated_at).toLocaleDateString('fr-FR')}
                </Text>
              )}
            </VStack>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}
