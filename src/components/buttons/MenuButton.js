"use client";

import { Button } from "@chakra-ui/react";

export default function MenuButton({ selected, children }) {
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
