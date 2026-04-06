"use client";

import { useEffect, useState } from "react";
import { Text, Span } from "@chakra-ui/react";

export default function TypewriterText({ children, speed = 80, ...textProps }) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setDone(false);

    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(children.slice(0, index));

      if (index >= children.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [children, speed]);

  return (
    <Text whiteSpace="pre-line" {...textProps}>
      {displayedText}
      {!done && <Span animation="blink 1s steps(1) infinite">▋</Span>}
    </Text>
  );
}
