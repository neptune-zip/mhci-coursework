import "./App.css";
import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import { Joystick } from "react-joystick-component";
import JoystickAndCursor from "./components/JoystickAndCursor";

function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const [alertVisible, setAlertVisibility] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>
      )}
      <Button
        onClick={() => {
          setAlertVisibility(true);
        }}
      >
        My Button
      </Button>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      <JoystickAndCursor></JoystickAndCursor>
    </div>
  );
}

export default App;
