import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

const AlertError = ({ error }) => {
    return (
        <div>
            {error
                ? <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="error"
                    children={error} />
                : <div></div>
            }
        </div>
    )
}

export default AlertError;
