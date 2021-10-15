import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./Loading.scss";

type LoadingProps = {
  isLoading: boolean;
};

const Loading: React.FC<LoadingProps> = ({ isLoading }) => (
  <div className="loading">{isLoading ? <LinearProgress /> : <div></div>}</div>
);

export default Loading;
