interface MessageBoxProps {
  children?: string;
  hoveredButtonId?: string;
}

const MessageBox = ({
  children = "No message",
  hoveredButtonId,
}: MessageBoxProps) => {

  let message;

  switch(hoveredButtonId){
    case "mb1":
      message = "This is some text for my button 1";
      break;
    case "mb2":
      message = "This is some text for my button 2"
      break;
  }

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
          message ? message : children
        }
      </p>
    </div>
  );
};

export default MessageBox;
