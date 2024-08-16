const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    description: { type: String },
}, {collection: "300347715-bianca"});

const BookModel = mongoose.model('Book', BookSchema);
module.exports = BookModel;