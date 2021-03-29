import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginBottom: '20px',
        marginRight: '20px',
    },
    buttonAdd: {
        backgroundColor: '#1b7505',
        color: '#fff',
    }
}));

function Buttons({selected, onDelete, onAdd, onEdit}) {
    const classes = useStyles();

    return (
        <div>
            <Button
                className={classes.button} 
                variant="contained" 
                color="secondary" 
                onClick={onDelete}
                disabled={selected.length === 0 ? true : false}
            >
                Удалить
            </Button>
            <Button 
                className={`${classes.button} ${classes.buttonAdd}`} 
                variant="contained" 
                onClick={onAdd}
            >
                Добавить
            </Button>
            <Button 
                className={classes.button} 
                variant="contained" 
                color="primary" 
                onClick={onEdit}
                disabled={selected.length === 0 ? true : false}
            >
                Изменить
            </Button>
        </div>
    )
}

export default Buttons;
