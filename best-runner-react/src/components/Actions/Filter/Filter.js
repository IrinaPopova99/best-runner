import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';

function Filter({styleClass}) {
    return (
        <div className={styleClass}>
            <div>Фильтр:</div>
            <IconButton>
                <FilterListIcon fontSize="large" color="primary" />
            </IconButton>
        </div>
    )
}

export default Filter;
