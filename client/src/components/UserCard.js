import React from "react";
import { Avatar, Typography, Stack, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Stack
      className="userCard"
      direction={"row"}
      alignItems={"center"}
      spacing={2}
      sx={{
        cursor: "pointer",
        padding: "10px",
        backgroundColor: "#dbdbdb",
        borderRadius: "10px",
        marginTop: "10px",
      }}
      onClick={() => navigate(`/${user.id}/${user.firstName}${user.lastName}`)}
    >
      <Avatar
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName}${user.lastName}`}
        sx={{ width: "32px", height: "32px" }}
      />
      <Typography>
        {user.firstName} {user.lastName}
      </Typography>
    </Stack>
  );
};

export default UserCard;
