// import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <BrowserRouter>

        <AppRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
