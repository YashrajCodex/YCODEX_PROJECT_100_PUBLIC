import { useEffect, useState } from "react";
import {
  BookItem,
  BooksResponse,
  BooksResponseId,
  getBooksProps,
} from "../interface/getBooksInterface";

const API_KEY: string = import.meta.env.VITE_BOOKS_API_KEY;
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default function useGetBooks({
  searchTerm,
  subject: genre = "subject:mystery",
  maxResults = "10",
  orderType = "relevance",
  printType = "books",
}: getBooksProps) {
  const [books, setBooks] = useState<BooksResponse | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    function () {
      async function fetchBooks() {
        // If the search term is empty after trimming whitespace, clear previous results
        if (!searchTerm.trim()) {
          setBooks(undefined);
          setError(null);
          setLoading(false);
          return;
        }
        setLoading(true); // Start loading before fetch
        setError(null); // Clear previous errors

        if (!API_KEY) {
          setError(
            "Google Books API Key is missing. Please check your .env file (VITE_BOOKS_KEY)."
          );
          setLoading(false);
          return;
        }

        try {
          const res = await fetch(
            `${BASE_URL}?q=${encodeURIComponent(
              searchTerm
            )}&${encodeURIComponent(
              genre
            )}&key=${encodeURIComponent(
              API_KEY
            )}&maxResults=${encodeURIComponent(
              maxResults
            )}&orderBy=${encodeURIComponent(
              orderType
            )}&printType=${encodeURIComponent(printType)}`
          );
          // console.log('bASEuRL: ',BASE_URL, ' APIkey: ', API_KEY, ' MAX_RESULTS ', maxResults, ' Order_Type: ', orderType, " Genre ", genre)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          //items[0].searchInfo.textSnippet
          const data: BooksResponse = await res.json();
          setBooks(data);
          setError(null); // Ensure error is cleared on success
        } catch (err: any) {
          // Use 'any' for catch (err) if you're not strictly typing all possible errors
          console.error("Error fetching books:", err);
          setError(
            err.message || "Failed to fetch books. Please try again later."
          );
          setBooks(undefined); // Clear books on error
        } finally {
          setLoading(false);
        }
      }
      fetchBooks();
    },
    [searchTerm, maxResults, orderType, printType]
  );
  return { books, error, loading };
}

export function useGetBooksByGenre({ 
  maxResults = "20",
  orderType = "relevance",
  printType = "books",
  subject: genre = "subject:mystery",
  inauthor
}: getBooksProps) {
  const [books, setBooks] = useState<BookItem[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(
    function () {
      async function fetchBooks() {
        setLoading(true); // Start loading before fetch
        setError(null); // Clear previous errors

        if (!API_KEY) {
          setError(
            "Google Books API Key is missing. Please check your .env file (VITE_BOOKS_KEY)."
          );
          setLoading(false);
          return;
        }

        try {
          const res = await fetch(
            `${BASE_URL}?q=${encodeURIComponent(genre)}&inAuthor=${encodeURIComponent(inauthor)}&key=${encodeURIComponent(API_KEY)}&maxResults=${encodeURIComponent(maxResults)}&orderBy=${encodeURIComponent(orderType)}&printType=${encodeURIComponent(printType)}`
          );
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          //items[0].searchInfo.textSnippet
          const data: BooksResponse = await res.json();
          setBooks(data.items);
          setError(null); // Ensure error is cleared on success
        } catch (err: any) {
          // Use 'any' for catch (err) if you're not strictly typing all possible errors
          console.error("Error fetching books:", err);
          setError(
            err.message || "Failed to fetch books. Please try again later."
          );
          setBooks(undefined); // Clear books on error
        } finally {
          setLoading(false);
        }
      }
      fetchBooks();
    },
    [genre, maxResults, orderType, printType]
  );
  return { books, error, loading };
}

export function useGetBooksById(id:string) {
  const [book, setBook] = useState<BooksResponseId | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(
    function () {
      async function fetchBooks() {
        setLoading(true); // Start loading before fetch
        setError(null); // Clear previous errors

        if (!API_KEY) {
          setError(
            "Google Books API Key is missing. Please check your .env file (VITE_BOOKS_KEY)."
          );
          setLoading(false);
          return;
        }

        try {
          const res = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data: BooksResponseId = await res.json();
          setBook(data);
          setError(null); // Ensure error is cleared on success
        } catch (err: any) {
          // Use 'any' for catch (err) if you're not strictly typing all possible errors
          console.error("Error fetching books:", err);
          setError(
            err.message || "Failed to fetch books. Please try again later."
          );
          setBook(undefined); // Clear books on error
        } finally {
          setLoading(false);
        }
      }
      fetchBooks();
    },
    [id]
  );
  return { book, error, loading };
}
