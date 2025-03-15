interface ButtonProps {
  id: string;
  children: string;
  colour?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  onClick?: () => void;
  onInit?: (buttonIdPositionSize: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
}

function Button({
  id,
  children,
  colour = "primary",
  onClick,
  onInit,
}: ButtonProps) {
  return (
    <div>
      <button
        ref={(el) => {
          if (!el || !onInit) return;
          const positionAndSizeInfo = el.getBoundingClientRect();
          onInit({
            id: id,
            x: positionAndSizeInfo.x,
            y: positionAndSizeInfo.y,
            width: positionAndSizeInfo.width,
            height: positionAndSizeInfo.height,
          });
        }}
        id={id}
        type="button"
        className={"btn btn-" + colour}
        onClick={onClick}
        style={{ margin: "20px" }}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
