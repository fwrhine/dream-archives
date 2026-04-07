"use client";

import { Box } from "@chakra-ui/react";
import { useMemo } from "react";

function PixelSparkleStar({ left, top, opacity = 1, animation = "none" }) {
  return (
    <Box
      className="pixel-sparkle-star"
      position="absolute"
      left={`${left}%`}
      top={`${top}%`}
      opacity={opacity}
      animation={animation}
      pointerEvents="none"
    >
      {/* vertical 5 */}
      <Box className="px" style={{ left: "12px", top: "4px" }} />
      <Box className="px" style={{ left: "12px", top: "8px" }} />
      <Box className="px" style={{ left: "12px", top: "12px" }} />
      <Box className="px" style={{ left: "12px", top: "16px" }} />
      <Box className="px" style={{ left: "12px", top: "20px" }} />

      {/* horizontal 5 */}
      <Box className="px" style={{ left: "8px", top: "12px" }} />
      <Box className="px" style={{ left: "12px", top: "12px" }} />
      <Box className="px" style={{ left: "16px", top: "12px" }} />

      {/* detached outer squares */}
      <Box className="px" style={{ left: "12px", top: "-4px" }} />
      <Box className="px" style={{ left: "0px", top: "12px" }} />
      <Box className="px" style={{ left: "24px", top: "12px" }} />
      <Box className="px" style={{ left: "12px", top: "28px" }} />
    </Box>
  );
}

export default function SpaceBackdrop() {
  const { normalStars, sparkleStars } = useMemo(() => {
    const normalStars = Array.from({ length: 85 }, (_, i) => ({
      id: `normal-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size:
        Math.random() < 0.7 ? 2 :
        Math.random() < 0.95 ? 3 : 4,
      opacity: 0.25 + Math.random() * 0.45,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      color: Math.random() < 0.8 ? "#dfe6ff" : "#ffffff",
      static: Math.random() < 0.2,
    }));

    const sparkleCount = 1 + Math.floor(Math.random() * 2); // 1 or 2

    const sparkleStars = Array.from({ length: sparkleCount }, (_, i) => ({
      id: `sparkle-${i}`,
      left: 15 + Math.random() * 70, // random position
      top: 15 + Math.random() * 70,  // random position
      opacity: 0.4 + Math.random() * 0.4,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 6,
      static: Math.random() < 0.25,
    }));

    return { normalStars, sparkleStars };
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
      {normalStars.map((star) => (
        <Box
          key={star.id}
          position="absolute"
          left={`${star.left}%`}
          top={`${star.top}%`}
          width={`${star.size}px`}
          height={`${star.size}px`}
          bg={star.color}
          opacity={star.opacity}
          animation={
            star.static
              ? "none"
              : `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
          }
        />
      ))}

      {sparkleStars.map((star) => (
        <PixelSparkleStar
          key={star.id}
          left={star.left}
          top={star.top}
          opacity={0.8}
        />
      ))}
    </Box>
  );
}