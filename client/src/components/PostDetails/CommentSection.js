import { Button, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentRef = useRef();
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));
    console.log(newComment);
    setComments(newComment);
    setComment("");

    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
