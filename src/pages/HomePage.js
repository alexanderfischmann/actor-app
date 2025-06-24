import React, { useState } from 'react';

const TMDB_API_KEY = '3a54f2102173e502e02471f56633fafc'; // 🔐 Replace with your TMDb key

function HomePage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setMovies([]);

    try {
      // Step 1: Search person
      const personRes = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${'3a54f2102173e502e02471f56633fafc'}&query=${encodeURIComponent(query)}`
      );
      const personData = await personRes.json();
      const person = personData.results?.[0];
      if (!person) {
        setError("Person not found");
        return;
      }

      // Step 2: Fetch filmography
      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=${'3a54f2102173e502e02471f56633fafc'}`
      );
      const creditsData = await creditsRes.json();
      const sortedMovies = (creditsData.cast || []).sort((a, b) =>
        (b.release_date || '').localeCompare(a.release_date || '')
      );

      setMovies(sortedMovies);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎬 Actor & Director Movie Finder</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an actor..."
          style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {movies.length > 0 && (
        <div>
          <h2>Filmography:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {movies.map(movie => (
              <li key={movie.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    style={{ marginRight: '1rem', borderRadius: '4px' }}
                  />
                )}
                <div>
                  <strong>{movie.title}</strong> ({movie.release_date?.slice(0, 4)})
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomePage;
