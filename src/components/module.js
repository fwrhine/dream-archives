"use client";

import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";

export default function Module() {
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
          Central Node
        </Text>
        <Box flex="1" height="2px" bgColor="black" />
        <Text>✧</Text>
      </HStack>
      <Image src={"/images/modules/central_node.webp"} />
    </Stack>
  );
}
