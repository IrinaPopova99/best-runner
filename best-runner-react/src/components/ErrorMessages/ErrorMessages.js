import { ErrorMessage } from '@hookform/error-message';

const ErrorMessages = (props) => {
    return (
        <div className="error-message">
            <ErrorMessage errors={props.errors} name={props.name}>
                {({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                    ))
                }
            </ErrorMessage>
        </div>
    );
}

export default ErrorMessages;