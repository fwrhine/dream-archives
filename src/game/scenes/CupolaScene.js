import * as Phaser from 'phaser';
import { ROOM_X, ROOM_Y, ROOM_W, ROOM_H, FONT } from '../constants';
import { modules } from '../../data/modules';

const MODULE = modules.observationDeck;

export default class CupolaScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CupolaScene' });
  }

  create() {
    // Rotating space backdrop (behind room image)
    const space = this.add.image(ROOM_X + ROOM_W / 2, ROOM_Y + ROOM_H / 2, 'cupola_space')
      .setDisplaySize(ROOM_H * 1.5, ROOM_H * 1.5)
      .setAlpha(0.8);

    this.tweens.add({
      targets: space,
      angle: 360,
      duration: 1000000,
      repeat: -1,
      ease: 'Linear',
    });

    // Room background (on top of space)
    this.add.image(ROOM_X, ROOM_Y, 'cupola')
      .setOrigin(0, 0)
      .setDisplaySize(ROOM_W, ROOM_H);

    // Title bar
    this.createTitleBar();

    // Ambient click zone (whole room background)
    const ambientZone = this.add.zone(ROOM_X, ROOM_Y, ROOM_W, ROOM_H).setOrigin(0).setInteractive();
    ambientZone.on('pointerup', () => {
      this.game.events.emit('hotspot-click', {
        id: 'observation-ambient',
        dialogue: [
          'You can stay for a moment.',
          'You are drifting.',
          'Everything is as it should be.',
        ],
      });
    });

    // Hotspot zones (registered on top, overriding ambient)
    this.registerHotspots();

    this.game.events.emit('room-started', { welcomeText: MODULE.dialogue });
  }

  createTitleBar() {
    const barH = 34;
    const g = this.add.graphics();

    g.fillStyle(0xffffff, 1);
    g.fillRect(ROOM_X, ROOM_Y - barH, ROOM_W, barH);
    g.lineStyle(2, 0x000000, 1);
    g.strokeRect(ROOM_X, ROOM_Y - barH, ROOM_W, barH);

    const cx = ROOM_X + ROOM_W / 2;
    const cy = ROOM_Y - barH / 2;

    this.add.text(cx - 80, cy, '✧', { fontFamily: FONT, fontSize: '14px', color: '#000000' }).setOrigin(0.5);
    this.add.text(cx, cy, MODULE.title, { fontFamily: FONT, fontSize: '17px', color: '#000000', fontStyle: 'bold' }).setOrigin(0.5);
    this.add.text(cx + 80, cy, '✧', { fontFamily: FONT, fontSize: '14px', color: '#000000' }).setOrigin(0.5);

    const g2 = this.add.graphics();
    g2.lineStyle(2, 0x000000, 1);
    g2.lineBetween(ROOM_X + 8, cy, cx - 95, cy);
    g2.lineBetween(cx + 95, cy, ROOM_X + ROOM_W - 8, cy);
  }

  registerHotspots() {
    MODULE.hotspots.forEach(spot => {
      const regions = spot.regions ?? [{ x: spot.x, y: spot.y, width: spot.width, height: spot.height }];

      regions.forEach(r => {
        const zone = this.add.zone(ROOM_X + r.x, ROOM_Y + r.y, r.width, r.height)
          .setOrigin(0)
          .setInteractive({ useHandCursor: true });

        zone.on('pointerup', () => {
          this.game.events.emit('hotspot-click', { id: spot.id, dialogue: spot.dialogue });
        });
      });
    });
  }
}
