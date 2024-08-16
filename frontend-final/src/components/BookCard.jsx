import axios from 'axios';
import React from 'react';

const BookCard = ({ book, onDelete }) => {

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/${book._id}`);
            onDelete(book._id);
        } catch (err) {
            console.error('Error deleting book', err);
        }
    };

    return (
        <div className='list'>
            <div className="card-container">
                <img 
                    src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d" 
                    alt="Books"
                    height="200"
                />
                <div className='desc'>
                    <h2><a href={`/show-book/123id`}>{book.bookTitle}</a></h2>
                    <h3>{book.bookAuthor}</h3>
                    <p>{book.description}</p>
                </div>
                <button className='delete-btn' type='submit' onClick={handleDelete}>X</button>

            </div>

        </div>

    )
};

export default BookCard;