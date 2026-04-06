import { Flex, Stack, Text } from "@chakra-ui/react";
import TypewriterText from "./typewriter_text";

export default function Dialogue({ text, delay }) {
  return (
    <Stack
      flex={1}
      w="full"
      border="2px solid black"
      bgColor="white"
      gap={0}
      justifyContent={"space-between"}
      boxShadow="3px 3px 0px rgba(0,0,0,0.77)"
    >
      <Stack gap={0} flex="1" width="full">
        <Stack borderBottom="2px solid black" textAlign={"center"} padding={2}>
          <Text fontWeight="bold">???</Text>
        </Stack>
        <Flex width="full" flex="1" justifyContent={"space-between"}>
          <TypewriterText
            fontWeight="bold"
            padding={4}
            justifyContent="center"
            fontSize={"lg"}
            delay={delay && 1300}
          >
            {text}
          </TypewriterText>
          <Stack
            borderLeft="2px solid black"
            width="23px"
            alignSelf="stretch"
          />
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
