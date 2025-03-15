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
          height: "80px",
          width: "70px",
          position: "absolute",
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    </div>
  );
};

export default Cursor;
