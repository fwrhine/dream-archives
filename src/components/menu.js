"use client";

import { Button, Stack } from "@chakra-ui/react";

export default function Menu({ activeModule, onNavigate }) {
  return (
    <Stack width="140px">
      <MenuButton
        selected={activeModule === "centralNode" ? true : false}
        onClick={() => {
          onNavigate("centralNode");
        }}
      >
        Home
      </MenuButton>
      <MenuButton>Mainframe</MenuButton>
      <MenuButton>Archives</MenuButton>
      <MenuButton
        selected={activeModule === "observationDeck" ? true : false}
        onClick={() => {
          onNavigate("observationDeck");
        }}
      >
        Cupola
      </MenuButton>
      <MenuButton>About</MenuButton>
    </Stack>
  );
}

function MenuButton({ selected, children, ...buttonProps }) {
  return (
    <Button
      bgColor="white"
      color="black"
      border="2px solid black"
      borderRadius={0}
      paddingTop={7}
      paddingBottom={7}
      fontWeight={"bold"}
      fontSize={"lg"}
      className={selected && "manga-dots-dense border border-black"}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
