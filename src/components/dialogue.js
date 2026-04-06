import { Flex, Stack, Text } from "@chakra-ui/react";

export default function Dialogue() {
  return (
    <Stack
      alignItems="top"
      position="absolute"
      left="200px"
      top="655px"
      border="2px solid black"
      bgColor="white"
      gap={0}
      width="980px"
      height="160px"
      justifyContent={"space-between"}
      boxShadow="3px 3px 0px rgba(0,0,0,0.77)"
    >
      <Stack gap={0} flex="1">
        <Stack borderBottom="2px solid black" textAlign={"center"}>
          <Text fontWeight="bold">???</Text>
        </Stack>
        <Flex width="full" flex="1" justifyContent={"space-between"}>
          <Text padding={4} justifyContent="center">
            Memory nodes stabilized . . . <br />
            Welcome back.
          </Text>
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
