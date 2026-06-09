'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import MobileBlocked from '@/components/mobile_blocked';
import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('@/game/PhaserGame'), { ssr: false });

// Preload just enough to show the loading screen quickly
const PRELOAD_ASSETS = [
  '/images/modules/central_node.webp',
  '/images/modules/cupola.webp',
];

function preloadImages(sources) {
  return Promise.all(
    sources.map(
      src =>
        new Promise(resolve => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        }),
    ),
  );
}

function LoadingScreen({ ready, onEnter }) {
  return (
    <Box
      w="100vw"
      h="100vh"
      onClick={ready ? onEnter : undefined}
      cursor={ready ? 'pointer' : 'default'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      pointerEvents={ready ? 'auto' : 'none'}
    >
      <Stack textAlign="center" gap={3}>
        <Text fontWeight="bold">Dream Archives</Text>
        {!ready ? (
          <Text className="loading-pulse">Loading system modules . . .</Text>
        ) : (
          <Text opacity={0.7}>Click to enter</Text>
        )}
      </Stack>
    </Box>
  );
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const DEV_MODE = process.env.NODE_ENV === 'development';
  const [entered, setEntered] = useState(DEV_MODE);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMinTimeDone(true), DEV_MODE ? 0 : 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    preloadImages(PRELOAD_ASSETS).then(() => {
      if (!cancelled) setImagesReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  const ready = imagesReady && minTimeDone;

  if (isMobile) return <MobileBlocked />;

  if (!entered) {
    return (
      <Box bgColor="#232222" fontFamily="Reddit Mono Variable" w="100vw" h="100vh">
        <LoadingScreen ready={ready} onEnter={() => setEntered(true)} />
      </Box>
    );
  }

  return <PhaserGame />;
}
