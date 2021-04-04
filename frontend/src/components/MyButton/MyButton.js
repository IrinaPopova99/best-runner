import React from 'react';
import Button from '@material-ui/core/Button';
import './MyButton.scss';

const MyButton = ({ action, children, isDisabled, color, type }) => (
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
)

export default MyButton;
