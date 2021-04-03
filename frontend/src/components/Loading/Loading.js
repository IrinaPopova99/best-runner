import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading({ isLoading }) {
    return (
        <div>
            {isLoading ? <CircularProgress /> : null}
        </div>
    )
}

export default Loading;
