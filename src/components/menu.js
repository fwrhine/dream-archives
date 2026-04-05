"use client";

import { Button, Stack } from "@chakra-ui/react";
import MenuButton from "./buttons/MenuButton";

export default function Menu() {
  return (
    <Stack>
      <MenuButton selected>Home</MenuButton>
      <MenuButton>Mainframe</MenuButton>
      <MenuButton>Archives</MenuButton>
      <MenuButton>Cupola</MenuButton>
      <MenuButton>About</MenuButton>
    </Stack>
  );
}
