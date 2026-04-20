"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import Time from "@/components/time";
import Menu from "@/components/menu";
import MenuSettings from "@/components/menu_settings";
import Module from "@/components/module";
import Dialogue from "@/components/dialogue";
import StarFragment from "@/components/star_fragment";
import MobileBlocked from "@/components/mobile_blocked";
import { modules } from "@/data/modules";
import OverlayLayer from "@/components/overlay_layer";

const DESIGN_WIDTH = 1536;
const DESIGN_HEIGHT = 1022;

// Image Load
const imageSources = [
  "/images/modules/central_node_empty.webp",
  "/images/modules/cupola_empty.webp",
  "/images/modules/star_fragment/star_fragment_core.webp",
  "/images/modules/star_fragment/star_fragment_field.webp",
  "/images/cupola_space.webp",
  "/images/moon.png",
];

function preloadImages(sources) {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        }),
    ),
  );
}

// Loading Screen
function LoadingScreen() {
  return (
    <Box
      w="100vw"
      h="100vh"
      bg="#232222"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      fontFamily="Reddit Mono Variable"
      className="loading-screen"
    >
      <Stack textAlign="center" gap={3}>
        <Text fontWeight="bold">Initializing Dream Archives . . .</Text>
        <Text className="loading-pulse">Loading system modules</Text>
      </Stack>
    </Box>
  );
}

export default function Home() {
  // Disable mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  // Navigation
  const [activeModule, setActiveModule] = useState("centralNode");
  const currentModule = modules[activeModule];

  // Minimum loading time
  const [minTimeDone, setMinTimeDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Scaling
  const [scale, setScale] = useState(null);
  useLayoutEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / DESIGN_WIDTH;
      const scaleY = window.innerHeight / DESIGN_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Wait for image load
  const [imagesReady, setImagesReady] = useState(false);
  useEffect(() => {
    let cancelled = false;

    preloadImages(imageSources).then(() => {
      if (!cancelled) {
        setImagesReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const ready = scale !== null && imagesReady && minTimeDone;

  // Handle dialogue interaction
  const [dialogueText, setDialogueText] = useState(currentModule.dialogue);
  const [isWelcome, setIsWelcome] = useState(true);
  const [dialogueIndex, setDialogueIndex] = useState({});
  const [dialogueRenderKey, setDialogueRenderKey] = useState(0);

  useEffect(() => {
    setDialogueText(currentModule.dialogue);
    setIsWelcome(true);
    setDialogueIndex({});
    setInteractionEvent(null);
  }, [currentModule]);

  // Interaction event
  const [interactionEvent, setInteractionEvent] = useState(null);

  if (isMobile) {
    return <MobileBlocked />;
  }
  if (!ready) {
    return <LoadingScreen />;
  }
  return (
    <Box
      w="100vw"
      h="100vh"
      overflow="hidden"
      position="relative"
      bgColor="#232222"
      fontFamily={"Reddit Mono Variable"}
      className="main-screen"
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
              <Menu activeModule={activeModule} onNavigate={setActiveModule} />
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
                <Module
                  module={currentModule}
                  debug={false}
                  overlay={
                    <OverlayLayer
                      moduleId={activeModule}
                      interactionEvent={interactionEvent}
                    />
                  }
                  onHotspotClick={(spot) => {
                    setIsWelcome(false);

                    setDialogueIndex((prev) => {
                      const currentIndex = prev[spot.id] ?? -1;
                      const nextIndex =
                        (currentIndex + 1) % spot.dialogue.length;

                      setDialogueText(spot.dialogue[nextIndex]);
                      setDialogueRenderKey((k) => k + 1);

                      return {
                        ...prev,
                        [spot.id]: nextIndex,
                      };
                    });

                    setInteractionEvent({
                      moduleId: activeModule,
                      hotspotId: spot.id,
                      timestamp: Date.now(),
                    });
                  }}
                />
                <Box flex="1" minH={0} display="flex">
                  <Dialogue
                    key={dialogueRenderKey}
                    text={dialogueText}
                    delay={isWelcome}
                    onHeaderClick={(spot) => {
                      setIsWelcome(false);

                      setDialogueIndex((prev) => {
                        const currentIndex = prev[spot.id] ?? -1;
                        const nextIndex =
                          (currentIndex + 1) % spot.dialogue.length;

                        setDialogueText(spot.dialogue[nextIndex]);
                        setDialogueRenderKey((k) => k + 1);

                        return {
                          ...prev,
                          [spot.id]: nextIndex,
                        };
                      });
                    }}
                  />
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
