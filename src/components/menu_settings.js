"use client";

import { Button, HStack, Icon } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";
import { TbHelp } from "react-icons/tb";

export default function MenuSettings() {
  return (
    <HStack alignItems="top">
      <ButtonSettings>
        <Icon as={VscSettings} boxSize="24px" />
      </ButtonSettings>
      <ButtonSettings>
        <Icon as={TbHelp} boxSize="24px" />
      </ButtonSettings>
    </HStack>
  );
}

function ButtonSettings({ children }) {
  return (
    <Button
      bgColor="white"
      color="black"
      height="55px"
      width="55px"
      borderRadius={0}
      border="2px solid black"
    >
      {children}
    </Button>
  );
}
