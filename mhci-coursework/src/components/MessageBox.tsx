interface MessageBoxProps {
  children?: string;
  hoveredButtonId?: string;
}

const messages = {
  mb1: "This is some text for my button 1!",
  mb2: "This is some text for my 2nd button!",
};
const MessageBox = ({
  children = "No message",
  hoveredButtonId,
}: MessageBoxProps) => {
  console.log(hoveredButtonId);
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        position: "absolute",
        borderRadius: "10px",
        bottom: "275px",
        left: "50%",
        transform: "translate(-50%)",
        width: "80%",
      }}
    >
      <p style={{ margin: "10%" }}>
        {
          //@ts-ignore
          hoveredButtonId ? messages[hoveredButtonId] : children
        }
      </p>
    </div>
  );
};

export default MessageBox;
