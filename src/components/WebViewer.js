// src/components/WebViewer/index.js
import React, { useState, useEffect, useRef } from 'react';
import BookmarkList from './BookmarkList';
import './WebViewer.css';

const WebViewer = ({ addBookmark }) => {
    const [url, setUrl] = useState('https://example.com');
    const [currentUrl, setCurrentUrl] = useState(url);
    const [history, setHistory] = useState([url]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const controlsRef = useRef(null);
    const [iframeMarginTop, setIframeMarginTop] = useState(0);

    useEffect(() => {
        if (controlsRef.current) {
            setIframeMarginTop(controlsRef.current.offsetHeight);
        }
    }, [controlsRef.current]);

    const handleChange = (e) => {
        setUrl(e.target.value);
    };

    const handleNavigate = () => {
        const sanitizedUrl = sanitizeUrl(url);
        if (sanitizedUrl) {
            setLoading(true);
            setCurrentUrl(sanitizedUrl);
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(sanitizedUrl);
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
            setUrl('');
            setError(false);
        } else {
            setError(true);
        }
    };

    const sanitizeUrl = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        try {
            const newUrl = new URL(url);
            return newUrl.href;
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
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentUrl(history[newIndex]);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentUrl(history[newIndex]);
        }
    };

    return (
        <div className="web-viewer-container">
            <div className="controls" ref={controlsRef}>
                <button onClick={goBack} disabled={historyIndex <= 0}>Back</button>
                <button onClick={goForward} disabled={historyIndex >= history.length - 1}>Forward</button>
                <input
                    type="text"
                    value={url}
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleNavigate()}
                    placeholder="Enter URL"
                />
                <button onClick={handleNavigate}>Go</button>
                <button onClick={() => addBookmark(currentUrl)}>Bookmark</button>
            </div>

            <div className="iframe-container" style={{ marginTop: iframeMarginTop }}>
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">This site could not be loaded. Many sites use security policies like <code>Content-Security-Policy</code> or <code>X-Frame-Options</code> to prevent them from being displayed in an iframe.</div>}
                <iframe
                    src={currentUrl}
                    title="Web Viewer"
                    onLoad={handleLoad}
                    onError={handleError}
                />
            </div>
        </div>
    );
};

export default WebViewer;
