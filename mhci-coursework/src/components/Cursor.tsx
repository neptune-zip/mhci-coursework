import { useState } from "react";

interface CursorProps {
  position: { x: number; y: number };
}

const Cursor = ({ position }: CursorProps) => {
  return (
    <div>
      <img
        className="cursor-image"
        src="/Cursor_for_android.png"
        alt="Cursor Pointer"
        style={{
          height: "10%",
          width: "20%",
          position: "absolute",
          left: position.x + "%",
          bottom: position.y + "%",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    </div>
  );
};

export default Cursor;
