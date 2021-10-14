import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Loading.scss';

const Loading = ({ isLoading }) => (
    <div className="loading">
        {isLoading ? <LinearProgress /> : <div></div>}
    </div>
)

export default Loading;
