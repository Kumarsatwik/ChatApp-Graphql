import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { Box, Avatar, TextField, Typography, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Toolbar from "@mui/material/Toolbar";
import MessageCard from "./MessageCard";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_ALL_MESSAGES } from "../graphql/queries.js";
import { SEND_MSG } from "../graphql/mutations.js";
import { MSG_SUB } from "../graphql/subscription.js";

const ChatScreen = () => {
  const { id, name } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  //  Get All messages by particular user
  const { data, loading, error } = useQuery(GET_ALL_MESSAGES, {
    variables: {
      receiverId: +id,
    },
    onCompleted(data) {
      console.log(data.messagesByUser);
      setMessages(data.messagesByUser);
    },
  });

  

  const [sendMessage] = useMutation(SEND_MSG, {
    onCompleted(data) {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data.createMessage]);
    },
  });

  const { data: subData } = useSubscription(MSG_SUB, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setMessages((prevMessages) => [...prevMessages, data.messageAdded]);
    },
  });
  if (subData) {
    console.log(subData);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f7f7f7", boxShadow: 0 }}
      >
        <Toolbar
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
          }}
        >
          <Avatar
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
            sx={{ width: "32px", height: "32px", mr: 2 }}
          />
          <Typography variant="h6" sx={{ color: "black" }}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        padding={3}
        sx={{ overflowY: "auto" }}
      >
        {loading ? (
          <Typography variant="h6">Loading Chats</Typography>
        ) : (
          messages.map((msg) => {
            return (
              <MessageCard
                text={msg.text}
                date={msg.createdAt}
                direction={msg.senderId === +id ? "start" : "end"}
              />
            );
          })
        )}
      </Box>

      <Stack direction={"row"}>
        <TextField
          placeholder="Enter a message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          sx={{ padding: "10px" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <SendIcon
          fontSize="large"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            sendMessage({ variables: { receiverId: +id, text: text } })
          }
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;
