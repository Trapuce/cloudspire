"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Spinner, Text } from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/hotels");
  }, [router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={4}
    >
      <Spinner size="xl" color="brand.500" />
      <Text>Redirecting to hotels...</Text>
    </Box>
  );
}
