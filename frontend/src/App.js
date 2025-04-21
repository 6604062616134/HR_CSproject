import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Assign from './pages/assign';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <Routes>
          <Route path="/assign" element={<Assign />} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;
