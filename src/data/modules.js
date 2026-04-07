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
        x: 615,
        y: 80,
        width: 150,
        height: 155,
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
      {
        id: "controlPanel",
        x: 640,
        y: 420,
        width: 200,
        height: 220,
        dialogue: [`Something is adjusting.`, `No visible change follows.`],
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
          `These keys seem familiar.`,
          `They don’t seem to belong here.`,
        ],
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
