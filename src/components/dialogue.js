import { Flex, Stack, Text } from "@chakra-ui/react";
import TypewriterText from "./typewriter_text";
import { useState } from "react";

export default function Dialogue() {
  const dialogues = ["Memory nodes stabilized . . . \nWelcome back."];

  const [currentText, setCurrentText] = useState(0);

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
          >
            {dialogues[currentText]}
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
