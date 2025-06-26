export const genre = [
  "fiction",
  "science",
  "philosophy",
  "mystery",
  "fantasy",
  "thriller",
  "business",
  "religion",
  "computers",
  "psychology",
  "young-adult",
  "self-help",
];

export type getBooksProps = {
  searchTerm?: string;
  maxResults?: string;
  orderType?: "relevance" | "newest";
  printType?: "all" | "books" | "magazines";
  subject?: string;
  intitle?: string;
  inauthor?: string;
  inpublisher?: string;
};
// 'item' interface based on Google Books API response structure
export interface BookItem {
  id: string;
  bookmark: boolean;
  isRead: boolean;
  etag: string;
  selfLink: string;
  searchInfo?: {
    textSnippet: string;
  };
  volumeInfo: {
    averageRating: number;
    ratingsCount: number;
    title: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
} //'books' interface to reflect the top-level structure
export interface BooksResponse {
  kind: string;
  totalItems: number;
  items?: BookItem[]; // 'items' array can be absent if no results
}
export interface BooksResponseId extends BookItem{
  kind: string;
}
