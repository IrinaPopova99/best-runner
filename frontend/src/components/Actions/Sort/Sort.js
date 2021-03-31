import React from 'react';
import SortIcon from '@material-ui/icons/Sort';
import IconButton from '@material-ui/core/IconButton';

function Sort({styleClass}) {
    return (
        <div className={styleClass}>
            <div>Сортировка:</div>
            <IconButton>
                <SortIcon fontSize="large" color="primary" />
            </IconButton>
        </div>
    )
}

export default Sort;
