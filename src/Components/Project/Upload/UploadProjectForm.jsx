import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InformationForm from "./InformationForm";
import DetailForm from "./DetailForm";
import { uploadProject } from "../../../api/Project";
import { Navigate } from "react-router-dom";

const steps = ["기본 정보", "세부 설정"];

const theme = createTheme();

export default function UploadProjectForm({ isLoggedIn }) {
  const [activeStep, setActiveStep] = useState(0);

  const [project, setProject] = useState({
    title: "",
    mainText: "",
    wantCnt: 1,
    category: "NONE",
    nowPeopleCnt: 1,
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <InformationForm project={project} handleChange={handleChange} />
        );
      case 1:
        return <DetailForm project={project} handleChange={handleChange} />;
      default:
        return;
    }
  }

  const handleChange = (prop) => (e) => {
    setProject({ ...project, [prop]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleClickUpload = () => {
    uploadProject(project)
      .then((res) => {
        alert(res.data);
        setActiveStep(activeStep + 1);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            프로젝트 올리기
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleClickUpload}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      업로드 하기
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
