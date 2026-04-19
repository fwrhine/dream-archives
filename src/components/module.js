"use client";

import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import SpaceBackdrop from "./space_backdrop";

export default function Module({
  module,
  onHotspotClick,
  overlay = null,
  debug = false,
}) {
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
        <SpaceBackdrop />
        {module.id === "cupola" && (
          <Box
            position="absolute"
            inset={0}
            bg="black"
            zIndex={0}
            overflow="hidden"
            pointerEvents="none"
          >
            <Box
              as="img"
              src="/images/cupola_space.webp"
              alt="Cupola backdrop"
              position="absolute"
              objectFit="cover"
              pointerEvents="none"
              className="spaceBackdrop"
            />
          </Box>
        )}

        <Image
          src={module.image}
          alt={module.title}
          position="relative"
          zIndex={1}
        />

        {overlay}

        {module.hotspots?.flatMap((spot) =>
          (spot.regions ?? [spot]).map((region, i) => (
            <Box
              key={`${spot.id}-${i}`}
              as="button"
              position="absolute"
              left={`${region.x}px`}
              top={`${region.y}px`}
              width={`${region.width}px`}
              height={`${region.height}px`}
              onClick={() => onHotspotClick(spot)}
              cursor="pointer"
              aria-label={spot.id}
              // DEBUG MODE
              bg={debug ? "rgba(255,0,0,0.2)" : "transparent"}
              border={debug ? "1px solid red" : "none"}
              zIndex={2}
            />
          )),
        )}
      </Box>
    </Stack>
  );
}
