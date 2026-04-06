"use client";

import { Button, Stack } from "@chakra-ui/react";

export default function Menu() {
  return (
    <Stack width="140px">
      <MenuButton selected>Home</MenuButton>
      <MenuButton>Mainframe</MenuButton>
      <MenuButton>Archives</MenuButton>
      <MenuButton>Cupola</MenuButton>
      <MenuButton>About</MenuButton>
    </Stack>
  );
}

function MenuButton({ selected, children }) {
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
    >
      {children}
    </Button>
  );
}
