import { Flex, Image, Span, Stack, Text } from "@chakra-ui/react";

export default function StarFragment() {
  return (
    <Stack
      alignItems="top"
      position="absolute"
      right="-10px"
      top="210px"
      border="2px solid black"
      bgColor="white"
      gap={0}
      width="250px"
      justifyContent={"space-between"}
      boxShadow="3px 3px 0px rgba(0,0,0,0.77)"
    >
      <Stack gap={0} flex="1">
        <Stack borderBottom="2px solid black" textAlign={"center"} padding={2}>
          <Text fontWeight={"bold"}>Dream Archives</Text>
        </Stack>
        <Flex width="full" flex="1" justifyContent={"space-between"}>
          <Stack
            className={"manga-dots manga-dots-pale border border-black"}
            flex={1}
            padding={3}
            paddingBottom={2}
            gap={4}
          >
            <Stack padding={2}>
              <Image src={"/images/star_fragment.webp"} />
            </Stack>
            <Text fontSize="15px" fontWeight={"bold"}>
              <Span color="#1916CD">&gt;</Span> Dream cache{" "}
              <Span color="#1916CD">67%</Span> full
            </Text>
          </Stack>
          <Stack borderLeft="2px solid black" width="23px" />
        </Flex>
      </Stack>
      <Stack
        borderTop="2px solid black"
        height="23px"
        width="full"
        alignItems="flex-end"
      >
        <Stack borderLeft="2px solid black" width="23px" height="23px" />
      </Stack>
    </Stack>
  );
}
