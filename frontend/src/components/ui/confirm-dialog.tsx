"use client"

import {
  Dialog,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react"
import { FaExclamationTriangle, FaTrash, FaTimes } from "react-icons/fa"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  type?: "danger" | "warning" | "info"
  isLoading?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  type = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: FaExclamationTriangle,
          iconColor: "red.500",
          confirmColorScheme: "red",
          bg: "red.50",
          borderColor: "red.200",
        }
      case "warning":
        return {
          icon: FaExclamationTriangle,
          iconColor: "orange.500",
          confirmColorScheme: "orange",
          bg: "orange.50",
          borderColor: "orange.200",
        }
      case "info":
        return {
          icon: FaExclamationTriangle,
          iconColor: "blue.500",
          confirmColorScheme: "blue",
          bg: "blue.50",
          borderColor: "blue.200",
        }
      default:
        return {
          icon: FaExclamationTriangle,
          iconColor: "red.500",
          confirmColorScheme: "red",
          bg: "red.50",
          borderColor: "red.200",
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="md" mx="4">
          <Dialog.Header>
            <HStack gap={3}>
              <Icon
                as={styles.icon}
                color={styles.iconColor}
                boxSize="6"
              />
              <Text fontSize="lg" fontWeight="bold">
                {title}
              </Text>
            </HStack>
          </Dialog.Header>

          <Dialog.Body>
            <VStack gap={4} align="stretch">
              <Box
                p={4}
                bg={styles.bg}
                borderRadius="md"
                border="1px solid"
                borderColor={styles.borderColor}
              >
                <Text color="gray.700" lineHeight="1.6">
                  {description}
                </Text>
              </Box>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <HStack gap={3} justify="flex-end" w="full">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                leftIcon={<FaTimes />}
              >
                {cancelText}
              </Button>
              <Button
                colorScheme={styles.confirmColorScheme}
                onClick={onConfirm}
                isLoading={isLoading}
                loadingText="Suppression..."
                leftIcon={<FaTrash />}
              >
                {confirmText}
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
