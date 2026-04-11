import { Box, Flex, Image, Span, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function StarFragment() {
  const baseValue = 67;
  const [value, setValue] = useState(baseValue);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let timeout;
    let glitchTimeout;

    const tick = () => {
      const shouldGlitch = Math.random() < 0.18;

      if (shouldGlitch) {
        setGlitch(true);
        glitchTimeout = setTimeout(() => setGlitch(false), 120);
      }

      setValue((prev) => {
        const roll = Math.random();

        let change = 0;

        if (roll < 0.03) {
          // rare anomaly
          change = Math.random() < 0.5 ? -6 : 6;
        } else if (prev > baseValue + 2) {
          // gently pull back down if too high
          change = Math.random() < 0.7 ? -1 : 0;
        } else if (prev < baseValue - 2) {
          // gently pull back up if too low
          change = Math.random() < 0.7 ? 1 : 0;
        } else {
          // normal subtle drift
          if (roll < 0.68) {
            change = 0;
          } else if (roll < 0.9) {
            change = Math.random() < 0.5 ? -1 : 1;
          } else {
            change = Math.random() < 0.5 ? -2 : 2;
          }
        }

        const next = prev + change;

        return Math.max(baseValue - 7, Math.min(baseValue + 7, next));
      });

      const nextDelay = 1200 + Math.random() * 1800; // 1.2s to 3s
      timeout = setTimeout(tick, nextDelay);
    };

    tick();

    return () => {
      clearTimeout(timeout);
      clearTimeout(glitchTimeout);
    };
  }, []);

  return (
    <Stack
      alignItems="top"
      position="absolute"
      right="-10px"
      top="210px"
      border="2px solid black"
      bgColor="white"
      gap={0}
      width="250px"
      justifyContent={"space-between"}
      boxShadow="3px 3px 0px rgba(0,0,0,0.77)"
    >
      <Stack gap={0} flex="1">
        <Stack borderBottom="2px solid black" textAlign={"center"} padding={2}>
          <Text fontWeight={"bold"}>Dream Archives</Text>
        </Stack>
        <Flex width="full" flex="1" justifyContent={"space-between"}>
          <Stack
            className={"manga-dots manga-dots-pale border border-black"}
            flex={1}
            padding={3}
            paddingBottom={2}
            gap={4}
          >
            <Stack padding={2} position="relative" height="350px">
              <Image
                src="/images/star_fragment/star_fragment_field.webp"
                alt="Star Fragment Field"
                position="absolute"
                zIndex={1}
                width="184px"
                top={"60px"}
              />
              <Box
                className="star-fragment-wrap"
                position="absolute"
                zIndex={2}
                top={133}
                left={7}
              >
                <Image
                  src="/images/star_fragment/star_fragment_core.webp"
                  alt="Star Fragment Core"
                  width="139px"
                />
              </Box>
              <Image
                src="/images/star_fragment/sparkle.png"
                alt="Sparkle 1"
                position="absolute"
                zIndex={3}
                width="17px"
                left={"63px"}
              />
              <Image
                src="/images/star_fragment/sparkle.png"
                alt="Sparkle 2"
                position="absolute"
                zIndex={3}
                width="18px"
                top={"43px"}
                left={"45px"}
              />
              <Image
                src="/images/star_fragment/sparkle.png"
                alt="Sparkle 3"
                position="absolute"
                zIndex={3}
                width="19px"
                top={"118px"}
                left={"137px"}
              />
              <Image
                src="/images/star_fragment/sparkle.png"
                alt="Sparkle 4"
                position="absolute"
                zIndex={3}
                width="25px"
                top={"225px"}
                left={"159px"}
              />
              <Image
                src="/images/star_fragment/sparkle.png"
                alt="Sparkle 5"
                position="absolute"
                zIndex={3}
                width="27px"
                top={"306px"}
                left={"131px"}
              />
            </Stack>
            <Text fontSize="15px" fontWeight={"bold"}>
              <Span color="#1916CD">&gt;</Span> Dream cache{" "}
              <Span color="#1916CD" className={glitch ? "cache-glitch" : ""}>
                {value}%
              </Span>{" "}
              full
            </Text>
          </Stack>
          <Stack borderLeft="2px solid black" width="23px" />
        </Flex>
      </Stack>
      <Stack
        borderTop="2px solid black"
        height="23px"
        width="full"
        alignItems="flex-end"
      >
        <Stack borderLeft="2px solid black" width="23px" height="23px" />
      </Stack>
    </Stack>
  );
}
