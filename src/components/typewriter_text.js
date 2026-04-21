"use client";

import { useEffect, useState } from "react";
import { Text, Span } from "@chakra-ui/react";

export default function TypewriterText({
  children,
  speed = 50,
  delay = 0,
  ...textProps
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  // Delay before typing starts
  useEffect(() => {
    setDisplayedText("");
    setDone(false);
    setStarted(false);

    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [children, delay]);

  // Typing effect
  useEffect(() => {
    if (!started) return;

    let index = 0;
    let timeout;

    const type = () => {
      index += 1;
      const currentChar = children[index - 1];

      setDisplayedText(children.slice(0, index));

      if (index >= children.length) {
        setDone(true);
        return;
      }

      // Dynamic delay!
      const nextChunk = children.slice(index, index + 5); // look ahead
      let nextDelay = speed;

      if (nextChunk === ". . .") {
        nextDelay = 300;
      } else if (currentChar === ".") {
        nextDelay = 250;
      } else if (currentChar === ":") {
        nextDelay = 250;
      } else if (currentChar === "\n") {
        nextDelay = 800; // pause before next line
      }

      timeout = setTimeout(type, nextDelay);
    };

    timeout = setTimeout(type, speed);

    return () => clearTimeout(timeout);
  }, [started, children, speed]);

  return (
    <Text whiteSpace="pre-line" {...textProps}>
      {displayedText}
      {!done && <Span animation="blink 1s steps(1) infinite">▋</Span>}
    </Text>
  );
}
