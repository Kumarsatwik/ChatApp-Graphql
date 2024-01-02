import React from "react";
import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import { SIGNUP_USER, SIGNIN_USER } from "../graphql/mutations";

const AuthScreen = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({});
  const [showLogin, setShowLogin] = useState(true);
  const formRef = useRef(null);
  const [
    SignupUser,
    { data: signupData, loading: loadingSignup, error: signupError },
  ] = useMutation(SIGNUP_USER);

  const [
    SigninUser,
    { data: signinData, loading: loadingSignin, error: signinError },
  ] = useMutation(SIGNIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.signinUser.token);
      setLoggedIn(true);
      // formRef.current.reset();
      // setShowLogin(true);
    },
  });

  if (loadingSignup || loadingSignin) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        gap={2}
      >
        <CircularProgress />
        <Typography variant="h6">Authenticating ...</Typography>
      </Box>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showLogin) {
      SigninUser({ variables: { userSignin: formData } });
    } else {
      SignupUser({ variables: { userNew: formData } });
    }
  };

  return (
    <Box
      component="form"
      ref={formRef}
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card variant="outlined" sx={{ padding: "10px" }}>
        <Stack sx={{ width: "400px" }} direction="column">
          {signupData && (
            <Alert severity="success">
              {signupData.signupUser.firstName} Signed Up
            </Alert>
          )}
          {signupError && <Alert severity="error">{signupError.message}</Alert>}
          {signinError && <Alert severity="error">{signinError.message}</Alert>}

          <Typography variant="h5">
            Please {showLogin ? "Login" : "Signup"}
          </Typography>
          {!showLogin && (
            <>
              <TextField
                type="text"
                name="firstName"
                label="FirstName"
                variant="standard"
                onChange={handleChange}
                required
              />
              <TextField
                type="text"
                name="lastName"
                label="LastName"
                variant="standard"
                onChange={handleChange}
                required
              />
            </>
          )}

          <TextField
            type="email"
            name="email"
            label="Email"
            variant="standard"
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="standard"
            onChange={handleChange}
            required
          />
          <Button variant="outlined" type="submit">
            {!showLogin ? "Signup" : "Login"}
          </Button>
          <Typography
            textAlign={"center"}
            variant="subtitle1"
            marginTop={"10px"}
            color={"gray"}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              setShowLogin(!showLogin);
              setFormData({});
              formRef.current.reset();
            }}
          >
            {showLogin ? "Signup" : "Login"} ?
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthScreen;
