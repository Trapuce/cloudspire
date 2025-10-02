"use client"

import {
  Box,
  Container,
  Spinner,
  Alert,
  Flex,
  VStack,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { hotelApi } from "@/services/api"
import { Hotel } from "@/types/types"
import { toaster } from "@/components/ui/toaster"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { HotelInfoCard, HotelImageGallery } from "@/components/hotels"

export default function HotelDetailPage() {
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    hotel: Hotel | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    hotel: null,
    isLoading: false,
  });

  const router = useRouter()
  const params = useParams()
  const hotelId = parseInt(params.id as string)

  const fetchHotel = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await hotelApi.getHotel(hotelId)
      setHotel(response.data)
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
      fetchHotel()
    }
  }, [hotelId])

  const handleEdit = (hotel: Hotel) => {
    router.push(`/hotels/${hotel.id}/edit`)
  }

  const handleDelete = (hotel: Hotel) => {
    setConfirmDialog({
      isOpen: true,
      hotel: hotel,
      isLoading: false,
    })
  }

  const handleConfirmDelete = async () => {
    if (!confirmDialog.hotel) return

    setConfirmDialog(prev => ({ ...prev, isLoading: true }))

    try {
      await hotelApi.deleteHotel(confirmDialog.hotel.id)
      
      toaster.create({
        title: "Succès",
        description: "Hôtel supprimé avec succès",
        type: "success",
        duration: 4000,
      })

      router.push("/hotels")
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error)
      const errorMessage = error?.response?.data?.message || error?.message || "Erreur lors de la suppression"
      toaster.create({
        title: "Erreur",
        description: errorMessage,
        type: "error",
        duration: 5000,
      })
      
      setConfirmDialog(prev => ({ ...prev, isLoading: false }))
    }
  }

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      hotel: null,
      isLoading: false,
    })
  }

  const handleBack = () => {
    router.push("/hotels")
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Flex justify="center" align="center" minH="400px">
          <VStack gap={4}>
            <Spinner size="lg" color="teal.500" />
            <Box>Chargement des détails de l'hôtel...</Box>
          </VStack>
        </Flex>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Erreur!</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Container>
    )
  }

  if (!hotel) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert.Root status="warning">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Hôtel non trouvé</Alert.Title>
            <Alert.Description>L'hôtel demandé n'existe pas ou a été supprimé.</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      {/* Layout responsive */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={8}
        align="flex-start"
      >
        {/* Galerie d'images - à gauche sur desktop, en haut sur mobile */}
        <Box
          order={{ base: 1, lg: 1 }}
          flex={{ base: "1", lg: "1.2" }}
          minW={0} // Permet au contenu de se rétrécir
        >
          <HotelImageGallery
            pictures={hotel.pictures || []}
            hotelName={hotel.name}
          />
        </Box>

        {/* Informations de l'hôtel - à droite sur desktop, en bas sur mobile */}
        <Box
          order={{ base: 2, lg: 2 }}
          flex={{ base: "1", lg: "0.8" }}
          minW={{ base: "100%", lg: "400px" }}
        >
          <HotelInfoCard
            hotel={hotel}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBack={handleBack}
          />
        </Box>
      </Flex>

      {/* Modal de confirmation de suppression */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDelete}
        title="Supprimer l'hôtel"
        description={`Êtes-vous sûr de vouloir supprimer l'hôtel "${confirmDialog.hotel?.name}" ? Cette action est irréversible et supprimera définitivement toutes les données associées à cet hôtel.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
        isLoading={confirmDialog.isLoading}
      />
    </Container>
  )
}