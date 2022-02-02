import React, { useEffect, useState } from "react";
import { Container, Typography, AppBar, Grow, Grid } from "@material-ui/core";
import memorise from "./images/memorise.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className={classes.bgImage}>
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography variant="h2" className={classes.heading} align="center">
            Memorize
          </Typography>
          <img
            src={memorise}
            alt="memorise"
            height={60}
            className={classes.image}
            style={{ objectFit: "contain" }}
          ></img>
        </AppBar>

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
      </Container>
    </div>
  );
};

export default App;
