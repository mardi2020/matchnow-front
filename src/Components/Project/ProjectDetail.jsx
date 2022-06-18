import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { editProjectState, getProjectById } from "../../api/Project";

const categories = [
  {
    value: "RECRUITING",
    label: "모집중",
    index: 0,
  },
  {
    value: "COMPLETED",
    label: "완료",
    index: 1,
  },
  {
    value: "CANCELED ",
    label: "취소",
    index: 2,
  },
];

export default function ProjectDetail({ isLoggedIn, user }) {
  const params = useParams();
  const [project, setProject] = useState({});
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (params.id && Number(params.id)) {
      getProjectById(params.id)
        .then((res) => {
          setProject(res.data);
        })
        .catch((e) => {
          setHasError(true);
        });
    }
  }, [params]);

  if (!params?.id || hasError || !Number(params?.id)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoggedIn && project.writer === user.username && (
        <>
          <Link
            to={`/projects/edit/${project.projectId}`}
            style={{ textDecoration: "none" }}
          >
            <Button size="small">수정하기</Button>
          </Link>
          <TextField
            id="category"
            select
            label="상태변경"
            onChange={(e) => {
              editProjectState(project.projectId, e.target.value).then(
                (res) => {
                  setProject({
                    ...project,
                    state: categories[e.target.value].value,
                  });
                }
              );
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.index}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
      <div>{project.title}</div>
      <div>{project.mainText}</div>
      <div>{project.writer}</div>
      <div>{project.inputImage}</div>
      <div>{project.wantCnt}</div>
      <div>{project.nowPeopleCnt}</div>
      <div>{project.state}</div>
      <div>{project.category}</div>
    </>
  );
}
