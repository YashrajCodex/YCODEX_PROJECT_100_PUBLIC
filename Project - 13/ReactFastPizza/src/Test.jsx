import { useState } from "react";

const books = [
  {
    id: 1,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description:
      "An epic tale of hobbits, wizards, and the struggle for Middle-earth.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Southern Gothic",
    description:
      "A coming-of-age story exploring racial injustice in the American South.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    description:
      "A chilling novel about a totalitarian society where freedom of thought is suppressed.",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description:
      "A witty and insightful social commentary on love and marriage in 19th-century England.",
  },
  {
    id: 5,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Science Fiction",
    description:
      "A humorous and absurd journey through space with the ultimate question of life, the universe, and everything.",
  },
  {
    id: 6,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophical Fiction",
    description:
      "A young shepherd's journey of self-discovery and following his dreams.",
  },
  {
    id: 7,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Gothic",
    description:
      "A chilling tale of a man who sells his soul for eternal youth.",
  },
  {
    id: 8,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Jazz Age",
    description:
      "A tragic love story set in the Roaring Twenties exploring themes of wealth, decadence, and the American Dream.",
  },
  {
    id: 9,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description:
      "A prequel to The Lord of the Rings, following Bilbo Baggins on an unexpected adventure.",
  },
  {
    id: 10,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Psychological",
    description:
      "A gripping exploration of guilt, redemption, and the human condition.",
  },
];

const cities = [
  {
    id: 1,
    city: "Tokyo",
    country: "Japan",
    reasons_to_visit:
      "Modern metropolis with ancient temples, delicious food, and unique culture.",
  },
  {
    id: 2,
    city: "Paris",
    country: "France",
    reasons_to_visit:
      "Iconic landmarks like the Eiffel Tower and Louvre Museum.",
  },
  {
    id: 3,
    city: "Sydney",
    country: "Australia",
    reasons_to_visit:
      "Sydney Opera House, iconic harbor, and stunning beaches.",
  },
  {
    id: 4,
    city: "New York City",
    country: "USA",
    reasons_to_visit:
      "Iconic skyline, world-class museums, and Broadway shows.",
  },
  {
    id: 5,
    city: "Rio de Janeiro",
    country: "Brazil",
    reasons_to_visit:
      "Christ the Redeemer statue, vibrant Carnival celebrations, and beautiful beaches.",
  },
  {
    id: 6,
    city: "Machu Picchu",
    country: "Peru",
    reasons_to_visit:
      "Ancient Inca city with breathtaking views and fascinating history.",
  },
  {
    id: 7,
    city: "Dubai",
    country: "UAE",
    reasons_to_visit:
      "Luxurious skyscrapers, desert adventures, and world-class shopping.",
  },
  {
    id: 8,
    city: "London",
    country: "England",
    reasons_to_visit:
      "Buckingham Palace, Tower of London, and diverse neighborhoods.",
  },
  {
    id: 9,
    city: "Rome",
    country: "Italy",
    reasons_to_visit: "Ancient history at the Colosseum and Vatican City.",
  },
  {
    id: 10,
    city: "Bangkok",
    country: "Thailand",
    reasons_to_visit:
      "Bustling city with amazing temples and delicious street food.",
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    city: "New York",
    country: "USA",
    isActive: true,
    hobbies: ["reading", "hiking", "photography"],
    contact: {
      email: "john.doe@example.com",
      phone: "555-123-4567",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    city: "London",
    country: "UK",
    isActive: false,
    hobbies: ["painting", "music", "traveling"],
    contact: {
      email: "jane.smith@example.com",
      phone: "123-456-7890",
    },
  },
  {
    id: 3,
    name: "David Lee",
    age: 35,
    city: "Tokyo",
    country: "Japan",
    isActive: true,
    hobbies: ["sports", "gaming", "cooking"],
    contact: {
      email: "david.lee@example.com",
      phone: "987-654-3210",
    },
  },
  // ... 12 more objects with similar structure
];
export default function Test() {
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("");
  const [arr1, setArr1] = useState([]);

  return (
    <div className="w-full h-[100vh] px-2 text-xl flex gap-4 flex-col">
      <input
        className="border-2 border-blue-600 outline-none rounded-lg px-3"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="name"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      {color}
      <button>Add</button>
      <h1>Books</h1>
      <ul>
        {books?.map((item) => (
          <li
            className={`border-2 border-blue-500 rounded-xl px-4 py-3 mb-3 bg-yellow-300`}
            key={item.id}
          >
            <h2>
              <strong>Title: </strong>
              {item.title}
            </h2>
            <h2>
              <strong>Author: </strong>
              {item.author}
            </h2>
            <h3>
              <strong>Genre: </strong>
              {item.genre}
            </h3>
            <p>
              <strong>Description: </strong>
              {item.description}
            </p>
          </li>
        ))}
      </ul>
      <h1>Cities</h1>
      <ul>
        {cities?.map((item) => (
          <li
            key={item.id}
            className={`border-2 border-blue-500 rounded-xl px-4 py-3 mb-3 bg-orange-300`}
          >
            <h1>
              <strong>City: </strong> {item.country}
            </h1>
            <h1>
              <strong>City: </strong> {item.city}
            </h1>
            <p>
              <strong>Visit, Why?: </strong> {item.reasons_to_visit}
            </p>
          </li>
        ))}
      </ul>
      <h1>Data</h1>
      <ul>
        {data?.map((item) => (
          <li
            key={item.id}
            className={`border-2 border-blue-500 rounded-xl px-4 py-3 mb-3 bg-green-300`}
          >
            <h1>
              <strong>Name: </strong>
              {item.name}
            </h1>
            <h2>
              <strong>Age: </strong>
              {item.age}
            </h2>
            <p>
              <strong>Hobbies: </strong>
              {item.hobbies}
            </p>
            <h3>
              <strong>City: </strong>
              {item.city}
            </h3>
            <p>
              <strong>Contact: </strong>
              {item.contact.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
