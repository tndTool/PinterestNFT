import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";

interface GlobalLoadingProps {
  isLoading: boolean;
}

const GlobalLoading: React.FC<GlobalLoadingProps> = ({ isLoading }) => {
  const { globalLoading } = useSelector((state: any) => state.globalLoading);

  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  useEffect(() => {
    if (globalLoading) {
      setIsLoadingState(true);
    } else {
      setTimeout(() => {
        setIsLoadingState(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoadingState ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress color="error" />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
