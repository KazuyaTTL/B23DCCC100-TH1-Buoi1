import React, { useState } from 'react';
import './App.css';

const UNSPLASH_ACCESS_KEY = 'gKb0UolKsOmxOuy3jkBg1vO_UQynvCvHfuw1xlxoVYo'; // Thay thế bằng API key của bạn

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setImages([]);

    if (!query) return;

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        setImages(data.results);
      } else {
        setErrorMessage('Không tìm thấy hình ảnh');
      }
    } catch (error) {
      setErrorMessage('Không tìm thấy hình ảnh');
    }
  };

  return (
    <div className="App">
      <h1>Tìm kiếm hình ảnh</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm hình ảnh"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Tìm</button>
      </form>

      <div className="images-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.urls.regular} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
