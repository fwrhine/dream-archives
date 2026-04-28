"use client";

import { useEffect, useRef, useState } from "react";
import { Text, Span } from "@chakra-ui/react";

export default function TypewriterText({
  children,
  speed = 50,
  delay = 0,
  blipSrc = "/audio/blip_1.mp3",
  ...textProps
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const blipRef = useRef(null);

  useEffect(() => {
    blipRef.current = new Audio(blipSrc);
    blipRef.current.volume = 1;
  }, [blipSrc]);

  const playBlip = (char, index) => {
    if (!blipRef.current) return;
    if (!char || char === " " || char === "\n") return;
    if ([".", ",", ":", ";", "!", "?", "…"].includes(char)) return;

    // only blip every 2 characters
    if (index % 2 !== 0) return;

    const sound = blipRef.current.cloneNode();
    sound.volume = 1;
    sound.play().catch(() => {});
  };

  useEffect(() => {
    setDisplayedText("");
    setDone(false);
    setStarted(false);

    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [children, delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    let timeout;

    const type = () => {
      index += 1;
      const currentChar = children[index - 1];

      setDisplayedText(children.slice(0, index));
      playBlip(currentChar, index);

      if (index >= children.length) {
        setDone(true);
        return;
      }

      const nextChunk = children.slice(index, index + 5);
      let nextDelay = speed;

      if (nextChunk === ". . .") {
        nextDelay = 300;
      } else if (currentChar === ".") {
        nextDelay = 250;
      } else if (currentChar === ":") {
        nextDelay = 250;
      } else if (currentChar === "\n") {
        nextDelay = 800;
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
