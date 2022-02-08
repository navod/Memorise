import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.bgImage}>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
