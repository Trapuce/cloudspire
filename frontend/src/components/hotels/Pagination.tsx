"use client"

import { Flex, Button, Text } from "@chakra-ui/react"
import { PaginatedResponse } from "@/types/types"

interface PaginationProps {
  data: PaginatedResponse<any>
  currentPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ data, currentPage, onPageChange }: PaginationProps) {
  const renderPaginationButtons = () => {
    const buttons = []
    const totalPages = data.meta.last_page
    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, currentPage + 2)

    if (currentPage > 1) {
      buttons.push(
        <Button
          key="prev"
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Précédent
        </Button>
      )
    }

    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          size="sm"
          variant="outline"
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      )
      if (startPage > 2) {
        buttons.push(
          <Text key="ellipsis1" px={2} color="gray.500">
            ...
          </Text>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          size="sm"
          variant={i === currentPage ? "solid" : "outline"}
          colorScheme={i === currentPage ? "teal" : "gray"}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <Text key="ellipsis2" px={2} color="gray.500">
            ...
          </Text>
        )
      }
      buttons.push(
        <Button
          key={totalPages}
          size="sm"
          variant="outline"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      )
    }

    if (currentPage < totalPages) {
      buttons.push(
        <Button
          key="next"
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Suivant
        </Button>
      )
    }

    return buttons
  }

  if (!data.meta || data.meta.last_page <= 1) {
    return null
  }

  return (
    <Flex justify="center" mt={6} gap={2}>
      {renderPaginationButtons()}
    </Flex>
  )
}
