import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "../../styles";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import ChipInput from "material-ui-chip-input";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Home() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const query = useQuery();

  const navigate = useNavigate();

  const [currentId, setCurrentId] = useState(0);

  const page = query.get("page") || 1;

  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");

  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts(page));
  }, [currentId, dispatch]);

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchText=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  console.log("Home", page);
  const handleAdd = tag => setTags([...tags, tag]);

  const handleDelete = tagToDelete =>
    setTags(tags.filter(tag => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memorise"
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
