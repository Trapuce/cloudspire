"use client"

import {
  Box,
  VStack,
  HStack,
  Heading,
  Button,
  Image,
  IconButton,
  Badge,
  Flex,
  Card,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react"
import { useState } from "react"
import { HotelPicture } from "@/types/types"
import { FaTrash, FaUpload, FaGripVertical, FaImage } from "react-icons/fa"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

interface HotelPhotosManagerProps {
  hotelId: number
  pictures: HotelPicture[]
  onPicturesChange: (pictures: HotelPicture[]) => void
  onFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  onDeletePicture?: (pictureId: number) => Promise<void>
  onPictureReorder?: (draggedIndex: number, dropIndex: number) => Promise<void>
  uploading?: boolean
}

export function HotelPhotosManager({
  hotelId,
  pictures,
  onPicturesChange,
  onFileUpload,
  onDeletePicture,
  onPictureReorder,
  uploading = false,
}: HotelPhotosManagerProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    pictureId: number | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    pictureId: null,
    isLoading: false,
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    if (onFileUpload) {
      await onFileUpload(event)
    }

    event.target.value = ''
    setPreviewImage(null)
  }

  const handleDeletePicture = (pictureId: number) => {
    setConfirmDialog({
      isOpen: true,
      pictureId: pictureId,
      isLoading: false,
    });
  };

  const handleConfirmDeletePicture = async () => {
    if (!confirmDialog.pictureId) return;

    setConfirmDialog(prev => ({ ...prev, isLoading: true }));

    try {
      if (onDeletePicture) {
        await onDeletePicture(confirmDialog.pictureId)
      } else {
        onPicturesChange(pictures.filter(p => p.id !== confirmDialog.pictureId))
      }
      
      setConfirmDialog({
        isOpen: false,
        pictureId: null,
        isLoading: false,
      });
    } catch (err) {
      setConfirmDialog(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      pictureId: null,
      isLoading: false,
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    const draggedPicture = pictures[draggedIndex]
    if (!draggedPicture) {
      setDraggedIndex(null)
      return
    }

    try {
      const newPictures = [...pictures]
      const [movedPicture] = newPictures.splice(draggedIndex, 1)
      newPictures.splice(dropIndex, 0, movedPicture)
      onPicturesChange(newPictures)

      if (onPictureReorder) {
        await onPictureReorder(draggedIndex, dropIndex)
      }
    } catch (err) {
      onPicturesChange(pictures)
    } finally {
      setDraggedIndex(null)
    }
  }

  return (
    <>
      <Card.Root>
        <Card.Body>
          <VStack gap={4}>
            <Heading size="md">Ajouter une photo</Heading>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="photo-upload"
            />
            
            <Button
              as="label"
              htmlFor="photo-upload"
              colorScheme="teal"
              variant="outline"
              leftIcon={<FaUpload />}
              isLoading={uploading}
              loadingText="Upload en cours..."
              cursor="pointer"
            >
              Choisir une photo
            </Button>

            {previewImage && (
              <Box>
                <Image
                  src={previewImage}
                  alt="Aperçu"
                  maxH="200px"
                  borderRadius="md"
                />
              </Box>
            )}
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Liste des photos */}
      {pictures.length > 0 && (
        <Card.Root>
          <Card.Body>
            <VStack gap={4}>
              <Heading size="md">Photos de l'hôtel ({pictures.length})</Heading>
              
              <SimpleGrid columns={[1, 2, 3, 4]} gap={4} w="full">
                {pictures.map((picture, index) => (
                  <Box
                    key={picture.id}
                    position="relative"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.02)" }}
                    transition="transform 0.2s"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    opacity={draggedIndex === index ? 0.5 : 1}
                    cursor="move"
                  >
                    <Box height="150px" position="relative">
                      {picture.url ? (
                        <Image
                          src={picture.url}
                          alt={`Photo ${index + 1}`}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          onError={(e) => {
                            if (e.currentTarget.src !== "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGN0ZBRkMiLz4KICA8cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiByeD0iOCIgZmlsbD0iI0UyRThGMCIvPgogIDxyZWN0IHg9IjgwIiB5PSI4MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIHJ4PSI0IiBmaWxsPSIjQ0JENUUwIi8+CiAgPHJlY3QgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiByeD0iNCIgZmlsbD0iI0EwQUVDMCIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEzMCIgcj0iMTUiIGZpbGw9IiM3MTgwOTYiLz4KICA8cmVjdCB4PSIxMzAiIHk9IjE1MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iIzcxODA5NiIvPgogIDxyZWN0IHg9IjEzMCIgeT0iMTY1IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjNzE4MDk2Ii8+CiAgPHJlY3QgeD0iMTMwIiB5PSIxNzUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiM3MTgwOTYiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcxODA5NiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+") {
                              e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGN0ZBRkMiLz4KICA8cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiByeD0iOCIgZmlsbD0iI0UyRThGMCIvPgogIDxyZWN0IHg9IjgwIiB5PSI4MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIHJ4PSI0IiBmaWxsPSIjQ0JENUUwIi8+CiAgPHJlY3QgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiByeD0iNCIgZmlsbD0iI0EwQUVDMCIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEzMCIgcj0iMTUiIGZpbGw9IiM3MTgwOTYiLz4KICA8cmVjdCB4PSIxMzAiIHk9IjE1MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iIzcxODA5NiIvPgogIDxyZWN0IHg9IjEzMCIgeT0iMTY1IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjNzE4MDk2Ii8+CiAgPHJlY3QgeD0iMTMwIiB5PSIxNzUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiM3MTgwOTYiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcxODA5NiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+";
                            }
                          }}
                        />
                      ) : (
                        <VStack gap={2} alignItems="center" justifyContent="center" height="100%" bg="gray.100">
                          <FaImage size="40" color="gray.400" />
                          <Text fontSize="xs" color="gray.500" textAlign="center">
                            Photo {index + 1}
                          </Text>
                        </VStack>
                      )}
                      
                      <Box
                        position="absolute"
                        top={2}
                        left={2}
                        bg="white"
                        borderRadius="full"
                        p={1}
                        boxShadow="sm"
                      >
                        <FaGripVertical color="gray.500" />
                      </Box>
                      
                      <IconButton
                        position="absolute"
                        top={2}
                        right={2}
                        size="sm"
                        colorScheme="red"
                        variant="solid"
                        aria-label="Supprimer cette photo"
                        onClick={() => handleDeletePicture(picture.id)}
                      >
                        <FaTrash />
                      </IconButton>
                      
                      <Badge
                        position="absolute"
                        bottom={2}
                        left={2}
                        colorScheme="blue"
                        variant="solid"
                      >
                        {index + 1}
                      </Badge>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </Card.Body>
        </Card.Root>
      )}

      {/* Modal de confirmation de suppression de photo */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDeletePicture}
        title="Supprimer la photo"
        description="Êtes-vous sûr de vouloir supprimer cette photo ? Cette action est irréversible et la photo sera définitivement supprimée de votre hôtel."
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
        isLoading={confirmDialog.isLoading}
      />
    </>
  )
}
