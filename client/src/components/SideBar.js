import React from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { GET_ALL_USERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

import UserCard from "./UserCard";

const SideBar = ({ setLoggedIn }) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);

  if (loading) return <Typography variant="h6">Loading Chats</Typography>;

  console.log(data);

  if (error) {
    console.log(error);
  }

  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width="250px" padding="10px">
      <Stack direction={"row"} justifyContent={"space-between"} padding={2}>
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon
          onClick={() => {
            setLoggedIn(false);
            localStorage.removeItem("token");
          }}
        />
      </Stack>
      <Divider />
      {data &&
        data?.users.map((user) => {
          return <UserCard user={user} key={user.id} />;
        })}
    </Box>
  );
};

export default SideBar;
