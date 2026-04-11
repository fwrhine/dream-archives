"use client";

import { Box, Stack, Text, Span } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FRAGMENTS = [
  ["> signal :: 0001", "▒▒▒▒ memory drift", "standby"],
  [":: node active", "> process ▒▒▒ unstable", ":: hold"],
  ["> input received", "▒▒ render pending", ":: standby"],
  [":: archive trace", "> signal ▒▒ nominal", ":: hold"],
  ["> where :: 0000", "▒▒▒▒", ":: awaiting"],
];

export default function MonitorFlash({ trigger, debug = false }) {
  const [active, setActive] = useState(debug);
  const [lines, setLines] = useState(FRAGMENTS[0]);
  const [visibleLines, setVisibleLines] = useState(debug ? 3 : 0);

  useEffect(() => {
    if (debug) {
      setActive(true);
      setVisibleLines(3);
      return;
    }

    if (!trigger) return;

    const selected = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
    setLines(selected);
    setActive(true);
    setVisibleLines(0);

    const t1 = setTimeout(() => setVisibleLines(1), 300);
    const t2 = setTimeout(() => setVisibleLines(2), 900);
    const t3 = setTimeout(() => setVisibleLines(3), 1600);

    const t4 = setTimeout(() => {
      setActive(false);
      setVisibleLines(0);
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [trigger, debug]);

  if (!active) return null;

  return (
    <Box
      position="absolute"
      left="388px"
      top="380px"
      width="212px"
      height="120px"
      zIndex={2}
      pointerEvents="none"
      overflow="hidden"
      border={debug ? "1px solid red" : "none"}
      boxShadow="inset 0 0 12px rgba(140,160,255,0.12)"
    >
      <Box className="monitor-scanlines" position="absolute" inset={0} />
      <Box className="monitor-flicker" position="absolute" inset={0} />

      <Stack
        position="relative"
        zIndex={1}
        h="full"
        justifyContent="center"
        px={3}
        gap={1}
        color="white"
        fontFamily="Reddit Mono Variable"
        fontSize="11px"
        lineHeight="1.2"
      >
        {lines.slice(0, visibleLines).map((line, i) => (
          <Text key={i} fontSize="xs" fontWeight="600">
            {line}
          </Text>
        ))}

        {visibleLines > 0 && visibleLines < 3 && (
          <Text fontSize="xs" fontWeight="600">
            <Span animation="blink 1s steps(1) infinite">▋</Span>
          </Text>
        )}
      </Stack>
    </Box>
  );
}
