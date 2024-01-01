import React from "react";
import { Box, Link, Typography, useTheme,Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState } from "react";


const NavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("authToken"))
  );

  const logoutHandler = async () => {
    console.log("logoutHandler called");
    try {
      await axios.post("/api/auth/logout").then((res) => fullyLogout(res));
    } catch (error) {
      console.log(error);
    }
    navigate("/login");
  };

  const createPortal = async () => {
    try {
      const token = await axios.get("/api/auth/refresh-token");
      if (token.data) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.data}`,
          },
        };
        const customerID = await axios.get(
          "api/auth/customer",
          config
        );
        if (customerID.data) {
          const customerId  = customerID.data.customerId;
          console.log(customerId);
          const portal = await axios.post("/api/stripe/portal", { customerId: customerId }, config);
          if (portal.data.url) {
            window.open(portal.data.url,"_self");
        }
        else{
          console.log('no portal data',portal.data);
        }
      }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkSub = (data) => {
    if (data.subscription) {
      localStorage.setItem("sub", data.subscription);
    } else {
      localStorage.removeItem("sub");
    }
  };

  const checkRefresh = async () => {
    console.log("checkRefresh called");
    try {
      const token = await axios.get("/api/auth/refresh-token");
      if (!token.data) {
        console.log("no token data");
        localStorage.removeItem("authToken");
        setLoggedIn(false);
        logoutHandler();
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.data}`,
          },
        };
        console.log("token data ->", config.headers);
        await axios
          .get("/api/auth/subscription", config)
          .then((res) => checkSub(res.data));
      }
    } catch (err) {
      navigate("/login");
      setLoggedIn(false);
      console.log(err);
    }
  };

  const fullyLogout = (res) => {
    if (res.data.success) {
      localStorage.removeItem("authToken");
      window.location.reload();
    }
  };
  checkRefresh();

  return (
    <Box
      width="100%"
      backgroundColor={theme.palette.background.alt}
      color="primary.contrastText"
      padding="1rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      textAlign="center"
      sx={{ boxShadow: 3 }}
    >
      <Link href="/" p={1}>
        {" "}
        <Typography variant="h4" color="primary" fontWeight="bold">
          Yacine AI
        </Typography>
      </Link>

      {loggedIn ? (
        <div>
                <Button  onClick={createPortal}>
                billing
              </Button>
        <Link href="/" onClick={logoutHandler}>
          Logout
        </Link>
        </div>
      ) : (
        <div>
          <Link href="register" p={1}>
            Register
          </Link>
          <Link href="login" p={1}>
            Login
          </Link>{" "}
        </div>
      )}
    </Box>
  );
};

export default NavBar;
