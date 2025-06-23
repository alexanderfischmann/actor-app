import React from 'react';
import HomePage from './pages/HomePage';

function App() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return <HomePage onSearch={handleSearch} />;
}

export default App;