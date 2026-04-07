import { Box, Stack, Text } from "@chakra-ui/react";

export default function MobileBlocked() {
  return (
    <Box
      w="100vw"
      h="100vh"
      bg="#232222"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={6}
    >
      <Stack gap={3}>
        <Text fontWeight="bold">Dream Archives</Text>
        <Text>This experience is not available on mobile.</Text>
        <Text fontSize="sm" opacity={0.6}>
          Please open on a larger screen.
        </Text>
      </Stack>
    </Box>
  );
}
