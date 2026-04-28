// Modules config
export const modules = {
  centralNode: {
    id: "centralNode",
    title: "Central Node",
    image: "/images/modules/central_node.webp",
    dialogue: `Memory nodes stabilized . . . \nWelcome back.`,
    hotspots: [
      {
        id: "bunnyLamp",
        x: 737,
        y: 236,
        width: 90,
        height: 135,
        dialogue: [
          `A bunny-shaped lamp?`,
          `The lamp is already on.`,
          `You don't remember turning it on.`,
        ],
      },
      {
        id: "orb",
        x: 635,
        y: 90,
        width: 105,
        height: 135,
        dialogue: [`It reflects.`, `It settles when observed.`],
      },
      {
        id: "computer",
        regions: [
          { x: 362, y: 350, width: 85, height: 325 },
          { x: 445, y: 310, width: 100, height: 365 },
          { x: 545, y: 350, width: 80, height: 325 },
        ],
        dialogue: [`Something is running.`, `Something is being processed.`],
      },
      {
        id: "controlPanel",
        regions: [
          { x: 255, y: 420, width: 108, height: 180 },
          { x: 640, y: 420, width: 200, height: 220 },
        ],
        dialogue: [
          `Controls adjusted.\nNo visible change detected.`,
          `Controls adjusted.\nResponse unclear.`,
        ],
      },
      {
        id: "tablet",
        x: 120,
        y: 560,
        width: 110,
        height: 65,
        dialogue: [`It indicates a direction.`, `Where am I going?`],
      },
      {
        id: "keys",
        x: 205,
        y: 415,
        width: 45,
        height: 110,
        dialogue: [
          `This key seems familiar.`,
          `It does not seem to belong here.`,
        ],
      },
      {
        id: "window",
        dialogue: [
          `The stars remain where they are.`,
          `Something continues to sparkle.`,
          `Where am I?`,
        ],
        regions: [
          { x: 0, y: 0, width: 160, height: 30 }, // left window
          { x: 0, y: 30, width: 150, height: 30 },
          { x: 0, y: 60, width: 115, height: 30 },
          { x: 0, y: 90, width: 80, height: 30 },
          { x: 275, y: 140, width: 40, height: 279 }, // central window
          { x: 235, y: 200, width: 40, height: 200 },
          { x: 310, y: 110, width: 55, height: 309 },
          { x: 350, y: 90, width: 95, height: 260 },
          { x: 380, y: 60, width: 220, height: 30 },
          { x: 445, y: 90, width: 100, height: 220 },
          { x: 545, y: 90, width: 90, height: 260 },
          { x: 615, y: 240, width: 120, height: 110 },
          { x: 625, y: 350, width: 110, height: 70 },
          { x: 835, y: 0, width: 160, height: 30 }, // right window
          { x: 845, y: 30, width: 150, height: 30 },
          { x: 880, y: 60, width: 115, height: 30 },
          { x: 915, y: 90, width: 80, height: 30 },
        ],
      },
    ],
  },
  observationDeck: {
    id: "cupola",
    title: "Observation Deck",
    image: "/images/modules/cupola.webp",
    dialogue: `Gravity offline . . . \nNothing is expected of you.`,
    hotspots: [
      {
        id: "telescope",
        x: 260,
        y: 437,
        width: 145,
        height: 135,
        dialogue: [
          `Observing: The Oort Cloud. \nA distant shell of icy objects surrounding the solar system. \nNo one has seen it directly. And yet, it’s here.`,
          `Observing: Voyager 1. \nThe most distant human-made object in existence. \nIt’s been traveling for nearly fifty years. \nIt’s starting to lose power.`,
          `Observing: IC 1101. \nOne of the largest known galaxies. \nIt contains approximately 100 trillion stars. That is . . . 14 zeros.`,
          `Observing: A blue telephone box?`,
          `Observing: WASP-12b. \nA planet orbiting extremely close to its star. \nIts atmosphere is being pulled away. \nIt is slowly coming apart.`,
          `Observing: A rogue planet. \nIt does not orbit a star. \nIt moves alone through space.`,
          `Observing: Unidentified object. \nIt does not match any known catalogue.`,
        ],
      },
      {
        id: "handle",
        dialogue: [`Hold on tight.`],
        regions: [
          { x: 0, y: 130, width: 150, height: 75 }, // left handle
          { x: 850, y: 145, width: 134, height: 70 }, // top right handle
          { x: 790, y: 560, width: 100, height: 100 }, // bottom right handle
        ],
      },
      {
        id: "spaceship",
        x: 870,
        y: 240,
        width: 122,
        height: 280,
        dialogue: [
          `Part of the structure is visible from here.`,
          `The exterior appears intact.`,
        ],
        regions: [
          { x: 820, y: 240, width: 50, height: 280 },
          { x: 870, y: 230, width: 122, height: 290 },
          { x: 870, y: 520, width: 35, height: 30 },
          { x: 905, y: 520, width: 30, height: 55 },
          { x: 935, y: 520, width: 30, height: 70 },
          { x: 965, y: 520, width: 30, height: 35 },
        ],
      },
      {
        id: "window",
        x: 870,
        y: 240,
        width: 122,
        height: 280,
        dialogue: [
          `It goes on and on . . .`,
          `Twinkle, twinkle, little star!`,
          `There is no end.`,
        ],
        regions: [
          { x: 0, y: 219, width: 50, height: 350 }, // left window
          { x: 50, y: 230, width: 50, height: 320 },
          { x: 100, y: 240, width: 65, height: 270 },
          { x: 20, y: 0, width: 360, height: 50 }, // top left window
          { x: 50, y: 50, width: 250, height: 30 },
          { x: 120, y: 80, width: 140, height: 30 },
          { x: 600, y: 0, width: 360, height: 30 }, // top right window
          { x: 650, y: 30, width: 320, height: 30 },
          { x: 700, y: 60, width: 240, height: 30 },
          { x: 740, y: 90, width: 120, height: 30 },
          { x: 390, y: 150, width: 215, height: 40 }, // center window
          { x: 345, y: 190, width: 300, height: 40 },
          { x: 315, y: 230, width: 355, height: 40 },
          { x: 305, y: 270, width: 380, height: 40 },
          { x: 300, y: 310, width: 390, height: 40 },
          { x: 300, y: 350, width: 390, height: 40 },
          { x: 305, y: 390, width: 380, height: 50 },
          { x: 405, y: 440, width: 260, height: 40 },
          { x: 405, y: 480, width: 230, height: 30 },
          { x: 405, y: 510, width: 195, height: 35 },
        ],
      },
    ],
  },
};
