"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function MonitorFlash({ trigger, debug = false }) {
  const [active, setActive] = useState(debug);

  useEffect(() => {
    if (debug) {
      setActive(true);
      return;
    }

    if (!trigger) return;

    setActive(true);

    const t = setTimeout(() => {
      setActive(false);
    }, 2200);

    return () => clearTimeout(t);
  }, [trigger, debug]);

  if (!active) return null;

  return (
    <Box
      position="absolute"
      left="385px"
      top="370px"
      width="217px"
      height="135px"
      zIndex={2}
      pointerEvents="none"
      overflow="hidden"
      border={debug ? "1px solid red" : "none"}
      className={debug ? "" : "monitor-glow"}
    >
      <Box className="monitor-base" position="absolute" inset={0} />
      <Box className="monitor-scanlines" position="absolute" inset={0} />
      <Box className="monitor-sweep" position="absolute" inset={0} />
      <Box className="monitor-flicker" position="absolute" inset={0} />
    </Box>
  );
}