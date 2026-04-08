import MonitorFlash from "./monitor_flash";

export default function OverlayLayer({ moduleId, interactionEvent }) {
  return (
    <>
      {moduleId === "centralNode" && (
        <MonitorFlash
          trigger={
            interactionEvent?.moduleId === "centralNode" &&
            interactionEvent?.hotspotId === "computer"
              ? interactionEvent.timestamp
              : null
          }
          debug={false}
        />
      )}
    </>
  );
}
