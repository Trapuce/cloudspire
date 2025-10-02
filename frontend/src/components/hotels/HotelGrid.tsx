"use client"

import { SimpleGrid } from "@chakra-ui/react"
import { Hotel } from "@/types/types"
import { HotelCard } from "./HotelCard"

interface HotelGridProps {
  hotels: Hotel[]
  onView: (hotel: Hotel) => void
  onEdit: (hotel: Hotel) => void
  onDelete: (hotel: Hotel) => void
  getHotelImage: (hotel: Hotel) => string
  formatPrice: (price: string) => string
}

export function HotelGrid({
  hotels,
  onView,
  onEdit,
  onDelete,
  getHotelImage,
  formatPrice,
}: HotelGridProps) {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          getHotelImage={getHotelImage}
          formatPrice={formatPrice}
        />
      ))}
    </SimpleGrid>
  )
}
