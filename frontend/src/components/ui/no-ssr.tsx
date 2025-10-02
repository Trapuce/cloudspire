"use client"

import { ClientOnly } from "@chakra-ui/react"
import { ReactNode } from "react"

interface NoSSRProps {
  children: ReactNode
  fallback?: ReactNode
}

export function NoSSR({ children, fallback = null }: NoSSRProps) {
  return <ClientOnly fallback={fallback}>{children}</ClientOnly>
}
