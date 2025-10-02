"use client"

import {
  Box,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  IconButton,
  Flex,
} from "@chakra-ui/react"
import { useState } from "react"
import { HotelPicture } from "@/types/types"
import { FaImage, FaExpand } from "react-icons/fa"
import { ImageViewer } from "@/components/hotels/ImageViewer"

interface HotelImageGalleryProps {
  pictures: HotelPicture[]
  hotelName: string
}

export function HotelImageGallery({ pictures, hotelName }: HotelImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsViewerOpen(true)
  }

  const handleCloseViewer = () => {
    setIsViewerOpen(false)
    setSelectedImageIndex(null)
  }

  if (!pictures || pictures.length === 0) {
    return (
      <Box
        borderRadius="xl"
        overflow="hidden"
        boxShadow="xl"
        height="500px"
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap={4}>
          <FaImage size="64" color="gray.400" />
          <Text fontSize="xl" color="gray.500">
            Aucune photo disponible
          </Text>
        </VStack>
      </Box>
    )
  }

  if (pictures.length === 1) {
    return (
      <>
        <Box
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
          height="500px"
          position="relative"
          _hover={{ transform: "scale(1.02)" }}
          transition="transform 0.3s ease"
          cursor="pointer"
          onClick={() => handleImageClick(0)}
        >
          <Image
            src={pictures[0].url}
            alt={hotelName}
            width="100%"
            height="100%"
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-hotel.svg";
            }}
          />
          <Box
            position="absolute"
            bottom={4}
            right={4}
            bg="blackAlpha.600"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="medium"
          >
            <HStack gap={2}>
              <FaExpand />
              <Text>Cliquez pour agrandir</Text>
            </HStack>
          </Box>
        </Box>

        {isViewerOpen && selectedImageIndex !== null && (
          <ImageViewer
            pictures={pictures}
            initialIndex={selectedImageIndex}
            onClose={handleCloseViewer}
            hotelName={hotelName}
          />
        )}
      </>
    )
  }

  if (pictures.length === 2) {
    return (
      <>
        <SimpleGrid columns={2} gap={4} height="500px">
          {pictures.map((picture, index) => (
            <Box
              key={picture.id}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="xl"
              position="relative"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease"
              cursor="pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={picture.url}
                alt={`${hotelName} - Photo ${index + 1}`}
                width="100%"
                height="100%"
                objectFit="cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-hotel.svg";
                }}
              />
              <Box
                position="absolute"
                bottom={3}
                right={3}
                bg="blackAlpha.600"
                color="white"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="medium"
              >
                {index + 1}
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {isViewerOpen && selectedImageIndex !== null && (
          <ImageViewer
            pictures={pictures}
            initialIndex={selectedImageIndex}
            onClose={handleCloseViewer}
            hotelName={hotelName}
          />
        )}
      </>
    )
  }

  if (pictures.length === 3) {
    return (
      <>
        <SimpleGrid columns={2} gap={4} height="500px">
          <Box
            gridRow="span 2"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
            position="relative"
            _hover={{ transform: "scale(1.02)" }}
            transition="transform 0.3s ease"
            cursor="pointer"
            onClick={() => handleImageClick(0)}
          >
            <Image
              src={pictures[0].url}
              alt={`${hotelName} - Photo 1`}
              width="100%"
              height="100%"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-hotel.svg";
              }}
            />
            <Box
              position="absolute"
              bottom={3}
              right={3}
              bg="blackAlpha.600"
              color="white"
              px={2}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="medium"
            >
              1
            </Box>
          </Box>
          
          {pictures.slice(1, 3).map((picture, index) => (
            <Box
              key={picture.id}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="xl"
              position="relative"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease"
              cursor="pointer"
              onClick={() => handleImageClick(index + 1)}
            >
              <Image
                src={picture.url}
                alt={`${hotelName} - Photo ${index + 2}`}
                width="100%"
                height="100%"
                objectFit="cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-hotel.svg";
                }}
              />
              <Box
                position="absolute"
                bottom={3}
                right={3}
                bg="blackAlpha.600"
                color="white"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="medium"
              >
                {index + 2}
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {isViewerOpen && selectedImageIndex !== null && (
          <ImageViewer
            pictures={pictures}
            initialIndex={selectedImageIndex}
            onClose={handleCloseViewer}
            hotelName={hotelName}
          />
        )}
      </>
    )
  }

  return (
    <>
      <SimpleGrid columns={2} gap={4} height="500px">
        <Box
          gridRow="span 2"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
          position="relative"
          _hover={{ transform: "scale(1.02)" }}
          transition="transform 0.3s ease"
          cursor="pointer"
          onClick={() => handleImageClick(0)}
        >
          <Image
            src={pictures[0].url}
            alt={`${hotelName} - Photo 1`}
            width="100%"
            height="100%"
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-hotel.svg";
            }}
          />
          <Box
            position="absolute"
            bottom={3}
            right={3}
            bg="blackAlpha.600"
            color="white"
            px={2}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="medium"
          >
            1
          </Box>
        </Box>
        
        {pictures.slice(1, 3).map((picture, index) => (
          <Box
            key={picture.id}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
            position="relative"
            _hover={{ transform: "scale(1.02)" }}
            transition="transform 0.3s ease"
            cursor="pointer"
            onClick={() => handleImageClick(index + 1)}
          >
            <Image
              src={picture.url}
              alt={`${hotelName} - Photo ${index + 2}`}
              width="100%"
              height="100%"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-hotel.svg";
              }}
            />
            <Box
              position="absolute"
              bottom={3}
              right={3}
              bg="blackAlpha.600"
              color="white"
              px={2}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="medium"
            >
              {index + 2}
            </Box>
          </Box>
        ))}
        
        {pictures.length > 3 && (
          <Box
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
            position="relative"
            _hover={{ transform: "scale(1.02)" }}
            transition="transform 0.3s ease"
            cursor="pointer"
            onClick={() => handleImageClick(3)}
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <VStack gap={2}>
              <Image
                src={pictures[3].url}
                alt={`${hotelName} - Photo 4`}
                width="100%"
                height="100%"
                objectFit="cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-hotel.svg";
                }}
              />
              {pictures.length > 4 && (
                <Box
                  position="absolute"
                  inset={0}
                  bg="blackAlpha.600"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white" fontSize="lg" fontWeight="bold">
                    +{pictures.length - 4} autres
                  </Text>
                </Box>
              )}
            </VStack>
            <Box
              position="absolute"
              bottom={3}
              right={3}
              bg="blackAlpha.600"
              color="white"
              px={2}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="medium"
            >
              {pictures.length > 4 ? `+${pictures.length - 3}` : "4"}
            </Box>
          </Box>
        )}
      </SimpleGrid>

      {isViewerOpen && selectedImageIndex !== null && (
        <ImageViewer
          pictures={pictures}
          initialIndex={selectedImageIndex}
          onClose={handleCloseViewer}
          hotelName={hotelName}
        />
      )}
    </>
  )
}
