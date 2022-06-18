import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { editProject, getProjectById } from "../../api/Project";
import { Navigate, useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";

const theme = createTheme();

export default function ProjectEdit({ isLoggedIn, user }) {
  const params = useParams();
  const [hasError, setHasError] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [project, setProject] = useState({});

  useEffect(() => {
    if (params.id && Number(params.id)) {
      getProjectById(params.id)
        .then((res) => {
          if (Number(res.data.projectId) !== Number(params.id)) {
            setHasError(true);
          } else if (res.data.writer !== user.username) {
            setHasError(true);
          } else {
            setProject({
              title: res.data.title,
              mainText: res.data.mainText,
              inputImage: res.data.inputImage,
              category: res.data.category,
            });
          }
        })
        .catch((e) => {
          setHasError(true);
        });
    }
  }, [params, user]);

  const handleChange = (prop) => (e) => {
    setProject({ ...project, [prop]: e.target.value });
  };

  const handleClickUpload = () => {
    console.log(project)
    editProject(params.id, project)
      .then((res) => {
        alert(res.data);
        setUpdated(true);
      })
      .catch((e) => {
        alert(e);
      });
  };

  if (!isLoggedIn || !params?.id || hasError || !Number(params?.id)) {
    return <Navigate to="/" />;
  }

  if (updated) {
    return <Navigate to={`/projects/${params.id}`} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            프로젝트 수정
          </Typography>
          <>
            <>
              <Typography variant="h6" gutterBottom>
                기본 정보
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
                    value={project.title}
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
                    value={project.mainText}
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
                수정하기
              </Button>
            </Box>
          </>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
