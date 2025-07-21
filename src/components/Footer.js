import React from 'react';
import BookmarkList from './BookmarkList';

const Footer = ({ bookmarks, removeBookmark }) => {
    return (
        <footer>
            <BookmarkList bookmarks={bookmarks} removeBookmark={removeBookmark} />
            <p>&copy; 2025 Web Viewer</p>
        </footer>
    )
};

export default Footer;