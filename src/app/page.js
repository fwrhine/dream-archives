"use client";

import { useEffect, useState } from "react";
import Time from "@/components/time";
import Menu from "@/components/menu";
import MenuSettings from "@/components/menu_settings";
import Module from "@/components/module";
import { Box, HStack, Stack } from "@chakra-ui/react";
import Dialogue from "@/components/dialogue";
import StarFragment from "@/components/star_fragment";

const DESIGN_WIDTH = 1536;
const DESIGN_HEIGHT = 1022;

export default function Home() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / DESIGN_WIDTH;
      const scaleY = window.innerHeight / DESIGN_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <Box
      w="100vw"
      h="100vh"
      overflow="hidden"
      position="relative"
      bgColor="#232222"
      fontFamily={"Reddit Mono Variable"}
    >
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      >
        <Box
          width={`${DESIGN_WIDTH}px`}
          height={`${DESIGN_HEIGHT}px`}
          transform={`scale(${scale})`}
          transformOrigin="center center"
          position="relative"
        >
          <HStack height="full" alignItems="flex-start" gap={3} padding={10}>
            <Stack width="200px" alignItems="flex-end" flexShrink={0}>
              <Time />
              <Menu />
            </Stack>
            <HStack
              flex="1"
              height="full"
              position="relative"
              justifyContent="space-between"
              alignItems="flex-start"
              gap={0}
            >
              <Stack flex={1} height="full" minH={0}>
                <Module />
                <Box flex="1" minH={0} display="flex">
                  <Dialogue />
                </Box>
              </Stack>
              <Stack width={"195px"} alignItems="flex-end">
                <MenuSettings />
                <Box position="relative">
                  <StarFragment />
                </Box>
              </Stack>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
