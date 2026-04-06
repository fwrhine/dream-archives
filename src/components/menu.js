"use client";

import { Stack } from "@chakra-ui/react";
import MenuButton from "./buttons/MenuButton";

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
