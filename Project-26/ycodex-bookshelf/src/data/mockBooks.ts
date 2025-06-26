
export interface Book {
  id: string
  title: string
  subtitle?: string
  author: string
  publisher: string
  publishedDate: string
  pageCount: number
  printType: string
  categories: string[]
  description: string
  imageUrl: string
  rating?: number
}

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Seven Husbands of Evelyn Hugo",
    subtitle: "A Novel",
    author: "Taylor Jenkins Reid",
    publisher: "Atria Books",
    publishedDate: "2017-06-13",
    pageCount: 400,
    printType: "BOOK",
    categories: ["Fiction", "Romance", "Historical Fiction"],
    description: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    rating: 4.8
  },
  {
    id: "2",
    title: "Atomic Habits",
    subtitle: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    author: "James Clear",
    publisher: "Avery",
    publishedDate: "2018-10-16",
    pageCount: 320,
    printType: "BOOK",
    categories: ["Self-Help", "Psychology", "Business"],
    description: "A comprehensive guide to breaking bad behaviors and adopting good ones in four steps.",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
    rating: 4.7
  },
  {
    id: "3",
    title: "The Thursday Murder Club",
    subtitle: "A Mystery",
    author: "Richard Osman",
    publisher: "Viking",
    publishedDate: "2020-09-03",
    pageCount: 368,
    printType: "BOOK",
    categories: ["Mystery", "Crime", "Fiction"],
    description: "Four unlikely friends meet weekly to investigate cold cases, but soon find themselves pursuing a killer.",
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop",
    rating: 4.5
  },
  {
    id: "4",
    title: "Dune",
    subtitle: "The Original Science Fiction Epic",
    author: "Frank Herbert",
    publisher: "Ace Books",
    publishedDate: "1965-08-01",
    pageCount: 688,
    printType: "BOOK",
    categories: ["Science Fiction", "Fantasy", "Adventure"],
    description: "Set on the desert planet Arrakis, this epic tells the story of Paul Atreides and his rise to power.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
    rating: 4.6
  },
  {
    id: "5",
    title: "The Midnight Library",
    subtitle: "A Novel",
    author: "Matt Haig",
    publisher: "Viking",
    publishedDate: "2020-08-13",
    pageCount: 288,
    printType: "BOOK",
    categories: ["Fiction", "Philosophy", "Fantasy"],
    description: "Between life and death there is a library where each book represents a different life you could have lived.",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
    rating: 4.4
  },
  {
    id: "6",
    title: "Educated",
    subtitle: "A Memoir",
    author: "Tara Westover",
    publisher: "Random House",
    publishedDate: "2018-02-20",
    pageCount: 334,
    printType: "BOOK",
    categories: ["Memoir", "Biography", "Non-fiction"],
    description: "A powerful memoir about education, family, and the struggle for self-discovery.",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    rating: 4.9
  }
]

export const getBooksByGenre = (genre: string) => {
  return mockBooks.filter(book => 
    book.categories.some(category => 
      category.toLowerCase().includes(genre.toLowerCase())
    )
  )
}

export const getBookById = (id: string) => {
  return mockBooks.find(book => book.id === id)
}
