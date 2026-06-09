import * as Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('central_node', '/images/modules/central_node.webp');
    this.load.image('cupola', '/images/modules/cupola.webp');
    this.load.image('cupola_space', '/images/cupola_space.webp');
    this.load.image('star_fragment_core', '/images/star_fragment/star_fragment_core.webp');
    this.load.image('star_fragment_field', '/images/star_fragment/star_fragment_field.webp');
    this.load.image('sparkle', '/images/star_fragment/sparkle.png');
    this.load.image('moon', '/images/moon.png');
    this.load.image('settings', '/icons/settings.png');
    this.load.image('help', '/icons/help.png');

    this.load.audio('blip_1', '/audio/blip_1.mp3');
    this.load.audio('blip_2', '/audio/blip_2.mp3');
    this.load.audio('blip_3', '/audio/blip_3.mp3');
    this.load.audio('blip_4', '/audio/blip_4.mp3');
    this.load.audio('blip_5', '/audio/blip_5.mp3');
  }

  async create() {
    await document.fonts.ready;

    this.scene.launch('UIScene');
    this.scene.launch('CentralNodeScene');
    this.scene.bringToTop('UIScene');
    this.scene.stop();
  }
}
