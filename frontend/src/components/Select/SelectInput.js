import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useStyles } from './SelectInputStyles';

function SelectInput({ selected, setSelected, labelText, data }) {
    const classes = useStyles();

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <FormControl>
            <span className={classes.labelText}>
                {labelText}
            </span>
            <Select
                value={selected}
                onChange={handleChange}
                inputProps={{
                    id: 'select-multiple-native',
                }}
            >
                {data.map((item, index) => (
                    <MenuItem value={index + 1} key={index + 1}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectInput;
