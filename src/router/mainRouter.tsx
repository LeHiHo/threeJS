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
        <Route path="/two" element={<Two position={new THREE.Vector3(0,0,0)} velocity={new THREE.Vector3(0,0,0)} mass={1} size={1} color="red"/>} />
      </Routes>
  </Router>
  );
};

export default MainRouter;
