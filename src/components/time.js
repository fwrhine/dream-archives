import { HStack, Image, Stack, Text } from "@chakra-ui/react";

export default function Time() {
  return (
    <Stack bgColor="white" padding={0} width="172px" gap={0}>
      <Stack padding={4} gap={0} paddingBottom={2} paddingRight={2}>
        <Text textAlign="right" fontWeight={"bold"} fontSize={"3xl"}>
          12:24
        </Text>
        <HStack alignItems="right" justifyContent="right">
          <Image src={"/images/moon.png"} height={"25px"} width={"25px"} />
          <Text textAlign="right" fontWeight={"bold"} fontSize={"xl"}>
            AM
          </Text>
        </HStack>
      </Stack>
      <Stack height="3px" bgColor="black" />
      <Stack padding={1} paddingRight={2}>
        <Text textAlign="right" fontWeight={"bold"}>
          2412-98
        </Text>
      </Stack>
    </Stack>
  );
}
