"use client"

import {
  Box,
  Heading,
  VStack,
  Spinner,
  Alert,
  Text,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { HotelFormData } from "@/schemas/hotelSchema"
import { hotelApi } from "@/services/api"
import { Hotel, HotelPicture } from "@/types/types"
import { toaster } from "@/components/ui/toaster"
import { HotelForm, HotelPhotosManager } from "@/components/hotels"

export default function EditHotelPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [pictures, setPictures] = useState<HotelPicture[]>([])
  const [uploading, setUploading] = useState(false)
  
  const router = useRouter()
  const params = useParams()
  const hotelId = parseInt(params.id as string)

  const fetchHotelData = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("Chargement des données de l'hôtel...", { hotelId })
      
      const response = await hotelApi.getHotel(hotelId)
      const hotelData = response.data
      
      console.log("Données hôtel chargées:", hotelData)
      console.log("Photos chargées:", hotelData.pictures?.length || 0)
      
      setHotel(hotelData)
      setPictures(hotelData.pictures || [])
    } catch (err: any) {
      console.error("Erreur chargement hôtel:", err)
      const errorMessage = err?.response?.data?.message || err?.message || "Erreur lors du chargement de l'hôtel"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hotelId) {
      fetchHotelData()
    }
  }, [hotelId])

  const onSubmit = async (data: HotelFormData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await hotelApi.updateHotel(hotelId, data)
      setHotel(response.data)
      toaster.create({
        title: "Succès",
        description: response.message || "Hôtel mis à jour avec succès",
        type: "success",
        duration: 4000,
      })
      router.push(`/hotels/${hotelId}`)
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Erreur lors de la mise à jour"
      setError(errorMessage)
      toaster.create({
        title: "Erreur",
        description: errorMessage,
        type: "error",
        duration: 6000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Validation du fichier
    if (!file.type.startsWith('image/')) {
      toaster.create({
        title: "Format non supporté",
        description: "Veuillez sélectionner un fichier image (JPG, PNG, GIF, WebP)",
        type: "error",
        duration: 5000,
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      toaster.create({
        title: "Fichier trop volumineux",
        description: "La taille maximale autorisée est de 10MB. Veuillez choisir un fichier plus petit.",
        type: "error",
        duration: 5000,
      })
      return
    }

    try {
      setUploading(true)
      console.log("Upload en cours...", {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        hotelId: hotelId
      })

      const response = await hotelApi.uploadPicture(hotelId, file)
      console.log("Upload réussi:", response)
      
      if (response && response.data) {
        setPictures(prev => [...prev, response.data])
        toaster.create({
          title: "Succès",
          description: response.message || "Photo ajoutée avec succès",
          type: "success",
          duration: 4000,
        })
      } else {
        console.warn("Réponse API inattendue:", response)
        await fetchHotelData()
        toaster.create({
          title: "Succès",
          description: "Photo ajoutée avec succès",
          type: "success",
          duration: 4000,
        })
      }
      
      event.target.value = ''
    } catch (err: any) {
      console.error("Erreur upload:", err)
      
      const errorMessage = err?.response?.data?.message || err?.message || "Erreur lors de l'upload de la photo"
      
      toaster.create({
        title: "Erreur",
        description: errorMessage,
        type: "error",
        duration: 6000,
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeletePicture = async (pictureId: number) => {
    try {
      await hotelApi.deletePicture(hotelId, pictureId)
      setPictures(prev => prev.filter(p => p.id !== pictureId))
      
      toaster.create({
        title: "Succès",
        description: "Photo supprimée avec succès",
        type: "success",
        duration: 4000,
      })
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Erreur lors de la suppression de la photo"
      toaster.create({
        title: "Erreur",
        description: errorMessage,
        type: "error",
        duration: 5000,
      })
    }
  }

  const handlePicturesChange = (newPictures: HotelPicture[]) => {
    setPictures(newPictures)
  }

  const handlePictureReorder = async (draggedIndex: number, dropIndex: number) => {
    const draggedPicture = pictures[draggedIndex]
    if (!draggedPicture) return

    try {
      await hotelApi.updatePicturePosition(hotelId, draggedPicture.id, dropIndex + 1)
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Erreur lors du changement d'ordre"
      toaster.create({
        title: "Erreur",
        description: errorMessage,
        type: "error",
        duration: 4000,
      })
    }
  }

  if (loading && !hotel) {
    return (
      <Box maxW="800px" mx="auto" mt={10} p={6}>
        <VStack gap={4}>
          <Spinner size="lg" color="teal.500" />
          <Text>Chargement des données de l'hôtel...</Text>
        </VStack>
      </Box>
    )
  }

  if (error && !hotel) {
    return (
      <Box maxW="800px" mx="auto" mt={10} p={6}>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Erreur!</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Box>
    )
  }

  if (!hotel) {
    return (
      <Box maxW="800px" mx="auto" mt={10} p={6}>
        <Text>Hôtel non trouvé</Text>
      </Box>
    )
  }

  const initialFormData: Partial<HotelFormData> = {
    name: hotel.name,
    description: hotel.description || "",
    address1: hotel.address1,
    address2: hotel.address2 || "",
    zipcode: hotel.zipcode,
    city: hotel.city,
    country: hotel.country,
    lat: hotel.lat ? parseFloat(hotel.lat) : undefined,
    lng: hotel.lng ? parseFloat(hotel.lng) : undefined,
    max_capacity: hotel.max_capacity,
    price_per_night: parseFloat(hotel.price_per_night),
  }

  return (
    <Box maxW="1000px" mx="auto" mt={10} p={6}>
      <Heading size="lg" mb={6}>
        Modifier l'hôtel: {hotel.name}
      </Heading>

      <VStack gap={8} align="stretch">
        {/* Formulaire d'édition */}
        <HotelForm
          initialData={initialFormData}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
          submitText="Mettre à jour"
          loadingText="Mise à jour en cours..."
        />

        {/* Gestion des photos */}
        <VStack gap={4} align="stretch">
          <Heading size="md">Gestion des photos</Heading>
          
          <HotelPhotosManager
            hotelId={hotelId}
            pictures={pictures}
            onPicturesChange={handlePicturesChange}
            onFileUpload={handleFileUpload}
            onDeletePicture={handleDeletePicture}
            onPictureReorder={handlePictureReorder}
            uploading={uploading}
          />
        </VStack>
      </VStack>
    </Box>
  )
}