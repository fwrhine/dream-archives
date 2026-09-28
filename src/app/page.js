"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Box, Button, Center, HStack, Stack, Text } from "@chakra-ui/react";
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
  "/images/modules/central_node.webp",
  "/images/modules/cupola.webp",
  "/images/star_fragment/star_fragment_core.webp",
  "/images/star_fragment/star_fragment_field.webp",
  "/images/cupola_space.webp",
  "/images/moon.png",
  "/audio/blip_1.mp3",
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
function LoadingScreen({ ready, onEnter }) {
  return (
    <Center w="100vw" h="100vh" color="white">
      <Stack align="center" gap={3}>
        <Text fontWeight="bold">Dream Archives</Text>

        <Box
          position="relative"
          w="500px"
          h={ready ? "160px" : "24px"}
          overflow="hidden"
          transition="height 700ms cubic-bezier(.22,1,.36,1)"
        >
          {/* Loading */}
          <Center
            position="absolute"
            inset={0}
            opacity={ready ? 0 : 1}
            transition="opacity 250ms ease-out"
            pointerEvents="none"
          >
            <Text className={!ready ? "loading-pulse" : undefined}>
              Loading system modules . . .
            </Text>
          </Center>

          {/* Build info */}
          <Stack
            position="absolute"
            top={0}
            left={0}
            right={0}
            alignItems="center"
            gap={5}
            opacity={ready ? 1 : 0}
            transform={ready ? "translateY(0)" : "translateY(20px)"}
            transition="
              opacity 450ms ease 250ms,
              transform 450ms cubic-bezier(.22,1,.36,1) 250ms
            "
            pointerEvents={ready ? "auto" : "none"}
          >
            <Stack opacity={0.7} gap={0} alignItems="center">
              <Text>Build: 0.2.1</Text>
              <Text>Status: Under active development</Text>
            </Stack>

            <Text opacity={0.7} textAlign="center">
              Only a small portion of the archive is currently accessible.
              Further entries are being recovered.
            </Text>

            <Text
              cursor={ready ? "pointer" : "default"}
              onClick={ready ? onEnter : undefined}
            >
              [
              <Text as="span" _hover={{ textDecoration: "underline" }}>
                Click to enter
              </Text>
              ]
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Center>
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

  // Handle enter button
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);

    // const boot = new Audio("/audio/boot.mp3");
    // boot.volume = 1;
    // boot.play().catch(() => {});
  };

  if (isMobile) {
    return <MobileBlocked />;
  }
  if (!entered) {
    return <LoadingScreen ready={ready} onEnter={handleEnter} />;
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
                    index={dialogueRenderKey}
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
                  <StarFragment
                    onClick={(spot) => {
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
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
