import "./App.css";
import { useRef, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import JoystickAndCursor from "./components/JoystickAndCursor";
import MessageBox from "./components/MessageBox";

function App() {
  const buttons: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }[] = [];
  let cursorPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  let hoveredButtonId = useRef<string>("");

  const [alertVisible, setAlertVisibility] = useState(false);
  const [confirmButtonMessageBoxVisible, setConfirmButtonMessageBoxVisible] =
    useState(false);

  const handleConfirmButtonClick = () => {
    console.log(hoveredButtonId.current);
    let hoveredElement = document.getElementById(hoveredButtonId.current);
    hoveredElement?.click();
  };

  const handleCursorMove = (position: { x: number; y: number }) => {
    cursorPosition = position;

    const hovered = buttons.find(
      (button) =>
        cursorPosition.x >= button.x &&
        cursorPosition.x <= button.x + button.width &&
        cursorPosition.y >= button.y &&
        cursorPosition.y <= button.y + button.height
    );

    if (hovered) {
      hoveredButtonId.current = hovered.id;
      setConfirmButtonMessageBoxVisible(true);
    } else {
      hoveredButtonId.current = "";
      setConfirmButtonMessageBoxVisible(false);
    }
  };

  const handleButtonInit = (buttonIdPositionSize: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    buttons.push(buttonIdPositionSize);
  };

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>
      )}
      <Button
        id="mb1"
        onClick={() => {
          setAlertVisibility(true);
        }}
        onInit={handleButtonInit}
      >
        My Button
      </Button>
      <Button id="mb2" onInit={handleButtonInit}>
        My 2nd Button
      </Button>

      {confirmButtonMessageBoxVisible &&
      <MessageBox></MessageBox>
      }
      
      {confirmButtonMessageBoxVisible && (
        <div className="confirmButtonWrapper">
          <Button
            id="confirmButton"
            colour="success"
            onClick={handleConfirmButtonClick}
          >
            ✅
          </Button>
        </div>
      )}

      <section>
        <JoystickAndCursor
          onCursorMove={handleCursorMove}
          speed={3}
        ></JoystickAndCursor>
      </section>
    </div>
  );
}

export default App;
