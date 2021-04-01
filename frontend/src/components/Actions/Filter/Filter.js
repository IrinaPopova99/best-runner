import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Filter({ labels, selected, setSelected }) {
    const classes = useStyles();

    const isSelected = (id) => {
        return selected.indexOf(id) !== -1;
    }

    const handleClick = (event) => {
        const selectedIndex = selected.indexOf(event.target.name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, event.target.name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    if (labels) {
        labels = labels.filter((v, i, a) => a.indexOf(v, i + 1) === -1);
    }

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Фильтр&nbsp;по:</FormLabel>
                <FormGroup>
                    {labels
                        ? labels.map(item => {
                            const isItemSelected = isSelected(item);
                            return <FormControlLabel
                                key={item}
                                control={<Checkbox
                                    selected={isItemSelected}
                                    checked={isItemSelected}
                                    onClick={handleClick}
                                    name={item}
                                    key={item}
                                />}
                                label={item}
                            />


                        })
                        : null}
                </FormGroup>
            </FormControl>
        </div>
    );
}
