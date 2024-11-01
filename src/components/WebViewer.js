// src/components/WebViewer/index.js
import React, { useState } from 'react';
import BookmarkList from './BookmarkList';

const WebViewer = () => {
    const [url, setUrl] = useState('https://example.com');
    const [currentUrl, setCurrentUrl] = useState(url);
    const [history, setHistory] = useState([url]);
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setUrl(e.target.value);
    };

    const handleNavigate = () => {
        const sanitizedUrl = sanitizeUrl(url);
        if (sanitizedUrl) {
            setLoading(true);
            setCurrentUrl(sanitizedUrl);
            setHistory((prev) => [...prev, sanitizedUrl]);
            setUrl('');
            setError(false);
        } else {
            setError(true);
        }
    };

    const sanitizeUrl = (url) => {
        try {
            const newUrl = new URL(url);
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:' ? newUrl.href : null;
        } catch {
            return null;
        }
    };

    const handleLoad = () => {
        setLoading(false);
        setError(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    const goBack = () => {
        if (history.length > 1) {
            const newHistory = [...history.slice(0, -1)];
            setHistory(newHistory);
            setCurrentUrl(newHistory[newHistory.length - 1]);
        }
    };

    const addBookmark = () => {
        setBookmarks((prev) => [...prev, currentUrl]);
    };

    return (
        <div>
            <h1>Web Viewer</h1>
            <input
                type="text"
                value={url}
                onChange={handleChange}
                placeholder="Enter URL"
            />
            <button onClick={handleNavigate}>Go</button>
            <button onClick={goBack} disabled={history.length <= 1}>Back</button>
            <button onClick={addBookmark}>Bookmark</button>

            {loading && <p>Loading...</p>}
            {error && <p>Error loading the site. Please check the URL and try again.</p>}

            <iframe
                src={currentUrl}
                title="Web Viewer"
                width="100%"
                height="600px"
                onLoad={handleLoad}
                onError={handleError}
                style={{ border: '1px solid #ccc' }}
            />

            <BookmarkList bookmarks={bookmarks} />
        </div>
    );
};

export default WebViewer;
