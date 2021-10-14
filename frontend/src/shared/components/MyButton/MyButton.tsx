import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import "./MyButton.scss";

type MyButtonType = {
  action?:() => void;
  isDisabled?: boolean;
};

const MyButton: React.FC<MyButtonType & ButtonProps> = ({
  action,
  children,
  isDisabled,
  color,
  type,
}) => (
  <Button
    className={`button ${color ? "" : " button-add"}`}
    variant="contained"
    color={color}
    onClick={action}
    disabled={isDisabled}
    type={type || "button"}
  >
    {children}
  </Button>
);

export default MyButton;
