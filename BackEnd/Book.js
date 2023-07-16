const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    authorname: {
        type: String,
        required: true
    }
})


const Book = mongoose.model('Book', bookSchema)

module.exports = Book