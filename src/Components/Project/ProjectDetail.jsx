import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/Project";

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
