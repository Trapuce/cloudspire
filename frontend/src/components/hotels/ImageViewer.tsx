"use client"

import {
  Box,
  IconButton,
  Text,
  HStack,
  VStack,
  Flex,
  Image,
  Badge,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { HotelPicture } from "@/types/types"
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa"

interface ImageViewerProps {
  pictures: HotelPicture[]
  initialIndex: number
  onClose: () => void
  hotelName: string
}

export function ImageViewer({ pictures, initialIndex, onClose, hotelName }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        goToPrevious()
        break
      case 'ArrowRight':
        goToNext()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden' 

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY

    const handleTouchEnd = (e: React.TouchEvent) => {
      const touch = e.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      const deltaX = endX - startX
      const deltaY = endY - startY

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          goToPrevious()
        } else {
          goToNext()
        }
      }

      document.removeEventListener('touchend', handleTouchEnd as any)
    }

    document.addEventListener('touchend', handleTouchEnd as any)
  }

  if (!pictures || pictures.length === 0) return null

  const currentPicture = pictures[currentIndex]

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.900"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={handleBackdropClick}
    >
      <VStack gap={4} maxW="90vw" maxH="90vh">
        {/* Header avec contrôles */}
        <HStack justify="space-between" w="full" px={4}>
          <HStack gap={2}>
            <Badge colorScheme="blue" variant="solid" px={3} py={1} borderRadius="full">
              {currentIndex + 1} / {pictures.length}
            </Badge>
            <Text color="white" fontSize="sm">
              {hotelName}
            </Text>
          </HStack>
          
          <IconButton
            aria-label="Fermer"
            icon={<FaTimes />}
            variant="ghost"
            color="white"
            size="lg"
            onClick={onClose}
            _hover={{ bg: "whiteAlpha.200" }}
          />
        </HStack>

        {/* Image principale */}
        <Box
          position="relative"
          maxW="80vw"
          maxH="70vh"
          borderRadius="lg"
          overflow="hidden"
          onTouchStart={handleTouchStart}
        >
          <Image
            src={currentPicture.url}
            alt={`${hotelName} - Photo ${currentIndex + 1}`}
            maxW="100%"
            maxH="100%"
            objectFit="contain"
            onError={(e) => {
              if (e.currentTarget.src !== "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGN0ZBRkMiLz4KICA8cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiByeD0iOCIgZmlsbD0iI0UyRThGMCIvPgogIDxyZWN0IHg9IjgwIiB5PSI4MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIHJ4PSI0IiBmaWxsPSIjQ0JENUUwIi8+CiAgPHJlY3QgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiByeD0iNCIgZmlsbD0iI0EwQUVDMCIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEzMCIgcj0iMTUiIGZpbGw9IiM3MTgwOTYiLz4KICA8cmVjdCB4PSIxMzAiIHk9IjE1MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iIzcxODA5NiIvPgogIDxyZWN0IHg9IjEzMCIgeT0iMTY1IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjNzE4MDk2Ii8+CiAgPHJlY3QgeD0iMTMwIiB5PSIxNzUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiM3MTgwOTYiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcxODA5NiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+") {
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGN0ZBRkMiLz4KICA8cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiByeD0iOCIgZmlsbD0iI0UyRThGMCIvPgogIDxyZWN0IHg9IjgwIiB5PSI4MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIHJ4PSI0IiBmaWxsPSIjQ0JENUUwIi8+CiAgPHJlY3QgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiByeD0iNCIgZmlsbD0iI0EwQUVDMCIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEzMCIgcj0iMTUiIGZpbGw9IiM3MTgwOTYiLz4KICA8cmVjdCB4PSIxMzAiIHk9IjE1MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iIzcxODA5NiIvPgogIDxyZWN0IHg9IjEzMCIgeT0iMTY1IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjNzE4MDk2Ii8+CiAgPHJlY3QgeD0iMTMwIiB5PSIxNzUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiM3MTgwOTYiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcxODA5NiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+";
              }
            }}
          />

          {/* Boutons de navigation */}
          {pictures.length > 1 && (
            <>
              <IconButton
                aria-label="Image précédente"
                icon={<FaChevronLeft />}
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                variant="solid"
                colorScheme="blackAlpha"
                size="lg"
                onClick={goToPrevious}
                _hover={{ bg: "blackAlpha.600" }}
              />
              
              <IconButton
                aria-label="Image suivante"
                icon={<FaChevronRight />}
                position="absolute"
                right={4}
                top="50%"
                transform="translateY(-50%)"
                variant="solid"
                colorScheme="blackAlpha"
                size="lg"
                onClick={goToNext}
                _hover={{ bg: "blackAlpha.600" }}
              />
            </>
          )}
        </Box>

        {/* Miniatures */}
        {pictures.length > 1 && (
          <HStack gap={2} maxW="80vw" overflowX="auto" pb={2}>
            {pictures.map((picture, index) => (
              <Box
                key={picture.id}
                width="60px"
                height="60px"
                borderRadius="md"
                overflow="hidden"
                cursor="pointer"
                border={index === currentIndex ? "3px solid" : "1px solid"}
                borderColor={index === currentIndex ? "teal.400" : "whiteAlpha.300"}
                _hover={{ borderColor: "teal.300" }}
                onClick={() => setCurrentIndex(index)}
                flexShrink={0}
              >
                <Image
                  src={picture.url}
                  alt={`Miniature ${index + 1}`}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-hotel.svg";
                  }}
                />
              </Box>
            ))}
          </HStack>
        )}

        {/* Instructions */}
        <Text color="whiteAlpha.700" fontSize="sm" textAlign="center">
          Utilisez les flèches du clavier, les boutons ou glissez pour naviguer • Échap pour fermer
        </Text>
      </VStack>
    </Box>
  )
}
