import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import Cursor from "./Cursor";
import "./styles/JoystickAndCursor.css";
import { Joystick } from "react-joystick-component";
import { useEffect, useState } from "react";

interface JoystickAndCursorProps {
  onCursorMove: (position: { x: number; y: number }) => void;
  speed?: number;
}

const JoystickAndCursor = ({
  onCursorMove,
  speed = 1,
}: JoystickAndCursorProps) => {
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;

  const [[posX, posY], setPosition] = useState([vpWidth / 2, vpHeight / 2]);
  // const [started, setStarted] = useState(false);

  // const onStart = () => {
  //   setStarted(true);
  // };

  const onMove = (stick: IJoystickUpdateEvent) => {
    // Cast as number to remove problems associated with number | null type.
    let stickX = Number(stick.x);
    let stickY = Number(stick.y);

    if (posX <= vpWidth && posX >= 0 && posY <= vpHeight && posY >= 0) {
      setPosition([posX + stickX * speed, posY - stickY * speed]);
    } else {
      let tempX = vpWidth / 2;
      let tempY = vpHeight / 2;

      if (posX >= vpWidth) {
        tempX = vpWidth - 0.1;
        tempY = posY;
      } else if (posX <= 0) {
        tempX = 0.1;
        tempY = posY;
      }

      if (posY >= vpHeight) {
        tempY = vpHeight - 0.1;
        tempX = posX;
      } else if (posY <= 0) {
        tempY = 0.11;
        tempX = posX;
      }

      setPosition([tempX, tempY]);
    }
  };

  // const onStop = () => {
  //   setStarted(false);
  // };

  useEffect(() => {
    onCursorMove({ x: posX, y: posY });
  }, [posX, posY]);

  return (
    <>
      <div className="joystick-wrapper">
        <Joystick
          size={150}
          move={onMove}
          // start={onStart}
          // stop={onStop}
        ></Joystick>
      </div>
      <Cursor position={{ x: posX, y: posY }} />
    </>
  );
};

export default JoystickAndCursor;
