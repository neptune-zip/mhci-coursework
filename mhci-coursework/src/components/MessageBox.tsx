import { ReactNode } from "react";

interface MessageBoxProps {
  children?: ReactNode;
  hoveredButtonId?: string;
}

const MessageBox = ({
  children = "No message",
  hoveredButtonId,
}: MessageBoxProps) => {
  let message;

  switch (hoveredButtonId) {
    case "mb1":
      message = "This is some text for my button 1";
      break;
    case "mb2":
      message = "This is some text for my button 2";
      break;
    case "Mozzarella":
      message = "Our famous mozzarella. Essential for any pizza!";
      break;
    case "Pepperoni":
      message = "Spicy pepperoni. Perfect for any meat lover!";
      break;
    case "Bacon":
      message = "British Bacon. For the sizzle!";
      break;
    case "Pineapple":
      message = "Sweet Pineapple. Love it or hate it, we have it!";
      break;
    case "Olives":
      message = "Black Olives. A juicy med favourite!";
      break;
    case "Onions":
      message = "Diced Red Onion. Crunchy and powerful!";
      break;
    case "viewButton":
      message = "Your Pizza\n - Pepperoni\n - Onion\n - Chicken & Herb";
      break;
  }

  return (
    <>
      <p style={{ margin: "10%" }}>{message ? message : children}</p>
    </>
  );
};

export default MessageBox;
