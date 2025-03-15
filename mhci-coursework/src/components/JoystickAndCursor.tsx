import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import Cursor from "./Cursor";
import "./styles/JoystickAndCursor.css";
import { Joystick } from "react-joystick-component";
import { useEffect, useRef, useState } from "react";

interface JoystickAndCursorProps {
  onCursorMove: (position: { x: number; y: number }) => void;
  speed?: number;
}

const JoystickAndCursor = ({
  onCursorMove,
  speed = 1,
}: // onClick,
// onClickEnd,
JoystickAndCursorProps) => {
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;

  const stickX = useRef(0);
  const stickY = useRef(0);
  const animationFrameId = useRef(0);

  const [[posX, posY], setPosition] = useState([vpWidth / 2, vpHeight / 2]);

  const onMove = (stick: IJoystickUpdateEvent) => {
    // Cast as number to remove problems associated with number | null type.
    stickX.current = Number(stick.x);
    stickY.current = Number(stick.y);
  };

  const setCursorPositionWithinBounds = () => {
    setPosition(([posX, posY]) => {
      let newPosX = posX + stickX.current * speed;
      let newPosY = posY - stickY.current * speed;

      if (
        newPosX <= vpWidth &&
        newPosX >= 0 &&
        newPosY <= vpHeight &&
        newPosY >= 0
      ) {
        return [newPosX, newPosY];
      } else {
        let tempX = vpWidth / 2;
        let tempY = vpHeight / 2;

        if (newPosX >= vpWidth) {
          tempX = vpWidth - 0.1;
          tempY = posY;
        } else if (newPosX <= 0) {
          tempX = 0.1;
          tempY = posY;
        }

        if (newPosY >= vpHeight) {
          tempY = vpHeight - 0.1;
          tempX = posX;
        } else if (newPosY <= 0) {
          tempY = 0.11;
          tempX = posX;
        }

        return [tempX, tempY];
      }
    });
  };

  useEffect(() => {
    onCursorMove({ x: posX, y: posY });
  }, [posX, posY]);

  const handleJoystickClick = () => {
    //console.log("click'd");
    console.log(
      posX,
      // stickX.current,
      posY
      // stickY.current
    );
    setCursorPositionWithinBounds();
    animationFrameId.current = requestAnimationFrame(handleJoystickClick);
  };

  const handleJoystickClickEnd = () => {
    console.log("not click'd");
    //stickClick.current = false;
    cancelAnimationFrame(animationFrameId.current);
  };

  return (
    <>
      <div
        className="joystick-wrapper"
        onMouseDown={handleJoystickClick}
        onTouchStart={handleJoystickClick}
        onMouseUp={handleJoystickClickEnd}
        onTouchEnd={handleJoystickClickEnd}
      >
        <Joystick
          size={150}
          move={onMove}
          baseImage="/arrows_only.png"
          stickImage="/finger_only.png"
          stickSize={80}
        ></Joystick>
      </div>
      <Cursor position={{ x: posX, y: posY }} />
    </>
  );
};

export default JoystickAndCursor;
