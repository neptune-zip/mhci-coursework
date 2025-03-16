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
  height?: string;
  width?: string;
}

function Button({
  id,
  children,
  colour = "primary",
  onClick,
  onInit,
  height,
  width,
}: ButtonProps) {
  // https://stackoverflow.com/questions/12710905/how-do-i-dynamically-assign-properties-to-an-object-in-typescript
  interface LooseObject {
    [key: string]: any;
  }

  let styleBuilder: LooseObject = { margin: "5px" };
  width ? (styleBuilder.width = width) : null;
  height ? (styleBuilder.height = height) : null;

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
        style={styleBuilder}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
