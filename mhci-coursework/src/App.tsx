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
  const [orderButtonMessageBoxVisible, setOrderButtonMessageBoxVisible] =
    useState(false);

  let order = useRef([
    "YOUR PIZZA: Classic Pizza Base",
    " | Tomato Base Sauce",
  ]);

  const buttonClickFlash = [
    { transform: "scale(1)" },
    { transform: "scale(1.2)" },
    { transform: "scale(1)" },
  ];

  const buttonClickFlashTiming = {
    duration: 100,
    iterations: 1,
  };

  const handleConfirmButtonClick = () => {
    let hoveredElement = document.getElementById(hoveredButtonId.current);
    hoveredElement?.addEventListener("click", () => {
      hoveredElement?.animate(buttonClickFlash, buttonClickFlashTiming);
    });
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
      if (hoveredButtonId.current === "viewButton") {
        setOrderButtonMessageBoxVisible(true);
      } else {
        setConfirmButtonMessageBoxVisible(true);
      }
    } else {
      hoveredButtonId.current = "";
      setConfirmButtonMessageBoxVisible(false);
      setOrderButtonMessageBoxVisible(false);
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

  const handleToppingButton = (topping: string) => {
    order.current.push(topping);
  };

  const handleRemoveButtonClick = () => {
    let topping = order.current.indexOf(" | " + hoveredButtonId.current);
    order.current.length > 2 && topping != -1
      ? order.current.splice(topping, 1)
      : null;
    document
      .getElementById("removeButton")
      ?.animate(buttonClickFlash, buttonClickFlashTiming);
  };

  return (
    <div className="body">
      <h1
        style={{
          backgroundColor: "darkgreen",
          padding: "10px",
          textAlign: "center",
          color: "white",
        }}
      >
        🍕Fast Pizza🍕
      </h1>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>
      )}

      {/* <Button
        id="mb1"
        onClick={() => {
          setAlertVisibility(true);
        }}
        onInit={handleButtonInit}
      >
        My Button
      </Button> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "10px",
          padding: "5vw",
        }}
      >
        <Button
          id="Mozzarella"
          onInit={handleButtonInit}
          colour="light"
          width="40vw"
          height="10vh"
          onClick={() => {
            handleToppingButton(" | Mozzarella");
          }}
        >
          Mozzarella
        </Button>
        <Button
          id="Pepperoni"
          onInit={handleButtonInit}
          colour="light"
          width="40vw"
          height="10vh"
          onClick={() => {
            handleToppingButton(" | Pepperoni");
          }}
        >
          Pepperoni
        </Button>
        <Button
          id="Bacon"
          onInit={handleButtonInit}
          colour="light"
          width="40vw"
          height="10vh"
          onClick={() => {
            handleToppingButton(" | Bacon");
          }}
        >
          Bacon
        </Button>
        <Button
          id="Pineapple"
          onInit={handleButtonInit}
          colour="light"
          width="40vw"
          height="10vh"
        >
          Pineapple
        </Button>
        <Button
          id="Olives"
          onInit={handleButtonInit}
          colour="light"
          width="40vw"
          height="10vh"
          onClick={() => {
            handleToppingButton(" | Olives");
          }}
        >
          Olives
        </Button>
        <Button
          id="Onions"
          onInit={handleButtonInit}
          colour="light"
          width="40vw"
          height="10vh"
          onClick={() => {
            handleToppingButton(" | Onions");
          }}
        >
          Onions
        </Button>
      </div>

      {confirmButtonMessageBoxVisible && (
        <div className="messageBoxWrapper">
          <MessageBox hoveredButtonId={hoveredButtonId.current}></MessageBox>
        </div>
      )}

      {orderButtonMessageBoxVisible && (
        <div className="messageBoxWrapper">
          <MessageBox>{order.current}</MessageBox>
        </div>
      )}

      <div style={{ margin: "auto", padding: "10px", display: "block" }}>
        <Button
          id="viewButton"
          colour="warning"
          onInit={handleButtonInit}
          width="90%"
          height="10vh"
        >
          VIEW PIZZA & PLACE ORDER
        </Button>
      </div>

      {confirmButtonMessageBoxVisible && (
        <div className="confirmButtonWrapper">
          <Button
            id="addButton"
            colour="success"
            onClick={handleConfirmButtonClick}
            width="100px"
            height="50px"
          >
            ADD
          </Button>
          <Button
            id="removeButton"
            colour="danger"
            onClick={handleRemoveButtonClick}
            width="100px"
            height="50px"
          >
            REMOVE
          </Button>
        </div>
      )}

      {orderButtonMessageBoxVisible && (
        <div className="confirmButtonWrapper">
          <Button
            id="placeButton"
            colour="success"
            onClick={() => {
              alert(
                "Thank you for placing your pizza order!! Please now return to the survey to evaluate your experience."
              );
              window.location.reload();
            }}
            width="100px"
            height="60px"
          >
            PLACE ORDER
          </Button>
          <Button
            id="clearButton"
            colour="danger"
            onClick={() => {
              window.location.reload();
            }}
            width="100px"
            height="60px"
          >
            CLEAR ORDER
          </Button>
        </div>
      )}

      <JoystickAndCursor
        onCursorMove={handleCursorMove}
        speed={4}
      ></JoystickAndCursor>
    </div>
  );
}

export default App;
