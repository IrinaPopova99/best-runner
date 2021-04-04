import { ErrorMessage } from '@hookform/error-message';
import './ErrorMessages.scss';

const ErrorMessages = (props) => (
    <ErrorMessage errors={props.errors} name={props.name}>
        {({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
                <span key={type} className="error-message">{message}</span>
            ))
        }
    </ErrorMessage>
);


export default ErrorMessages;