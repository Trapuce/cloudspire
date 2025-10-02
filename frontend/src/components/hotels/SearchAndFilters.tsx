"use client"

import {
  Flex,
  InputGroup,
  Input,
  HStack,
  NativeSelect,
} from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"
import { ViewModeToggle } from "./ViewModeToggle"

interface SearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  sortBy: string
  sortOrder: "asc" | "desc"
  onSortChange: (field: string, order: "asc" | "desc") => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortChange,
  viewMode,
  onViewModeChange,
}: SearchAndFiltersProps) {
  return (
    <Flex gap={4} mb={6} wrap="wrap">
      <InputGroup maxW="300px">
        <Input
          placeholder="Recherche par nom ou ville..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Rechercher un hôtel par nom, ville ou pays"
          _focus={{
            borderColor: "teal.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)"
          }}
        />
      </InputGroup>

      <HStack gap={4}>
        <NativeSelect.Root size="sm" width="150px">
          <NativeSelect.Field
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split("-")
              onSortChange(field, order as "asc" | "desc")
            }}
            aria-label="Trier les hôtels par"
            _focus={{
              borderColor: "teal.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)"
            }}
          >
            <option value="name-asc">Nom A-Z</option>
            <option value="name-desc">Nom Z-A</option>
            <option value="price_per_night-asc">Prix croissant</option>
            <option value="price_per_night-desc">Prix décroissant</option>
            <option value="max_capacity-asc">Capacité croissante</option>
            <option value="max_capacity-desc">Capacité décroissante</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </HStack>
    </Flex>
  )
}
