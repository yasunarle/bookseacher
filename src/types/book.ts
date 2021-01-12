export type SeachedBook = {
  id: string;
  volumeInfo: Book;
};

export interface Book {
  title: string;
  description: string;
  authors: string[];
  publishedDate: string;
  relatedOrder: number;
  infoLink: string;
}
