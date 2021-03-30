import { ErrorMessage } from '@hookform/error-message';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    errorMessage: {
        color: 'red',
    },
}));

const ErrorMessages = (props) => {
    const classes = useStyles();

    return (
        <ErrorMessage errors={props.errors} name={props.name} className={classes.errorMessage}>
            {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                    <span className={classes.errorMessage} key={type}>{message}</span>
                ))
            }
        </ErrorMessage>
    );
}

export default ErrorMessages;