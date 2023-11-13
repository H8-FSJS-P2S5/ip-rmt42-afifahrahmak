require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

async function fetchGoogleBooks() {
    try {
        const fetchData = async (query, maxResults) => {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                    q: query,
                    country: 'ID',
                    maxResults,
                    printType: 'books',
                },
            });

            const items = response.data.items || [];

            return items.map(item => {
                const { title, authors, publisher, publishedDate, description, industryIdentifiers, pageCount, categories, imageLinks, language } = item.volumeInfo;
                return {
                    title,
                    isbn: industryIdentifiers ? industryIdentifiers[0].identifier : '-',
                    author: authors ? authors.join(', ') : '-',
                    synopsis: description,
                    pageCount,
                    stock: Math.ceil(Math.random() * 5),
                    publisher,
                    publishedDate,
                    lang: language,
                    imgUrl: imageLinks.thumbnail,
                    status: 'available',
                    category: categories ? categories.join(', ') : '-',
                };
            });
        };

        const jsBooks = await fetchData('javascript', 20);
        const reactBooks = await fetchData('react', 20);
        const randomBooks = await fetchData('bio', 40);

        const books = [...jsBooks, ...reactBooks, ...randomBooks];

        const allBooks = JSON.stringify(books, null, 2);
        fs.writeFileSync('./jsons/books.json', allBooks);

        console.log('Data berhasil disimpan ke books.json');
    } catch (error) {
        console.error(error);
    }
}


fetchGoogleBooks();
// module.exports = fetchGoogleBooks;