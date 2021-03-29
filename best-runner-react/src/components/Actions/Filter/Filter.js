import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';

function Filter() {
    return (
        <div>
            Фильтр:
            <IconButton>
                <FilterListIcon fontSize="large" color="primary" />
            </IconButton>
        </div>
    )
}

export default Filter;
