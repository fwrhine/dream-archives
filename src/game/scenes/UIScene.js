import * as Phaser from "phaser";
import {
  W,
  H,
  PAD,
  LEFT_W,
  RIGHT_W,
  GAP,
  ROOM_X,
  ROOM_Y,
  ROOM_W,
  ROOM_H,
  DIAL_X,
  DIAL_Y,
  DIAL_W,
  DIAL_H,
  RIGHT_X,
  RIGHT_Y,
  FONT,
} from "../constants";

const MENU_ITEMS = [
  { label: "Home", scene: "CentralNodeScene" },
  { label: "Mainframe", scene: "MainframeScene" },
  { label: "Archives", scene: "ArchivesScene" },
  { label: "Cupola", scene: "CupolaScene" },
  { label: "About", scene: "PersonnelScene" },
];

const BLIPS = ["blip_1", "blip_2", "blip_3", "blip_4", "blip_5"];
const PUNCTUATION = new Set([".", ",", "!", "?", ";", ":", "\n", " "]);

const AMBIENT_DIALOGUE = [". . .", ". . .", "Yes?", "No response."];

// Draw manga dot pattern onto a graphics object
function drawDots(g, x, y, w, h, alpha = 0.35, spacing = 6, radius = 0.8) {
  g.fillStyle(0x000000, alpha);
  for (let px = x + 3; px < x + w; px += spacing) {
    for (let py = y + 3; py < y + h; py += spacing) {
      g.fillCircle(px, py, radius);
    }
  }
}

export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: "UIScene" });
  }

  create() {
    this.currentScene = "CentralNodeScene";
    this.dialogueIndices = {};
    this.typewriterTimer = null;

    this.createTimePanel();
    this.createMenu();
    this.createDialogueBox();
    this.createStarFragment();
    this.createSettingsButtons();

    // Initial welcome dialogue
    this.showDialogue("Memory nodes stabilized . . . \nWelcome back.", true);

    // Cross-scene events
    this.game.events.on("hotspot-click", this.onHotspotClick, this);
    this.game.events.on("navigate", this.onNavigate, this);

    // Clock
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.updateClock,
      callbackScope: this,
    });
    this.updateClock();
  }

  // ─── TIME PANEL ──────────────────────────────────────────────────────────

  createTimePanel() {
    const x = PAD,
      y = PAD,
      w = 344,
      h = 245;
    const g = this.add.graphics();

    // White fill + dots
    g.fillStyle(0xffffff, 1);
    g.fillRect(x, y, w, h);
    drawDots(g, x, y, w, h, 0.4, 12, 2.5);

    // Borders
    g.lineStyle(3, 0x000000, 1);
    g.strokeRect(x, y, w, h);
    // Divider between time and date
    g.lineBetween(x, y + 170, x + w, y + 170);

    // Moon icon
    this.add
      .image(x + w - 110, y + 122, "moon")
      .setDisplaySize(45, 45)
      .setOrigin(0.5);

    // Time texts (updated real time)
    this.timeText = this.add
      .text(x + w - 25, y + 25, "12:00", {
        fontFamily: FONT,
        fontSize: "55px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(1, 0);

    this.periodText = this.add
      .text(x + w - 25, y + 122, "AM", {
        fontFamily: FONT,
        fontSize: "45px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(1, 0.5);

    this.add
      .text(x + w - 25, y + 192, "24-12-1998", {
        fontFamily: FONT,
        fontSize: "30px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(1, 0);
  }

  updateClock() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).formatToParts(now);

    const hour = parts.find((p) => p.type === "hour")?.value || "12";
    const minute = parts.find((p) => p.type === "minute")?.value || "00";
    const period = parts.find((p) => p.type === "dayPeriod")?.value || "AM";

    this.timeText?.setText(`${hour}:${minute}`);
    this.periodText?.setText(period);
  }

  // ─── MENU ─────────────────────────────────────────────────────────────────

  createMenu() {
    this.menuGraphics = this.add.graphics();
    this.menuLabels = [];
    this.menuZones = [];
    this.drawMenu();
  }

  drawMenu() {
    const g = this.menuGraphics;
    g.clear();
    this.menuLabels.forEach((t) => t.destroy());
    this.menuZones.forEach((z) => z.destroy());
    this.menuLabels = [];
    this.menuZones = [];

    const x = PAD;
    const startY = PAD + 270;
    const btnW = 344;
    const btnH = 120;
    const btnGap = 25;

    MENU_ITEMS.forEach((item, i) => {
      const by = startY + i * (btnH + btnGap);
      const isActive = item.scene === this.currentScene;

      // White fill
      g.fillStyle(0xffffff, 1);
      g.fillRect(x, by, btnW, btnH);

      // Dense dots if active
      if (isActive) drawDots(g, x, by, btnW, btnH, 0.4, 9, 1.5);

      // Border
      g.lineStyle(3, 0x000000, 1);
      g.strokeRect(x, by, btnW, btnH);

      // Label
      const label = this.add
        .text(x + btnW / 2, by + btnH / 2, item.label, {
          fontFamily: FONT,
          fontSize: "35px",
          color: "#000000",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
      this.menuLabels.push(label);

      // Hit zone
      const zone = this.add
        .zone(x, by, btnW, btnH)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });
      zone.on("pointerup", () => this.onNavigate(item.scene));
      this.menuZones.push(zone);
    });
  }

  // ─── DIALOGUE BOX ────────────────────────────────────────────────────────

  createDialogueBox() {
    const x = DIAL_X,
      y = DIAL_Y,
      w = DIAL_W,
      h = DIAL_H;
    const headerH = 34;
    const stripW = 23;

    const g = this.add.graphics();

    // Shadow
    g.fillStyle(0x000000, 0.77);
    g.fillRect(x + 3, y + 3, w, h);

    // White fill
    g.fillStyle(0xffffff, 1);
    g.fillRect(x, y, w, h);

    // Outer border
    g.lineStyle(2, 0x000000, 1);
    g.strokeRect(x, y, w, h);

    // Header bottom border
    g.lineBetween(x, y + headerH, x + w, y + headerH);

    // Bottom strip top border
    g.lineBetween(x, y + h - stripW, x + w, y + h - stripW);

    // Right strip (vertical) — body
    g.lineBetween(x + w - stripW, y + headerH, x + w - stripW, y + h - stripW);

    // Bottom-right corner strip
    g.lineBetween(x + w - stripW, y + h - stripW, x + w, y + h - stripW);

    // Header "???"
    const headerLabel = this.add
      .text(x + w / 2, y + headerH / 2, "???", {
        fontFamily: FONT,
        fontSize: "14px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Header click zone (ambient dialogue)
    this.ambientIndex = 0;
    const headerZone = this.add
      .zone(x, y, w, headerH)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    headerZone.on("pointerup", () => {
      const text =
        AMBIENT_DIALOGUE[this.ambientIndex % AMBIENT_DIALOGUE.length];
      this.ambientIndex++;
      this.showDialogue(text, false);
    });

    // Dialogue text (typewriter target)
    this.dialogueTextObj = this.add.text(x + 14, y + headerH + 12, "", {
      fontFamily: FONT,
      fontSize: "18px",
      color: "#000000",
      fontStyle: "bold",
      wordWrap: { width: w - stripW - 28 },
    });

    // Blinking cursor
    this.cursorObj = this.add
      .text(0, 0, "▋", {
        fontFamily: FONT,
        fontSize: "18px",
        color: "#000000",
      })
      .setAlpha(0);

    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        if (this.cursorObj.alpha > 0) {
          this.cursorObj.setAlpha(0);
        } else if (this.cursorVisible) {
          this.cursorObj.setAlpha(1);
        }
      },
    });
    this.cursorVisible = false;
  }

  showDialogue(text, withDelay = false) {
    if (this.typewriterTimer) {
      this.typewriterTimer.remove(false);
      this.typewriterTimer = null;
    }
    this.dialogueTextObj.setText("");
    this.cursorVisible = false;
    this.cursorObj.setAlpha(0);

    const chars = Array.from(text);
    let i = 0;

    const getDelay = (char, lookahead) => {
      if (lookahead === ". . .") return 300;
      if (char === "\n") return 800;
      if (char === "." || char === ":") return 250;
      return 30; // base speed
    };

    const typeNext = () => {
      if (i >= chars.length) {
        // Done — position cursor at the bottom-left of the text and start blinking
        const bounds = this.dialogueTextObj.getBounds();
        this.cursorObj.setPosition(
          this.dialogueTextObj.x,
          bounds.bottom - this.cursorObj.height,
        );
        this.cursorVisible = true;
        this.cursorObj.setAlpha(1);
        return;
      }

      const char = chars[i];
      this.dialogueTextObj.setText(this.dialogueTextObj.text + char);

      if (!PUNCTUATION.has(char)) {
        const blip = Phaser.Math.RND.pick(BLIPS);
        // this.sound.play(blip, { volume: 0.6 });
      }

      i++;
      const lookahead = chars.slice(i, i + 5).join("");
      const delay = getDelay(char, lookahead);
      this.typewriterTimer = this.time.delayedCall(delay, typeNext);
    };

    if (withDelay) {
      this.time.delayedCall(1300, typeNext);
    } else {
      typeNext();
    }
  }

  // ─── STAR FRAGMENT ────────────────────────────────────────────────────────

  createStarFragment() {
    // Panel position: right of right sidebar, slight overhang
    const px = RIGHT_X - 55; // 1246
    const py = RIGHT_Y + 250; // 290
    const pw = 250;
    const headerH = 40;
    const stripW = 23;

    // Star fragment dialogue cycling
    this.sfDialogue = [
      "It seems to be a fragment of a star. \nThere is no record of where it came from.",
      "The fragment is giving off unusually high energy.",
      "Where did it come from?",
    ];
    this.sfIndex = 0;

    const g = this.add.graphics();

    // Shadow
    g.fillStyle(0x000000, 0.77);
    g.fillRect(px + 3, py + 3, pw, 530);

    // White fill
    g.fillStyle(0xffffff, 1);
    g.fillRect(px, py, pw, 530);

    // Outer border
    g.lineStyle(2, 0x000000, 1);
    g.strokeRect(px, py, pw, 530);

    // Header border
    g.lineBetween(px, py + headerH, px + pw, py + headerH);

    // Right strip vertical
    g.lineBetween(
      px + pw - stripW,
      py + headerH,
      px + pw - stripW,
      py + 530 - stripW,
    );

    // Bottom strip
    g.lineBetween(px, py + 530 - stripW, px + pw, py + 530 - stripW);

    // Header text
    this.add
      .text(px + pw / 2, py + headerH / 2, "Dream Archives", {
        fontFamily: FONT,
        fontSize: "14px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Dots background for body
    const dotsG = this.add.graphics();
    drawDots(
      dotsG,
      px + 2,
      py + headerH + 2,
      pw - stripW - 4,
      530 - headerH - stripW - 4,
      0.3,
    );

    // Fragment field image
    const fieldImg = this.add
      .image(px + 8, py + headerH + 50, "star_fragment_field")
      .setOrigin(0, 0)
      .setDisplaySize(184, 220);

    // Fragment core image (floating)
    this.sfCore = this.add
      .image(px + 38, py + headerH + 120, "star_fragment_core")
      .setOrigin(0, 0)
      .setDisplaySize(140, 140);

    this.tweens.add({
      targets: this.sfCore,
      y: { from: py + headerH + 120, to: py + headerH + 117 },
      angle: { from: -1.5, to: 1 },
      duration: 6500,
      repeat: -1,
      yoyo: true,
      ease: "Sine.easeInOut",
    });

    // Sparkles
    const sparkleData = [
      { x: px + 85, y: py + headerH + 5, size: 17, delay: 0 },
      { x: px + 68, y: py + headerH + 55, size: 19, delay: 700 },
      { x: px + 145, y: py + headerH + 123, size: 22, delay: 1400 },
      { x: px + 167, y: py + headerH + 230, size: 25, delay: 2100 },
      { x: px + 139, y: py + headerH + 311, size: 27, delay: 2800 },
    ];

    sparkleData.forEach(({ x, y, size, delay }) => {
      const sp = this.add
        .image(x, y, "sparkle")
        .setDisplaySize(size, size)
        .setAlpha(0)
        .setOrigin(0);
      this.tweens.add({
        targets: sp,
        alpha: { from: 0, to: 1 },
        duration: 600,
        yoyo: true,
        repeat: -1,
        delay,
        repeatDelay: 3800,
        ease: "Sine.easeInOut",
      });
    });

    // Cache value drift
    this.cacheValue = 67;
    const BASE = 67;
    const cacheLabel = this.add.text(px + 10, py + 380, "", {
      fontFamily: FONT,
      fontSize: "14px",
      color: "#000000",
      fontStyle: "bold",
    });

    this.cacheLabel = cacheLabel;
    this.updateCacheLabel();

    const tickCache = () => {
      const roll = Math.random();
      let change = 0;
      if (roll < 0.03) {
        change = Math.random() < 0.5 ? -6 : 6;
      } else if (this.cacheValue > BASE + 2) {
        change = Math.random() < 0.7 ? -1 : 0;
      } else if (this.cacheValue < BASE - 2) {
        change = Math.random() < 0.7 ? 1 : 0;
      } else {
        if (roll < 0.68) change = 0;
        else if (roll < 0.9) change = Math.random() < 0.5 ? -1 : 1;
        else change = Math.random() < 0.5 ? -2 : 2;
      }
      this.cacheValue = Math.max(
        BASE - 7,
        Math.min(BASE + 7, this.cacheValue + change),
      );

      // Glitch
      if (Math.random() < 0.18) {
        cacheLabel.setShadow(1, 0, "#4c57ff", 2, false, true);
        this.time.delayedCall(120, () =>
          cacheLabel.setShadow(0, 0, "", 0, false, false),
        );
      }

      this.updateCacheLabel();
      this.time.delayedCall(1200 + Math.random() * 1800, tickCache);
    };
    tickCache();

    // Click zone for star fragment
    const sfZone = this.add
      .zone(px, py + headerH, pw - stripW, 530 - headerH - stripW)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    sfZone.on("pointerup", () => {
      const text = this.sfDialogue[this.sfIndex % this.sfDialogue.length];
      this.sfIndex++;
      this.showDialogue(text, false);
    });
  }

  updateCacheLabel() {
    this.cacheLabel?.setText(`> Dream cache  ${this.cacheValue}%  full`);
  }

  // ─── SETTINGS ─────────────────────────────────────────────────────────────

  createSettingsButtons() {
    const btnSize = 110;
    const x1 = RIGHT_X + RIGHT_W - btnSize * 2 - 20;
    const x2 = RIGHT_X + RIGHT_W - btnSize;
    const y = RIGHT_Y;
    const g = this.add.graphics();

    [x1, x2].forEach((bx, i) => {
      g.fillStyle(0xffffff, 1);
      g.fillRect(bx, y, btnSize, btnSize);
      g.lineStyle(3, 0x000000, 1);
      g.strokeRect(bx, y, btnSize, btnSize);
      this.add
        .image(
          bx + btnSize / 2,
          y + btnSize / 2,
          i === 0 ? "settings" : "help",
        )
        .setDisplaySize(45, 45);
    });
  }

  // ─── NAVIGATION ──────────────────────────────────────────────────────────

  onNavigate(sceneKey) {
    if (sceneKey === this.currentScene) return;
    this.scene.stop(this.currentScene);
    this.scene.launch(sceneKey);
    this.scene.bringToTop("UIScene");
    this.currentScene = sceneKey;
    this.dialogueIndices = {};
    this.drawMenu();
  }

  // ─── HOTSPOT CLICK ────────────────────────────────────────────────────────

  onHotspotClick({ id, dialogue }) {
    const idx = (this.dialogueIndices[id] ?? -1) + 1;
    this.dialogueIndices[id] = idx % dialogue.length;
    this.showDialogue(dialogue[this.dialogueIndices[id]], false);
  }

  // ─── ROOM STARTED ─────────────────────────────────────────────────────────

  onRoomStarted({ welcomeText }) {
    this.dialogueIndices = {};
    this.showDialogue(welcomeText, true);
  }
}
