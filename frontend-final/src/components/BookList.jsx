import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

// http://localhost:5000

const BookList = () => {
    const [books, setBooks] = useState([]);
    https://rafael-300335322-api.vercel.app/
    useEffect(() => {
        axios.get('http://localhost:5000')
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    }, []);

    // Update the state by removing the deleted book
    const handleDeleteBook = (id) => {
        setBooks(books.filter(book => book._id !== id));
    };

    const bookList =
    books.length === 0
      ? 'there is no book record!'
      : books.map((book, k) => (
        <BookCard 
            book={book} 
            key={k}
            onDelete={handleDeleteBook} />));

    return (

        <div className='BookList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Books List</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <Link
                                to="/create-book"
                                className="btn btn-info"
                            >
                                + Add New Book
                            </Link>
                        </div>
                    </div>
                           </div>

                    <br />
                    <hr />

                <div className='list'>{bookList}</div>

            </div>

        </div>
    )
};

export default BookList;