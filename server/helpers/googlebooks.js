const axios = require('axios');

const fetchGBooks = async (query, maxResults) => {
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
            pricePerWeek: Math.ceil(Math.random() * 1000 * 5)
        };
    });
};

module.exports = { fetchGBooks };