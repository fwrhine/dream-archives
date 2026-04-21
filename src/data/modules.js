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
    dialogue: `Gravity offline . . . \nNothing is expected.`,
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
          `Observing: Sagittarius A*. \nA supermassive black hole. \nIt does not emit light. \nThe motion of nearby stars suggests its presence.`,
          `Observing: Gallifrey. \nA planet with two suns. \nIts inhabitants are reported to have two hearts. \nDetails about its current state are inconsistent.`,
          `Observing: A rogue planet. \nIt does not orbit a star. \nIt moves alone through space.`,
          `Observing: PSR J1748−2446ad. \nA rapidly rotating neutron star. \nIt spins hundreds of times per second. The rotation is extremely stable.`,
          `Observing: Unidentified object. \nIt does not match any known catalogue.`,
        ],
      },
    ],
  },
};
