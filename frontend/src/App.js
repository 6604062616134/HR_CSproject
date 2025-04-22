import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Assign from './pages/assign';
import Grade from './pages/grade';
import Project from './pages/project';
import Detail from './pages/detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <Routes>
          <Route path="/" element={<Assign />} />
          <Route path="/grade" element={<Grade/>} />
          <Route path="/project" element={<Project />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;
