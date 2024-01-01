import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  // price_1OSWPlAo6JtR4rXKZm1xEdue

  const handleCheckout = async (e) => {
    console.log("handleCheckout called from HomeScreen");
    e.preventDefault();
    try {
      const token = await axios.get("/api/auth/refresh-token");
       console.log( 'token data ->',token.data);
      if (token.data) {
        const config = {headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token.data}` } };
        const sub = await axios.get("/api/auth/subscription", config);
        if (sub.data.subscription) {
          console.log("you already have a subscription");
          navigate("/summary");
        } else {
          const session = await axios.post(
            "api/stripe/checkout",
            { priceId: "price_1OSWPlAo6JtR4rXKZm1xEdue", sub: "normal" },
            config
          );
          console.log("you don't have a subscription");
          console.log(session);
          if (session.data) {
            window.open(session.data.url, "_self");
          }
        }
      } else {
        setError("Please login to continue");
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <Box p={2} m={2}>
      <Typography variant="h3" color="primary" align="center">
        Text Generation
      </Typography>

      <Card onClick={handleCheckout} sx={{ width: "370px", padding: "10px" }}>
        <Stack>
          <DescriptionIcon
            sx={{ fontSize: 70, color: "primary.main", mt: 2, ml: 2 }}
          />
          <Typography fontWeight="bold" variant="h5">
            Text Summary
          </Typography>
          <Typography variant="h6">
            Summarize long and tedious articles into just a few sentences!{" "}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default HomeScreen;
