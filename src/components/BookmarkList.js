import React from 'react';

const BookmarkList = ({ bookmarks }) => {
    return (
        <div>
            <h2>Bookmarks</h2>
            <ul>
                {bookmarks.map((bookmark, index) => (
                    <li key={index}>
                        <a href={bookmark} target="_blank" rel="noopener noreferrer">{bookmark}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookmarkList;
