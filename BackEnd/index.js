const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./Book')

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BOOKS', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log(error));

// Define a sample route
app.get('/api/sample', (req, res) => {
    res.json({ message: 'Sample API route' });
});




// Create a new book
app.post('/api/books', (req, res) => {
    const { bookname, authorname } = req.body;
    const book = new Book({ bookname, authorname });

    book.save()
        .then(() => {
            res.json({ message: 'Book created successfully' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get all books
app.get('/api/books', (req, res) => {
    Book.find()
        .then(books => {
            res.json(books);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get a single book by ID
app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;

    Book.findById(id)
        .then(book => {
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Update a book
app.patch('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { bookname, authorname } = req.body;

    Book.findByIdAndUpdate(id, { bookname, authorname })
        .then(() => {
            res.json({ message: 'Book updated successfully' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;

    Book.findByIdAndRemove(id)
        .then(() => {
            res.json({ message: 'Book deleted successfully' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
