import { BookItem } from "@/interface/getBooksInterface";

export default function getIsRead(books: BookItem[], targetId: string) {
    const foundBook = books.find(book => book.id === targetId)
    return foundBook ? foundBook.isRead : false
}