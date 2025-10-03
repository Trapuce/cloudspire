"use client"

import {
  Table,
  Image,
  VStack,
  Text,
  Badge,
  HStack,
  IconButton,
} from "@chakra-ui/react"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"
import { Hotel } from "@/types/types"

interface HotelTableProps {
  hotels: Hotel[]
  sortBy: string
  sortOrder: "asc" | "desc"
  onSort: (field: string) => void
  onView: (hotel: Hotel) => void
  onEdit: (hotel: Hotel) => void
  onDelete: (hotel: Hotel) => void
  getHotelImage: (hotel: Hotel) => string
  formatPrice: (price: string) => string
}

export function HotelTable({
  hotels,
  sortBy,
  sortOrder,
  onSort,
  onView,
  onEdit,
  onDelete,
  getHotelImage,
  formatPrice,
}: HotelTableProps) {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader></Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => onSort("name")}
          >
            Nom {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </Table.ColumnHeader>
          <Table.ColumnHeader>Ville</Table.ColumnHeader>
          <Table.ColumnHeader>Description</Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => onSort("max_capacity")}
          >
            Capacité {sortBy === "max_capacity" && (sortOrder === "asc" ? "↑" : "↓")}
          </Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => onSort("price_per_night")}
          >
            Prix/Nuit {sortBy === "price_per_night" && (sortOrder === "asc" ? "↑" : "↓")}
          </Table.ColumnHeader>
          <Table.ColumnHeader>Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {hotels.map((hotel) => (
          <Table.Row key={hotel.id}>
            <Table.Cell>
              <Image
                boxSize="50px"
                src={getHotelImage(hotel)}
                borderRadius="md"
                objectFit="cover"
                alt={`Photo de ${hotel.name}`}
                loading="lazy"
                // onError={(e) => {
                //   e.currentTarget.src = "/placeholder-hotel.svg"
                // }}
              />
            </Table.Cell>
            <Table.Cell>
              <VStack align="start" gap={1}>
                <Text 
                  fontWeight="bold"
                  maxW="200px" 
                  truncate
                  title={hotel.name}
                >
                  {hotel.name}
                </Text>
                <Text 
                  fontSize="sm" 
                  color="gray.600"
                  maxW="200px" 
                  truncate
                  title={`${hotel.address1}, ${hotel.zipcode} ${hotel.city}`}
                >
                  {hotel.address1}, {hotel.zipcode} {hotel.city}
                </Text>
              </VStack>
            </Table.Cell>
            <Table.Cell>
              <Badge colorScheme="blue" variant="subtle">
                {hotel.city}
              </Badge>
            </Table.Cell>
            <Table.Cell>
              <Text 
                fontSize="sm"
                maxW="200px" 
                truncate
                title={hotel.description || "Aucune description disponible"}
              >
                {hotel.description || "Aucune description"}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Badge 
                colorScheme="green" 
                variant="outline"
                title={`Capacité maximale: ${hotel.max_capacity} personnes`}
              >
                {hotel.max_capacity} personnes
              </Badge>
            </Table.Cell>
            <Table.Cell>
              <Text 
                fontWeight="bold" 
                color="teal.600"
                title={`Prix par nuit: ${formatPrice(hotel.price_per_night)}`}
              >
                {formatPrice(hotel.price_per_night)}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <HStack gap={2}>
                <IconButton
                  size="sm"
                  aria-label={`Voir les détails de ${hotel.name}`}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => onView(hotel)}
                  _focus={{
                    boxShadow: "0 0 0 3px var(--chakra-colors-blue-200)"
                  }}
                >
                  <FaEye />
                </IconButton>

                <IconButton
                  size="sm"
                  aria-label={`Modifier ${hotel.name}`}
                  colorScheme="orange"
                  variant="ghost"
                  onClick={() => onEdit(hotel)}
                  _focus={{
                    boxShadow: "0 0 0 3px var(--chakra-colors-orange-200)"
                  }}
                >
                  <FaEdit />
                </IconButton>

                <IconButton
                  size="sm"
                  aria-label={`Supprimer ${hotel.name}`}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => onDelete(hotel)}
                  _focus={{
                    boxShadow: "0 0 0 3px var(--chakra-colors-red-200)"
                  }}
                >
                  <FaTrash />
                </IconButton>
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
