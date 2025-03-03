import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import Cursor from "./Cursor";
import "./styles/JoystickAndCursor.css";
import { Joystick } from "react-joystick-component";
import { useState } from "react";

const JoystickAndCursor = () => {
  const [[posX, posY], setPosition] = useState([50, 50]);
  const [started, setStarted] = useState(false);

  const onStart = () => {
    setStarted(true);
  };

  const onMove = (stick: IJoystickUpdateEvent) => {
    // Cast as number to remove problems associated with number | null type.
    let stickX = Number(stick.x);
    let stickY = Number(stick.y);

    if (posX <= 100 && posX >= 0 && posY <= 100 && posY >= 0) {
      setPosition([posX + stickX, posY + stickY]);
    } else {
      let tempX = 50;
      let tempY = 50;

      if (posX >= 100) {
        tempX = 99;
        tempY = posY;
      } else if (posX <= 0) {
        tempX = 1;
        tempY = posY;
      }

      if (posY >= 100) {
        tempY = 99;
        tempX = posX;
      } else if (posY <= 0) {
        tempY = 1;
        tempX = posX;
      }

      setPosition([tempX, tempY]);
    }
  };

  const onStop = () => {
    setStarted(false);
  };

  return (
    <>
      <div className="joystick-wrapper">
        <Joystick
          size={150}
          move={onMove}
          start={onStart}
          stop={onStop}
        ></Joystick>
      </div>
      <Cursor position={{ x: posX, y: posY }} />
    </>
  );
};

export default JoystickAndCursor;
