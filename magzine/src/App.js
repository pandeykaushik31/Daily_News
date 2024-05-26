import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('India');
  const [category, setCategory] = useState('India');
  const apiKey = '8feccc6f46d84b579ccd3f9aad6710ca';

  useEffect(() => {
    fetchArticles(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticles = async (input) => {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apikey=${apiKey}`);
    const jsonData = await res.json();
    setArticles(jsonData.articles);
  };

  const handleSearch = () => {
    fetchArticles(searchTerm);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    fetchArticles(category);
  };

  return (
    <div className="container">
      <nav>
        <div className="logo">
          <h1>Daily News</h1>
          <li id="politics" style={{ color: category === 'politics' ? 'aqua' : 'white' }} onClick={() => handleCategoryClick('politics')}>Politics</li>
          <li id="sports" style={{ color: category === 'sports' ? 'aqua' : 'white' }} onClick={() => handleCategoryClick('sports')}>Sports</li>
          <li id="technology" style={{ color: category === 'technology' ? 'aqua' : 'white' }} onClick={() => handleCategoryClick('technology')}>Technology</li>
        </div>
        <div className="searchBar">
          <input type="text" placeholder="Search Here.." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button id="searchBtn" onClick={handleSearch}>Search</button>
        </div>
      </nav>
      <div className="category">
        <h1>Search: {category}</h1>
      </div>
      <div className="cardData">
        {articles.map((article, index) => (
          <div className="card" key={index} onClick={() => window.open(article.url)}>
            <img src={article.urlToImage} alt="" />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
