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
        x: 742,
        y: 236,
        width: 80,
        height: 130,
        dialogue: [
          `A bunny-shaped lamp?`,
          `The lamp is already on.`,
          `You don't remember turning it on.`,
        ],
      },
      {
        id: "orb",
        x: 620,
        y: 80,
        width: 140,
        height: 160,
        dialogue: [`It reflects something.`, `It settles when observed.`],
      },
      {
        id: "computer",
        x: 362,
        y: 310,
        width: 263,
        height: 365,
        dialogue: [`Something is running.`, `Something is being processed.`],
      },
    ],
  },
  observationDeck: {
    id: "observationDeck",
    title: "Observation Deck",
    image: "/images/modules/cupola.webp",
    dialogue: `Gravity offline . . . \nNothing is expected.`,
  },
};
