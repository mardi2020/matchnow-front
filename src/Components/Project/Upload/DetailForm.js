import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput } from "@mui/material";

const categories = [
  {
    value: "NONE",
    label: "분류 없음",
  },
  {
    value: "CONTEST",
    label: "공모전",
  },
  {
    value: "PROJECT",
    label: "팀 프로젝트",
  },
  {
    value: "STUDY",
    label: "스터디",
  },
];

export default function DetailForm({project, handleChange}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        세부 정보
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="category"
            select
            label="카테고리"
            fullWidth
            value={project.category}
            onChange={handleChange('category')}
            variant="outlined"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">최대 인원 수</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={project.wantCnt}
            onChange={handleChange('wantCnt')}
            endAdornment={<InputAdornment position="end">명</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
