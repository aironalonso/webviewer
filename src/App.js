import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import WebViewer from "./components/WebViewer";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
      const storedBookmarks = localStorage.getItem('bookmarks');
      if (storedBookmarks) {
          setBookmarks(JSON.parse(storedBookmarks));
      }
  }, []);

  useEffect(() => {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (url) => {
      if (!bookmarks.includes(url)) {
          setBookmarks((prev) => [...prev, url]);
      }
  };

  const removeBookmark = (bookmarkToRemove) => {
      setBookmarks(bookmarks.filter(b => b !== bookmarkToRemove));
  }

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/viewer" element={<WebViewer addBookmark={addBookmark} />} />
          </Routes>
        </main>
        <Footer bookmarks={bookmarks} removeBookmark={removeBookmark} />
      </div>
    </Router>
  );
}

export default App;
