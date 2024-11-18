"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C8102E",
    },
    secondary: {
      main: "#FFFFFF",
    },
    text: {
      primary: "#C8102E",
      secondary: "#4F4F4F",
    },
  },
});

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.name));
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      console.log("Sign up success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup Failed");
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        padding="2rem"
        sx={{
          backgroundImage: `url("/thecollegetouruniversityofhouston_opengraph.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: "2rem", maxWidth: "400px", width: "100%" }}
        >
          <Toaster />
          <Typography variant="h4" color="primary" gutterBottom align="center">
            Sign Up
          </Typography>

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            sx={{ mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Sign Up"
            )}
          </Button>

          <Link href="/login" passHref>
            <Button fullWidth variant="text" color="primary">
              Already have an account? Log in
            </Button>
          </Link>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
