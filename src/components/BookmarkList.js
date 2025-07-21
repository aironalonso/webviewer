import React from 'react';

const BookmarkList = ({ bookmarks, removeBookmark }) => {
    return (
        <div className="bookmark-list">
            <span>Bookmarks:</span>
            {bookmarks.length === 0 ? <span className="no-bookmarks">No bookmarks yet.</span> :
                <ul>
                    {bookmarks.map((bookmark, index) => (
                        <li key={index}>
                            <a href={bookmark} target="_blank" rel="noopener noreferrer">{new URL(bookmark).hostname}</a>
                            <button className="remove-btn" onClick={() => removeBookmark(bookmark)}>x</button>
                        </li>
                    ))}
                </ul>
            }
            <style jsx>{`
                .bookmark-list {
                    display: flex;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    font-size: 0.9rem;
                }
                .no-bookmarks {
                    margin-left: 0.5rem;
                    color: #777;
                }
                ul {
                    display: flex;
                    list-style: none;
                    padding: 0;
                    margin: 0 0 0 0.5rem;
                    flex-wrap: wrap;
                }
                li {
                    display: flex;
                    align-items: center;
                    padding: 0.25rem 0.5rem;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    margin-right: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                li a {
                    color: #007bff;
                    text-decoration: none;
                    margin-right: 0.5rem;
                }
                li a:hover {
                    text-decoration: underline;
                }
                .remove-btn {
                    padding: 0;
                    font-size: 0.8rem;
                    background-color: transparent;
                    color: #e74c3c;
                    border: none;
                    cursor: pointer;
                    line-height: 1;
                }
                .remove-btn:hover {
                    color: #c0392b;
                }
            `}</style>
        </div>
    );
};

export default BookmarkList;
