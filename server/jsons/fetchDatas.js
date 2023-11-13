require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

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

        const jsonBooks = JSON.stringify(items, null, 2); 

      
        const filePath = path.join(__dirname, 'books.json');
    
      
        fs.writeFileSync(filePath, jsonBooks);
       
    } catch (error) {
        console.error(error);
        // throw new Error('Terjadi kesalahan dalam permintaan.');
    }
}


fetchGoogleBooks();
// module.exports = fetchGoogleBooks;