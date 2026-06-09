'use client';

// @refresh reset

import { useEffect, useRef } from 'react';

export default function PhaserGame() {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function startGame() {
      const { createGame } = await import('./game');

      if (!mounted || !containerRef.current) return;

      // Destroy previous Phaser instance during dev / Fast Refresh
      if (window.__DREAM_ARCHIVES_GAME__) {
        window.__DREAM_ARCHIVES_GAME__.destroy(true);
        window.__DREAM_ARCHIVES_GAME__ = null;
      }

      const game = createGame(containerRef.current);

      gameRef.current = game;
      window.__DREAM_ARCHIVES_GAME__ = game;
    }

    startGame();

    return () => {
      mounted = false;

      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }

      if (window.__DREAM_ARCHIVES_GAME__) {
        window.__DREAM_ARCHIVES_GAME__ = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#232222',
        overflow: 'hidden',
      }}
    />
  );
}