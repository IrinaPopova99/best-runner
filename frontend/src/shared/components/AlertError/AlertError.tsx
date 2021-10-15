import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

type AlertErrorProps = {
  error: string | null;
};

const AlertError: React.FC<AlertErrorProps> = ({ error }) => {
  return (
    <div>
      {error ? (
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          children={error}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AlertError;
