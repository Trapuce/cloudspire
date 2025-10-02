"use client"

import { HStack, IconButton } from "@chakra-ui/react"
import { FaTh, FaList } from "react-icons/fa"

interface ViewModeToggleProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {

  return (
    <HStack gap={1} border="1px solid" borderColor="gray.200" borderRadius="md" p={1}>
      <IconButton
        size="sm"
        aria-label="Affichage en grille"
        colorScheme={viewMode === "grid" ? "teal" : "gray"}
        variant={viewMode === "grid" ? "solid" : "ghost"}
        onClick={() => onViewModeChange("grid")}
        _focus={{
          boxShadow: "0 0 0 3px var(--chakra-colors-teal-200)"
        }}
      >
        <FaTh />
      </IconButton>
      <IconButton
        size="sm"
        aria-label="Affichage en liste"
        colorScheme={viewMode === "list" ? "teal" : "gray"}
        variant={viewMode === "list" ? "solid" : "ghost"}
        onClick={() => onViewModeChange("list")}
        _focus={{
          boxShadow: "0 0 0 3px var(--chakra-colors-teal-200)"
        }}
      >
        <FaList />
      </IconButton>
    </HStack>
  )
}
