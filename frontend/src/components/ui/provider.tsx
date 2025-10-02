"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { NoSSR } from "./no-ssr"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <NoSSR>
        <ColorModeProvider {...props} />
      </NoSSR>
    </ChakraProvider>
  )
}
