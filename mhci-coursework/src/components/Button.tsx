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
  onInit?: (positionSizeInfo: {
    id: string;
    values: { x: number; y: number; width: number; height: number };
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
          const pSI = el.getBoundingClientRect();
          onInit({
            id: id,
            values: {
              x: pSI.x,
              y: pSI.y,
              width: pSI.width,
              height: pSI.height,
            },
          });
        }}
        id={id}
        type="button"
        className={"btn btn-" + colour}
        onClick={onClick}
        style={{ margin: "20px", padding: "10%" }}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
