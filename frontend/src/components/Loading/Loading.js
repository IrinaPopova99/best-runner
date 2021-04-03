import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useStyles } from './LoadingStyles';

function Loading({ isLoading }) {
    const classes = useStyles();

    return (
        <div className={classes.loading}>
            {isLoading ? <LinearProgress /> : <div></div>}
        </div>
    )
}

export default Loading;
