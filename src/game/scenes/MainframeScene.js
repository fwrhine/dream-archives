import * as Phaser from 'phaser';
import { ROOM_X, ROOM_Y, ROOM_W, ROOM_H, FONT } from '../constants';

export default class MainframeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainframeScene' });
  }

  create() {
    this.add.rectangle(ROOM_X, ROOM_Y, ROOM_W, ROOM_H, 0x111111).setOrigin(0);
    this.add.text(ROOM_X + ROOM_W / 2, ROOM_Y + ROOM_H / 2, 'Mainframe Bay\n[ coming soon ]', {
      fontFamily: FONT, fontSize: '18px', color: '#ffffff', align: 'center',
    }).setOrigin(0.5);

    this.game.events.emit('room-started', { welcomeText: 'Systems initializing . . .\nAccess pending.' });
  }
}
