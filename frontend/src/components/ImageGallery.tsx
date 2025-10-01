"use client"

import { useState } from "react"
import {
  Box,
  Image,
  SimpleGrid,
  IconButton,
  Text,
  VStack,
  For,
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import type { HotelPicture } from "@/types/hotel"

interface ImageGalleryProps {
  pictures: HotelPicture[]
  hotelName: string
}

export default function ImageGallery({ pictures, hotelName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % pictures.length)
  }

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + pictures.length) % pictures.length)
  }

  if (!pictures || pictures.length === 0) {
    return (
      <Box
        bg="gray.100"
        borderRadius="lg"
        p={8}
        textAlign="center"
        minH="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="gray.500">No photos available</Text>
      </Box>
    )
  }

  return (
    <>
      <VStack gap={4}>
        {/* Main Image */}
        <Box aspectRatio="16/9" w="100%" position="relative">
          <Image
            src={pictures[selectedIndex]?.url || "/placeholder.svg"}
            alt={hotelName}
            objectFit="cover"
            borderRadius="lg"
            cursor="pointer"
            onClick={() => openModal(selectedIndex)}
            _hover={{ opacity: 0.9 }}
            transition="opacity 0.2s"
            w="100%"
            h="100%"
          />
        </Box>

        {/* Thumbnail Grid */}
        {pictures.length > 1 && (
          <SimpleGrid columns={{ base: 4, md: 6 }} gap={2} w="100%">
            <For each={pictures}>
              {(picture, index) => (
                <Box key={picture.id} aspectRatio="1" position="relative">
                  <Image
                    src={picture.url || "/placeholder.svg"}
                    alt={`${hotelName} ${index + 1}`}
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                    border={selectedIndex === index ? "3px solid" : "1px solid"}
                    borderColor={selectedIndex === index ? "blue.500" : "gray.200"}
                    onClick={() => setSelectedIndex(index)}
                    _hover={{ opacity: 0.8 }}
                    transition="opacity 0.2s"
                    w="100%"
                    h="100%"
                  />
                </Box>
              )}
            </For>
          </SimpleGrid>
        )}
      </VStack>

      <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} size="full">
        <DialogContent>
          <DialogCloseTrigger />
          <DialogBody p={0}>
            <Box position="relative" h="90vh" display="flex" alignItems="center" justifyContent="center">
              <Image
                src={pictures[selectedIndex]?.url || "/placeholder.svg"}
                alt={hotelName}
                maxH="100%"
                maxW="100%"
                objectFit="contain"
              />

              {pictures.length > 1 && (
                <>
                  <IconButton
                    aria-label="Previous image"
                    position="absolute"
                    left={4}
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={prevImage}
                    colorPalette="gray"
                    variant="solid"
                    size="lg"
                  >
                    <LuChevronLeft />
                  </IconButton>
                  <IconButton
                    aria-label="Next image"
                    position="absolute"
                    right={4}
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={nextImage}
                    colorPalette="gray"
                    variant="solid"
                    size="lg"
                  >
                    <LuChevronRight />
                  </IconButton>
                </>
              )}

              <Box
                position="absolute"
                bottom={4}
                left="50%"
                transform="translateX(-50%)"
                bg="blackAlpha.600"
                color="white"
                px={3}
                py={1}
                borderRadius="md"
              >
                <Text fontSize="sm">
                  {selectedIndex + 1} / {pictures.length}
                </Text>
              </Box>
            </Box>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  )
}
