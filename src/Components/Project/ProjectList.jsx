import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { getProjects, getProjectsByCategory } from "../../api/Project";

const categories = {
  NONE: "분류 없음",
  CONTEST: "공모전",
  PROJECT: "팀 프로젝트",
  STUDY: "스터디",
};

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("NONE");

  useEffect(() => {
    if (selectedCategory === "NONE") {
      getProjects().then((res) => {
        setProjects(res.data);
      });
    } else {
      getProjectsByCategory(selectedCategory).then((res) => {
        setProjects(res.data);
      });
    }
  }, [selectedCategory]);

  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <Grid container justifyContent="flex-end">
        {Object.keys(categories).map((key) => (
          <Button
            disabled={selectedCategory === key}
            key={key}
            size="small"
            onClick={() => {
              setSelectedCategory(key);
            }}
          >
            {categories[key]}
          </Button>
        ))}
      </Grid>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item key={project.projectId} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography>
                  정원: {project.nowPeopleCnt} / {project.wantCnt}
                </Typography>
                <Typography>작성자: {project.writer}</Typography>
                <Typography>
                  카테고리: {categories[project.category]}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">상세보기</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
