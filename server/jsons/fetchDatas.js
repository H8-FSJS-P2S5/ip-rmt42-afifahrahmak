// require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { fetchGBooks } = require('../helpers/googlebooks');

async function fetchGoogleBooks() {
    try {
        const jsBooks = await fetchGBooks('javascript', 20);
        const reactBooks = await fetchGBooks('react', 20);
        const randomBooks = await fetchGBooks('bio', 40);
        const books = [...jsBooks, ...reactBooks, ...randomBooks];
        const allBooks = JSON.stringify(books, null, 2);
        fs.writeFileSync('./jsons/books.json', allBooks);
        console.log('Data berhasil disimpan ke books.json');
    } catch (error) {
        console.error(error);
    }
}

const test = async () => {
    const a = await fetchGBooks('mantappu jiwa', 1);
    console.log(a)
    return a;
};
test();
// fetchGoogleBooks();
// module.exports = fetchGoogleBooks;