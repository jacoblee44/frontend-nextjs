import React from 'react';
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      className={"no-transition"}
      sx={{
      textAlign: "center",
      '& *': {
        transition: 'none !important!',
      }
    }}>
      <CircularProgress style={{
        color: "#6D5086",
        width: 30,
        height: 30,
      }} />
    </Box>
  );
};

export { Loader };
