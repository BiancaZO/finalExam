const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Book = require('./models/Book');

const app = express()

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(cors(
    {
        // The frontend URL goes here
        origin: ["https://localhost:5000"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use(express.json())

// MongoDB connection
const MONGO_URI = 'mongodb+srv://finaluser:12345@cluster0.sb5kqqa.mongodb.net/BookDB?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));


// @route "GET all books"
app.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route "GET a single book by id"
app.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//@rouute "POST a new book"
app.post('/add', async (req, res) => {
    const { bookTitle, bookAuthor, description } = req.body;

    try {
        const newBook = new Book({
            bookTitle,
            bookAuthor,
            description,
        });

        await newBook.save();
        res.json('Book added!');
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});

// @route UPDATE a book by id
app.put('/:id', async (req, res) => {
    try {
        const { bookTitle, bookAuthor, description } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { bookTitle, bookAuthor, description },
            { new: true } // Return the updated book
        );
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// @route DELETE a book by id
app.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})