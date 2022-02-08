import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "../../styles";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

export default function Home() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
