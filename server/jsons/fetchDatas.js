require('dotenv').config();
const axios = require('axios');
async function fetchGoogleBooks() {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                key: process.env.GOOGLE_BOOKS_API_KEY,
                q: 'javascript',
                country: 'ID',
                maxResults: 3,
                printType: 'books',
            },
        });


        // console.log(response);
        let items = response.data.items || [];

        if (items.length > 0) {
            items = items.map(item => {
                const { title, authors, publisher, publishedDate, description, industryIdentifiers, pageCount, categories, imageLinks, language } = item.volumeInfo;
                return {
                    title,
                    isbn: industryIdentifiers ? industryIdentifiers[0].identifier : '-',
                    author: authors.join(', '),
                    synopsis: description,
                    pageCount,
                    stock: Math.ceil(Math.random() * 5),
                    publisher,
                    publishedDate,
                    lang: language,
                    imgUrl: imageLinks.thumbnail,
                    status: `available`,
                    category: categories ? categories.join(', ') : '-'
                }
            });
        }
        console.log(items);

        // const result = items.map(item => ({
        //   judul: item.volumeInfo.title || 'Tidak ada judul',
        //   pengarang: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Tidak ada pengarang',
        // }));

        // return result;
    } catch (error) {
        console.error(error);
        // throw new Error('Terjadi kesalahan dalam permintaan.');
    }
}


fetchGoogleBooks();
// module.exports = fetchGoogleBooks;