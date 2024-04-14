import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import One from "@pages/One";
import Two from "@pages/Two";
import * as THREE from 'three';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<One/>} />
      </Routes>
  </Router>
  );
};

export default MainRouter;
