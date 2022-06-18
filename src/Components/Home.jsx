import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ProjectList from "./Project/ProjectList";

export default function Home({ isLoggedIn }) {
  return (
    <>
      <Grid container justifyContent="flex-end">
        {isLoggedIn && (
          <Link to="/upload" style={{ textDecoration: "none" }}>
            <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              프로젝트 올리기
            </Button>
          </Link>
        )}
      </Grid>
      <ProjectList />
    </>
  );
}
