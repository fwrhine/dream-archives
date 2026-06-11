import * as Phaser from "phaser";
import { ROOM_X, ROOM_Y, ROOM_W, ROOM_H, FONT, HEADER_H } from "../constants";
import { modules } from "../../data/modules";

const MODULE = modules.centralNode;

// Monitor flash fragments
const FRAGMENTS = [
  ["> signal :: 0001", "▒▒▒▒ memory drift", "standby"],
  [":: node active", "> process ▒▒▒ unstable", ":: hold"],
  ["> input received", "▒▒ render pending", ":: standby"],
  [":: archive trace", "> signal ▒▒ nominal", ":: hold"],
  ["> where :: 0000", "▒▒▒▒", ":: awaiting"],
];

// Position of monitor screen in room-relative coords
const MON_X = ROOM_X + 388;
const MON_Y = ROOM_Y + 380;
const MON_W = 212;
const MON_H = 120;

export default class CentralNodeScene extends Phaser.Scene {
  constructor() {
    super({ key: "CentralNodeScene" });
  }

  create() {
    this.createRoomFrame();

    // Background image scaled to fill room area
    this.add
      .image(ROOM_X, ROOM_Y, "central_node")
      .setOrigin(0, 0)
      .setDisplaySize(ROOM_W, ROOM_H);

    // Room title bar
    this.createTitleBar();

    // Register hotspots
    this.registerHotspots();

    // Monitor flash container (hidden initially)
    this.createMonitorFlash();

    // Notify UIScene of welcome text
    this.game.events.emit("room-started", { welcomeText: MODULE.dialogue });
  }

  createRoomFrame() {
    const x = ROOM_X;
    const y = ROOM_Y - HEADER_H;
    const w = ROOM_W;
    const h = ROOM_H + HEADER_H;

    const g = this.add.graphics();

    // Background
    g.fillStyle(0x000000, 1);
    g.fillRect(x, y, w, h);

    // Shadow
    g.fillStyle(0x000000, 1);
    g.fillRect(x + 10, y + 10, w, h);

    // Border
    g.lineStyle(3, 0x000000, 1);
    g.strokeRect(x, y, w, h);
  }

  createTitleBar() {
    const g = this.add.graphics();

    g.fillStyle(0xffffff, 1);
    g.fillRect(ROOM_X, ROOM_Y - HEADER_H, ROOM_W, HEADER_H);
    g.lineStyle(3, 0x000000, 1);
    g.strokeRect(ROOM_X, ROOM_Y - HEADER_H, ROOM_W, HEADER_H);

    // Decorative lines + title
    const cx = ROOM_X + ROOM_W / 2;
    const cy = ROOM_Y - HEADER_H / 2;

    this.add
      .text(cx - 60, cy, "✧", {
        fontFamily: FONT,
        fontSize: "14px",
        color: "#000000",
      })
      .setOrigin(0.5);
    this.add
      .text(cx, cy, MODULE.title, {
        fontFamily: FONT,
        fontSize: "30px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.add
      .text(cx + 60, cy, "✧", {
        fontFamily: FONT,
        fontSize: "14px",
        color: "#000000",
      })
      .setOrigin(0.5);

    // Horizontal lines left and right of title
    const g2 = this.add.graphics();
    g2.lineStyle(2, 0x000000, 1);
    g2.lineBetween(ROOM_X + 8, cy, cx - 75, cy);
    g2.lineBetween(cx + 75, cy, ROOM_X + ROOM_W - 8, cy);
  }

  registerHotspots() {
    MODULE.hotspots.forEach((spot) => {
      const regions = spot.regions ?? [
        { x: spot.x, y: spot.y, width: spot.width, height: spot.height },
      ];

      regions.forEach((r) => {
        const zone = this.add
          .zone(ROOM_X + r.x, ROOM_Y + r.y, r.width, r.height)
          .setOrigin(0)
          .setInteractive({ useHandCursor: true });

        zone.on("pointerup", () => {
          this.game.events.emit("hotspot-click", {
            id: spot.id,
            dialogue: spot.dialogue,
          });

          // Trigger monitor flash for computer hotspot
          if (spot.id === "computer") {
            this.triggerMonitorFlash();
          }
        });
      });
    });
  }

  // ─── MONITOR FLASH ────────────────────────────────────────────────────────

  createMonitorFlash() {
    this.monContainer = this.add.container(MON_X, MON_Y).setVisible(false);

    // Scanline overlay
    const scanG = this.add.graphics();
    for (let ly = 0; ly < MON_H; ly += 6) {
      scanG.fillStyle(0xffffff, 0.04);
      scanG.fillRect(0, ly, MON_W, 2);
    }
    this.monContainer.add(scanG);

    // Flicker rect
    this.monFlicker = this.add
      .rectangle(0, 0, MON_W, MON_H, 0xaabeff, 0.04)
      .setOrigin(0);
    this.monContainer.add(this.monFlicker);

    // Text lines
    this.monLines = [0, 1, 2].map((i) => {
      const t = this.add
        .text(12, 30 + i * 22, "", {
          fontFamily: FONT,
          fontSize: "11px",
          color: "#ffffff",
          fontStyle: "bold",
        })
        .setAlpha(0);
      this.monContainer.add(t);
      return t;
    });

    // Flickering tween
    this.tweens.add({
      targets: this.monFlicker,
      alpha: { from: 0.03, to: 0.07 },
      duration: 120,
      repeat: -1,
      yoyo: true,
    });
  }

  triggerMonitorFlash() {
    const fragment = Phaser.Math.RND.pick(FRAGMENTS);
    this.monLines.forEach((t, i) => {
      t.setText(fragment[i]);
      t.setAlpha(0);
    });
    this.monContainer.setVisible(true);

    const delays = [300, 900, 1600];
    delays.forEach((d, i) => {
      this.time.delayedCall(d, () => {
        this.tweens.add({ targets: this.monLines[i], alpha: 1, duration: 80 });
      });
    });

    this.time.delayedCall(3200, () => {
      this.tweens.add({
        targets: this.monContainer,
        alpha: 0,
        duration: 200,
        onComplete: () => {
          this.monContainer.setVisible(false).setAlpha(1);
        },
      });
    });
  }
}
