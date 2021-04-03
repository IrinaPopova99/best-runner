import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './MyButtonStyles';

function MyButton({ action, children, isDisabled, color, type }) {
    const classes = useStyles();

    return (
        <Button
            className={`${classes.button} ${color ? '' : classes.buttonAdd}`}
            variant="contained"
            color={color}
            onClick={action}
            disabled={isDisabled}
            type={type || "button"}
        >
            {children}
        </Button>
    )
}

export default MyButton;
