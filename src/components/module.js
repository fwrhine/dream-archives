"use client";

import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";

export default function Module() {
  return (
    <Stack
      border="2px solid black"
      gap={0}
      width="850px"
      position="absolute"
      top="32px"
      left="250px"
      boxShadow="3px 3px 0px rgba(0,0,0,0.77)"
    >
      <HStack
        bgColor="white"
        justifyContent={"center"}
        paddingLeft={2}
        paddingRight={2}
        border={"2px solid black"}
      >
        <Text>✧</Text>
        <Box flex="1" height="2px" bgColor="black" />
        <Text fontWeight={"bold"} textAlign={"center"} fontSize={"lg"}>
          Central Node
        </Text>
        <Box flex="1" height="2px" bgColor="black" />
        <Text>✧</Text>
      </HStack>
      <Image src={"/images/modules/central_node.webp"} width="850px" />
    </Stack>
  );
}
