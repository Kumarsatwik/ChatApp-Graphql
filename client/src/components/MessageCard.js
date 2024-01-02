import React from "react";
import { Box, Avatar, TextField, Typography } from "@mui/material";

const MessageCard = ({ text, date, direction }) => {
  const dateTime = new Date(date);
  return (
    <Box display="flex" justifyContent={direction}>
      <Box>
        <Typography variant="subtitle2" backgroundColor="white" padding={1}>
          {text}
        </Typography>
        <Typography sx={{ color: "gray", fontSize: "11px",margin:'5px' }}>
          {dateTime.toLocaleTimeString()}
        </Typography>
        {/* <Typography sx={{ color: "gray", fontSize: "10px" }}>{dateTime.toLocaleDateString()}</Typography> */}
      </Box>
    </Box>
  );
};

export default MessageCard;
