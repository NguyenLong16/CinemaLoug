// import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './routes/AppRoute';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <BrowserRouter>
        <Header />

        <AppRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
