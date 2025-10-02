"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HotelFormData } from "@/schemas/hotelSchema"
import { hotelApi } from "@/services/api"
import { toaster } from "@/components/ui/toaster"
import { HotelForm } from "@/components/hotels"

export default function CreateHotelPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (data: HotelFormData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await hotelApi.createHotel(data)
      
      toaster.create({
        title: "Succès",
        description: response.message || "Hôtel créé avec succès",
        type: "success",
        duration: 3000,
      })
      
      setTimeout(() => {
        router.push(`/hotels/${response.data.id}/edit`)
      }, 1500)
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Erreur lors de la création de l'hôtel"
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

  return (
    <HotelForm
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      submitText="Créer l'hôtel"
      loadingText="Création en cours..."
    />
  )
}