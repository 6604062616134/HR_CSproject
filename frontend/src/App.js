import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Assign from './pages/assign';
import Project from './pages/project';
import Detail from './pages/detail';
import StaffProject from './pages/staffProject';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <Routes>
          <Route path="/" element={<Assign />} />
          <Route path="/project" element={<Project />} />
          <Route path="/detail/teacher/:id" element={<Detail type="teacher" />} />
          <Route path="/detail/staff/:id" element={<Detail type="staff" />} />
          <Route path="/staffProject" element={<StaffProject />} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;
