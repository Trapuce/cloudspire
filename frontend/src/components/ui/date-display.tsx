"use client"

import { Text } from "@chakra-ui/react"
import { NoSSR } from "./no-ssr"

interface DateDisplayProps {
  dateString: string
  format?: "short" | "long"
}

export function DateDisplay({ dateString, format = "long" }: DateDisplayProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = format === "short" 
      ? { year: "numeric", month: "short", day: "numeric" }
      : { year: "numeric", month: "long", day: "numeric" }
    
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  return (
    <NoSSR fallback={<Text>Chargement...</Text>}>
      <Text>{formatDate(dateString)}</Text>
    </NoSSR>
  )
}
