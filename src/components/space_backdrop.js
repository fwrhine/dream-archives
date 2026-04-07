"use client";

import { Box } from "@chakra-ui/react";
import { useMemo } from "react";

export default function SpaceBackdrop() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() < 0.7 ? 2 : Math.random() < 0.95 ? 3 : 4,
      opacity: 0.35 + Math.random() * 0.55,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      sparkle: Math.random() < 0.15,
    }));
  }, []);

  return (
    <Box
      position="absolute"
      inset={0}
      bg="black"
      zIndex={0}
      overflow="hidden"
      pointerEvents="none"
    >
      {stars.map((star) => (
        <Box
          key={star.id}
          position="absolute"
          left={`${star.left}%`}
          top={`${star.top}%`}
          width={`${star.size}px`}
          height={`${star.size}px`}
          bg="#dfe6ff"
          opacity={star.opacity}
          animation={
            star.sparkle
              ? `sparkle ${star.duration}s ease-in-out ${star.delay}s infinite`
              : `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
          }
        />
      ))}
    </Box>
  );
}
