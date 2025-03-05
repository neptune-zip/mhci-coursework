import "./App.css";
import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import JoystickAndCursor from "./components/JoystickAndCursor";

function App() {
  //const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const buttons: { [key: string]: Object } = {};
  let cursorPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  let hoveredButtonId = "";

  const cities = [
    { id: "mb1", x: 20, y: 20, width: 154, height: 104 },
    { id: "mb2", x: 20, y: 164, width: 185.484375, height: 104 },
  ];

  const [alertVisible, setAlertVisibility] = useState(false);
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleConfirmButtonClick = () => {
    let hoveredElement = document.getElementById("mb1");
    hoveredElement?.click();
  };

  const handleCursorMove = (position: { x: number; y: number }) => {
    cursorPosition = position;

    const hovered = cities.find(
      (city) =>
        cursorPosition.x >= city.x &&
        cursorPosition.x <= city.x + city.width &&
        cursorPosition.y >= city.y &&
        cursorPosition.y <= city.y + city.height
    );

    if (hovered) {
      hoveredButtonId = hovered.id;
    }
  };

  const handleButtonInit = (positionSizeInfo: {
    id: string;
    values: { x: number; y: number; width: number; height: number };
  }) => {
    buttons[positionSizeInfo.id] = positionSizeInfo.values;
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
      {/* <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      /> */}
      <Button id="confirmButton" onClick={handleConfirmButtonClick}>
        ✅
      </Button>
      <JoystickAndCursor
        onCursorMove={handleCursorMove}
        speed={3}
      ></JoystickAndCursor>
    </div>
  );
}

export default App;
