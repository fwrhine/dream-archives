import * as Phaser from "phaser";
import {
  PAD,
  RIGHT_W,
  DIAL_X,
  DIAL_Y,
  DIAL_W,
  DIAL_H,
  RIGHT_X,
  RIGHT_Y,
  FONT,
  HEADER_H,
  LEFT_W,
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
      w = LEFT_W,
      h = 245;
    const g = this.add.graphics();

    // White fill + dots
    g.fillStyle(0xffffff, 1);
    g.fillRect(x, y, w, h);
    drawDots(g, x, y, w, h, 0.3, 12, 2.5);

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
      })
      .setOrigin(1, 0.5);

    this.add
      .text(x + w - 25, y + 192, "24-12-1998", {
        fontFamily: FONT,
        fontSize: "30px",
        color: "#000000",
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
    const btnW = LEFT_W;
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
    g.lineBetween(x, y + HEADER_H, x + w, y + HEADER_H);

    // Bottom strip top border
    g.lineBetween(x, y + h - stripW, x + w, y + h - stripW);

    // Right strip (vertical) — body
    g.lineBetween(x + w - stripW, y + HEADER_H, x + w - stripW, y + h - stripW);

    // Bottom-right corner strip
    g.lineBetween(x + w - stripW, y + h - stripW, x + w, y + h - stripW);

    // Header "???"
    const headerLabel = this.add
      .text(x + w / 2, y + HEADER_H / 2, "???", {
        fontFamily: FONT,
        fontSize: "14px",
        color: "#000000",
      })
      .setOrigin(0.5);

    // Header click zone (ambient dialogue)
    this.ambientIndex = 0;
    const headerZone = this.add
      .zone(x, y, w, HEADER_H)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    headerZone.on("pointerup", () => {
      const text =
        AMBIENT_DIALOGUE[this.ambientIndex % AMBIENT_DIALOGUE.length];
      this.ambientIndex++;
      this.showDialogue(text, false);
    });

    // Dialogue text (typewriter target)
    this.dialogueTextObj = this.add.text(x + 14, y + HEADER_H + 12, "", {
      fontFamily: FONT,
      fontSize: "18px",
      color: "#000000",
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
    const px = RIGHT_X;
    const py = RIGHT_Y + 560;
    const pw = RIGHT_W;
    const ph = 950;
    const stripW = 50;

    // Star fragment dialogue cycling
    this.sfDialogue = [
      "It seems to be a fragment of a star. \nThere is no record of where it came from.",
      "The fragment is giving off unusually high energy.",
      "Where did it come from?",
    ];
    this.sfIndex = 0;

    const g = this.add.graphics();

    // Shadow
    g.fillStyle(0x000000, 1);
    g.fillRect(px + 10, py + 10, pw, ph);

    // White fill
    g.fillStyle(0xffffff, 1);
    g.fillRect(px, py, pw, ph);

    // Outer border
    g.lineStyle(3, 0x000000, 1);
    g.strokeRect(px, py, pw, ph);

    // Header border
    g.lineBetween(px, py + HEADER_H, px + pw, py + HEADER_H);

    // Right strip vertical
    g.lineBetween(px + pw - stripW, py + HEADER_H, px + pw - stripW, py + ph);

    // Bottom strip
    g.lineBetween(px, py + ph - stripW, px + pw, py + ph - stripW);

    // Header text
    this.add
      .text(px + pw / 2, py + HEADER_H / 2, "Dream Archives", {
        fontFamily: FONT,
        fontSize: "30px",
        color: "#000000",
      })
      .setOrigin(0.5);

    // Dots background for body
    const dotsG = this.add.graphics();
    drawDots(
      dotsG,
      px + 2,
      py + HEADER_H + 2,
      pw - stripW - 4,
      ph - HEADER_H - stripW - 4,
      0.3,
      15,
      2.5,
    );

    // Calculate content center
    const contentCenterX = px + (pw - stripW) / 2;
    const contentCenterY = py + HEADER_H + (ph - HEADER_H - stripW) / 2;

    // Fragment field image
    const fieldImg = this.add
      .image(contentCenterX, contentCenterY, "star_fragment_field")
      .setOrigin(0.5);

    fieldImg.setScale(368 / fieldImg.width);

    // Fragment core image (floating)
    const sfCore = this.add
      .image(contentCenterX, contentCenterY, "star_fragment_core")
      .setOrigin(0.5);

    sfCore.setScale(260 / sfCore.width);

    // Floating animation
    this.tweens.add({
      targets: sfCore,
      y: contentCenterY - 4,
      duration: 3000,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: sfCore,
      angle: 1.5,
      duration: 1800,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Sparkles
    const sparkleData = [
      { x: px + 210, y: py + HEADER_H + 65, size: 40, delay: 2800 },
      { x: px + 158, y: py + HEADER_H + 150, size: 42, delay: 2100 },
      { x: px + 300, y: py + HEADER_H + 280, size: 44, delay: 1400 },
      { x: px + 330, y: py + HEADER_H + 470, size: 50, delay: 700 },
      { x: px + 260, y: py + HEADER_H + 620, size: 54, delay: 0 },
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
        duration: 800,
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

    this.cacheChevron = this.add.text(px + 20, py + 820, ">", {
      fontFamily: FONT,
      fontSize: "30px",
      color: "#1916CD",
    });

    this.cacheLabel = this.add.text(px + 50, py + 820, "Dream cache", {
      fontFamily: FONT,
      fontSize: "30px",
      color: "#000000",
    });

    this.cacheValueText = this.add.text(px + 250, py + 820, "", {
      fontFamily: FONT,
      fontSize: "30px",
      color: "#1916CD",
    });

    this.cacheFullText = this.add.text(px + 313, py + 820, "full", {
      fontFamily: FONT,
      fontSize: "30px",
      color: "#000000",
    });

    this.updateCacheLabel();

    const scheduleNextTick = () => {
      this.cacheTimeout = window.setTimeout(
        () => {
          tickCache();
        },
        1200 + Math.random() * 1800,
      );
    };

    const tickCache = () => {
      const previousValue = this.cacheValue;
      const roll = Math.random();

      let change = 0;

      if (roll < 0.03) {
        change = Math.random() < 0.5 ? -6 : 6;
      } else if (this.cacheValue > BASE + 2) {
        change = Math.random() < 0.7 ? -1 : 0;
      } else if (this.cacheValue < BASE - 2) {
        change = Math.random() < 0.7 ? 1 : 0;
      } else {
        if (roll < 0.5) change = 0;
        else if (roll < 0.85) change = Math.random() < 0.5 ? -1 : 1;
        else change = Math.random() < 0.5 ? -2 : 2;
      }

      this.cacheValue = Math.max(
        BASE - 7,
        Math.min(BASE + 7, this.cacheValue + change),
      );

      const valueChanged = this.cacheValue !== previousValue;

      this.updateCacheLabel();

      if (valueChanged && Math.random() < 0.35) {
        this.cacheValueText.setShadow(1, 0, "#4c57ff", 1, false, true);

        window.setTimeout(() => {
          this.cacheValueText?.setShadow(0, 0, "", 0, false, false);
        }, 40);
      }

      scheduleNextTick();
    };

    tickCache();

    this.events.once("shutdown", () => {
      window.clearTimeout(this.cacheTimeout);
    });

    // Click zone for star fragment
    const sfZone = this.add
      .zone(px, py + HEADER_H, pw - stripW, ph - HEADER_H - stripW)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    sfZone.on("pointerup", () => {
      const text = this.sfDialogue[this.sfIndex % this.sfDialogue.length];
      this.sfIndex++;
      this.showDialogue(text, false);
    });
  }

  updateCacheLabel() {
    this.cacheValueText?.setText(`${this.cacheValue}%`);
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
        .image(bx + btnSize / 2, y + btnSize / 2, i === 0 ? "settings" : "help")
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
