import {
  Button,
  createTheme,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { sendMessage } from "../../api/Message";

const theme = createTheme();

export default function MessageSend({ isLoggedIn, user }) {
  const { receiver } = useParams();
  const [hasError, setHasError] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [message, setMessage] = useState({
    receiver: receiver,
    title: "",
    mainText: "",
  });

  const handleChange = (prop) => (e) => {
    setMessage({ ...message, [prop]: e.target.value });
  };

  const handleClickUpload = () => {
    sendMessage(message)
      .then((res) => {
        alert(res.data);
        setUpdated(true);
      })
      .catch((e) => {
        alert(e);
        setHasError(true);
      });
  };

  if (!isLoggedIn || !receiver || hasError) {
    return <Navigate to="/" />;
  }

  if (updated) {
    return <Navigate to={`/messages/send`} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            메시지 보내기
          </Typography>
          <>
            <>
              <Typography variant="h6" gutterBottom>
                {receiver}에게
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="타이틀"
                    fullWidth
                    autoComplete="title"
                    variant="outlined"
                    value={message.title}
                    onChange={handleChange("title")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    multiline
                    id="mainText"
                    name="mainText"
                    label="내용"
                    fullWidth
                    variant="outlined"
                    rows={10}
                    value={message.mainText}
                    onChange={handleChange("mainText")}
                  />
                </Grid>
              </Grid>
            </>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleClickUpload}
                sx={{ mt: 3, ml: 1 }}
              >
                메시지 보내기
              </Button>
            </Box>
          </>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
