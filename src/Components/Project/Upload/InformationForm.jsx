import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function InformationForm({ project, handleChange }) {

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
