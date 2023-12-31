import React from "react";
import {
  Box,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
  Collapse,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";


const SummaryScreen = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [summary,setSummary]=useState("");
  const [error, setError] = useState("");

  
  const summaryHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/openai/summary", { text });
      if (data) {
      
        setSummary(data);
        
      } 
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "80%" : "80%"}
      p="2rem"
      m="2rem auto"
      borderRadius={1}
      backgroundColor={theme.palette.background.alt}
      sx={{ boxShadow: 5 }}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={summaryHandler}>
        <Typography variant="h3">Enter text to summarize</Typography>
        <TextField 
          multiline  = {true}
          placeholder="Enter text to summarize"
          margin="normal"
          width="100%"
          required
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          summarize
        </Button>
      </form>
      <Typography mt={2}>Not the tool you were looking for? <Link href="/">Go back</Link></Typography>
      {summary && (
        <Box mt={2} >
          <Typography variant="h3">Summary</Typography>
          <TextField
            multiline = {true}
            type="textarea"
            margin="normal"
            min-row={10}
            fullWidth
            value={summary}
            editable={false}
          />
        </Box>
      )
      }
    </Box>

  );
};

export default SummaryScreen;
