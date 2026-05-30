"use client";

import { useEffect, useRef } from "react";

export default function DreamArchivesGame() {
  const gameRef = useRef(null);

  useEffect(() => {
    let game;

    async function init() {
      const Phaser = (await import("phaser")).default;

      class CentralNodeScene extends Phaser.Scene {
        constructor() {
          super("CentralNode");
        }

        preload() {
          this.load.image("centralNode", "/images/modules/central_node.webp");
          this.load.audio("blip", "/audio/blip_1.mp3");
        }

        create() {
          const { width, height } = this.scale;

          this.add
            .image(width / 2, height / 2, "centralNode")
            .setDisplaySize(width, height);

          this.blip = this.sound.add("blip", {
            volume: 1,
          });

          const hotspot = this.add.zone(500, 300, 160, 120);
          hotspot.setInteractive({ cursor: "pointer" });

          const debugRect = this.add.rectangle(
            500,

            300,

            160,

            120,

            0xff00ff, // bright pink

            0.3, // 30% opacity
          );

          debugRect.setStrokeStyle(2, 0xffffff);

          hotspot.on("pointerdown", () => {
            this.blip.play();
            console.log("Hotspot clicked");
          });
        }
      }

      game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: gameRef.current,
        width: 1536,
        height: 1022,
        backgroundColor: "#232222",
        scene: [CentralNodeScene],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      });
    }

    init();

    return () => {
      if (game) game.destroy(true);
    };
  }, []);

  return (
    <div
      ref={gameRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#232222",
      }}
    />
  );
}
