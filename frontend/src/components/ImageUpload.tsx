"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  IconButton,
  SimpleGrid,
  Badge,
  Flex,
  Spinner,
  For,
} from "@chakra-ui/react"
import { Toaster, createToaster } from "@chakra-ui/react"
import { LuPlus, LuTrash2 } from "react-icons/lu"
import { hotelApi } from "@/services/api"

const toaster = createToaster({
  placement: "top-end",
  duration: 3000,
})

interface ImageFile {
  file: File
  preview: string
  id: string
  uploading?: boolean
  uploaded?: boolean
  error?: string
}

interface ImageUploadProps {
  hotelId: number
  onUploadComplete: () => void
  maxFiles?: number
  multiple?: boolean
}

export default function ImageUpload({ hotelId, onUploadComplete, maxFiles = 10, multiple = true }: ImageUploadProps) {
  const [files, setFiles] = useState<ImageFile[]>([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: ImageFile[] = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      }))

      setFiles((prev) => {
        const updated = [...prev, ...newFiles]
        return updated.slice(0, maxFiles)
      })
    },
    [maxFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5 * 1024 * 1024,
    multiple,
  })

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    const filesToUpload = files.filter((f) => !f.uploaded && !f.uploading)

    try {
      if (filesToUpload.length === 1 && !multiple) {
        const file = filesToUpload[0]
        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, uploading: true } : f)))

        await hotelApi.uploadPicture(hotelId, file.file)

        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, uploading: false, uploaded: true } : f)))
      } else {
        const fileList = filesToUpload.map((f) => f.file)

        setFiles((prev) =>
          prev.map((f) => (filesToUpload.some((uf) => uf.id === f.id) ? { ...f, uploading: true } : f)),
        )

        await hotelApi.uploadMultiplePictures(hotelId, fileList)

        setFiles((prev) =>
          prev.map((f) =>
            filesToUpload.some((uf) => uf.id === f.id) ? { ...f, uploading: false, uploaded: true } : f,
          ),
        )
      }

      toaster.create({
        title: "Images uploaded successfully",
        type: "success",
      })

      onUploadComplete()
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          filesToUpload.some((uf) => uf.id === f.id) ? { ...f, uploading: false, error: "Upload failed" } : f,
        ),
      )

      toaster.create({
        title: "Upload failed",
        description: "Please try again",
        type: "error",
      })
    } finally {
      setUploading(false)
    }
  }

  const clearAll = () => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
  }

  const uploadedCount = files.filter((f) => f.uploaded).length
  const uploadingCount = files.filter((f) => f.uploading).length

  return (
    <>
      <Toaster toaster={toaster} />
      <VStack gap={4} align="stretch">
        <Box
          {...getRootProps()}
          p={8}
          border="2px dashed"
          borderColor={isDragActive ? "blue.500" : "gray.300"}
          borderRadius="lg"
          bg={isDragActive ? "blue.50" : "gray.50"}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ borderColor: "blue.400", bg: "blue.50" }}
        >
          <input {...getInputProps()} />
          <VStack gap={2}>
            <Box color="blue.500">
              <LuPlus size={32} />
            </Box>
            <Text textAlign="center" fontWeight="medium">
              {isDragActive ? "Drop the images here..." : "Drag & drop images here, or click to select"}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Supports JPEG, PNG, WebP (max 5MB each, up to {maxFiles} files)
            </Text>
          </VStack>
        </Box>

        {files.length > 0 && (
          <VStack gap={4} align="stretch">
            <Flex justify="space-between" align="center">
              <HStack gap={2}>
                <Text fontWeight="semibold">
                  Selected Images ({files.length}/{maxFiles})
                </Text>
                {uploadedCount > 0 && <Badge colorPalette="green">{uploadedCount} uploaded</Badge>}
                {uploadingCount > 0 && <Badge colorPalette="blue">{uploadingCount} uploading</Badge>}
              </HStack>
              <Button size="sm" variant="ghost" onClick={clearAll}>
                Clear All
              </Button>
            </Flex>

            <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} gap={4}>
              <For each={files}>
                {(file) => (
                  <Box key={file.id} position="relative">
                    <Box aspectRatio="1" position="relative">
                      <Image
                        src={file.preview || "/placeholder.svg"}
                        alt={file.file.name}
                        objectFit="cover"
                        borderRadius="md"
                        opacity={file.uploading ? 0.7 : 1}
                        w="100%"
                        h="100%"
                      />

                      {file.uploading && (
                        <Box
                          position="absolute"
                          top={2}
                          right={2}
                          bg="blue.500"
                          color="white"
                          borderRadius="full"
                          p={1}
                        >
                          <Spinner size="xs" />
                        </Box>
                      )}

                      {file.uploaded && (
                        <Box
                          position="absolute"
                          top={2}
                          right={2}
                          bg="green.500"
                          color="white"
                          borderRadius="full"
                          p={2}
                        >
                          <Text fontSize="xs">✓</Text>
                        </Box>
                      )}

                      {file.error && (
                        <Box position="absolute" top={2} right={2} bg="red.500" color="white" borderRadius="full" p={2}>
                          <Text fontSize="xs">✗</Text>
                        </Box>
                      )}

                      <Box
                        position="absolute"
                        bottom={2}
                        right={2}
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        transition="opacity 0.2s"
                      >
                        <IconButton
                          aria-label="Remove image"
                          size="xs"
                          colorPalette="red"
                          onClick={() => removeFile(file.id)}
                        >
                          <LuTrash2 />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box mt={1}>
                      <Text fontSize="xs" truncate title={file.file.name}>
                        {file.file.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    </Box>
                  </Box>
                )}
              </For>
            </SimpleGrid>

            <HStack justify="flex-end" gap={4}>
              <Button
                onClick={uploadFiles}
                colorPalette="blue"
                loading={uploading}
                loadingText="Uploading..."
                disabled={files.length === 0 || uploading}
              >
                Upload {files.length} Image{files.length !== 1 ? "s" : ""}
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </>
  )
}
