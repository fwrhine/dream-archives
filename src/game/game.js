import * as Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import UIScene from "./scenes/UIScene";
import CentralNodeScene from "./scenes/CentralNodeScene";
import CupolaScene from "./scenes/CupolaScene";
import MainframeScene from "./scenes/MainframeScene";
import ArchivesScene from "./scenes/ArchivesScene";
import PersonnelScene from "./scenes/PersonnelScene";
import { W, H } from "./constants";

export function createGame(parent) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: W,
    height: H,
    backgroundColor: "#232222",
    parent,
    antialias: true,

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: W,
      height: H,
    },

    scene: [
      BootScene,
      UIScene,
      CentralNodeScene,
      CupolaScene,
      MainframeScene,
      ArchivesScene,
      PersonnelScene,
    ],
  });
}
