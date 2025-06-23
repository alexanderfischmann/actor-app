import React, { useState } from 'react';

function HomePage({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>🎬 Actor & Director Movie Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="Search for an actor or director..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', width: '300px', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          Search
        </button>
      </form>
    </div>
  );
}

export default HomePage;
