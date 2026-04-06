"use client";

import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";

export default function Module({ module, onHotspotClick, debug = false }) {
  return (
    <Stack
      border="2px solid black"
      w="95%"
      gap={0}
      boxShadow="3px 3px 0px rgba(0,0,0,0.77)"
    >
      <HStack
        bgColor="white"
        justifyContent={"center"}
        border={"2px solid black"}
        padding={2}
      >
        <Text>✧</Text>
        <Box flex="1" height="2px" bgColor="black" />
        <Text fontWeight={"bold"} textAlign={"center"} fontSize={"lg"}>
          {module.title}
        </Text>
        <Box flex="1" height="2px" bgColor="black" />
        <Text>✧</Text>
      </HStack>

      <Box position="relative">
        <Image src={module.image} alt={module.title} />

        {module.hotspots?.map((spot) => (
          <Box
            key={spot.id}
            as="button"
            position="absolute"
            left={`${spot.x}px`}
            top={`${spot.y}px`}
            width={`${spot.width}px`}
            height={`${spot.height}px`}
            onClick={() => onHotspotClick(spot)}
            cursor="pointer"
            aria-label={spot.id}
            // DEBUG MODE
            bg={debug ? "rgba(255,0,0,0.2)" : "transparent"}
            border={debug ? "1px solid red" : "none"}
          />
        ))}
      </Box>
    </Stack>
  );
}
