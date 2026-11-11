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
        Node
      </MenuButton>
      <MenuButton
        selected={activeModule === "observationDeck" ? true : false}
        onClick={() => {
          onNavigate("observationDeck");
        }}
      >
        Cupola
      </MenuButton>
      <MenuButton
        selected={activeModule === "mainframeBay" ? true : false}
        onClick={() => {
          onNavigate("mainframeBay");
        }}
      >
        Mainframe
      </MenuButton>
      <MenuButton
        selected={activeModule === "archives" ? true : false}
        onClick={() => {
          onNavigate("archives");
        }}
      >
        Archives
      </MenuButton>
      {/* <MenuButton>Quarters</MenuButton> */}
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
