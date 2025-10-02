"use client"
import { Box, Spinner ,Text} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
