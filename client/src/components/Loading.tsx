import React from "react";

interface LoadingProps {
  message?: string;
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  isLoading,
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="position-fixed top-0 left-0 w-100 h-100 z-index-9999 d-flex justify-content-center align-items-center flex-column loading-overlay">
      <div className="loading-spinner" />
      <div className="font-weight-bold text-danger fs-6 mt-1">{message}</div>
    </div>
  );
};

export default Loading;
