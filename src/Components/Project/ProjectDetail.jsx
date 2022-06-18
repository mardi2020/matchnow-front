import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  deleteComment,
  getCommentByProjectId,
  uploadComment,
} from "../../api/Comment";
import {
  editProjectState,
  getProjectById,
  deleteProject,
} from "../../api/Project";

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
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
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

      getCommentByProjectId(params.id)
        .then((res) => {
          setComments(res.data);
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
          <Button
            size="small"
            onClick={() => {
              deleteProject(project.projectId).then((res) => {
                alert(res.data);
                setHasError(true);
              });
            }}
          >
            삭제
          </Button>
        </>
      )}
      {isLoggedIn && project.writer !== user.username && (
        <Link
          to={`/messages/send/${project.writer}`}
          style={{ textDecoration: "none" }}
        >
          <Button size="small">메시지 보내기</Button>
        </Link>
      )}
      <div>제목: {project.title}</div>
      <div>내용: {project.mainText}</div>
      <div>작성자: {project.writer}</div>
      <div>이미지: {project.inputImage}</div>
      <div>정원: {project.wantCnt}</div>
      <div>현재원: {project.nowPeopleCnt}</div>
      <div>상태: {project.state}</div>
      <div>카테고리: {project.category}</div>
      <TextField
        required
        id="commentText"
        name="commentText"
        label="댓글작성"
        fullWidth
        variant="outlined"
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
      />
      <Button
        size="small"
        onClick={() => {
          uploadComment({
            text: commentText,
            projectId: project.projectId,
          }).then((res) => {
            alert(res.data);
            getCommentByProjectId(params.id)
              .then((res) => {
                setComments(res.data);
              })
              .catch((e) => {
                setHasError(true);
              });
          });
        }}
      >
        댓글작성
      </Button>
      {comments.map((comment) => {
        return (
          <div>
            <div>--------------------------</div>
            <div>작성자: {comment.user.username}</div>
            <div>댓글: {comment.text}</div>
            <div>작성일: {comment.createAt}</div>
            {isLoggedIn && comment.user.username === user.username && (
              <Button
                size="small"
                onClick={() => {
                  deleteComment(comment.commentId).then((res) => {
                    alert(res.data);
                    getCommentByProjectId(params.id)
                      .then((res) => {
                        setComments(res.data);
                      })
                      .catch((e) => {
                        setHasError(true);
                      });
                  });
                }}
              >
                삭제
              </Button>
            )}
            <div>--------------------------</div>
          </div>
        );
      })}
    </>
  );
}
