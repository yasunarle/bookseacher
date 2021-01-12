import axios from 'axios';
// Types
import { SeachedBook, Book } from '../types/book';

const getBooks = async (keyword: string): Promise<Book[]> => {
  const url = 'https://www.googleapis.com/books/v1/volumes';

  const params = {
    q: `intitle:${keyword}`,
    Country: 'JP'
  };

  try {
    const res = await axios.get(url, { params });
    const seachedBooks = res.data.items as SeachedBook[];
    const _books = [] as Book[];
    seachedBooks.map((seachedBook, index) => {
      const _book = {
        ...seachedBook.volumeInfo,
        relatedOrder: index
      };
      _books.push(_book);
    });
    return _books;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export default getBooks;
