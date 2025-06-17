import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Pizza Focaccia",
    ingredients: "Bread with italian olive oil and roseamary.",
    price: 6,
    photoName: "Pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "Pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "Pizzas/spinaci.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms and onions",
    price: 12,
    photoName: "Pizzas/funghi.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella and pepperoni",
    price: 15,
    photoName: "Pizzas/salamino.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula and burrata cheese",
    price: 18,
    photoName: "Pizzas/prosciutto.jpg",
    soldOut: true,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const Header = () => {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
};

const Menu = () => {
  const pizzas = pizzaData.length;
  // const pizzas = 0;

  return (
    <main className="menu">
      <h2>Our menu</h2>

      {pizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine, 6 creative dishes to choose from. All
            from our stone oven, all organic, ll delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizzas) => (
              <Pizza pizzaAllObj={pizzas} key={pizzas.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu come back later :)</p>
      )}
    </main>
  );
};

const Pizza = ({ pizzaAllObj }) => {
  // console.log(pizzaAllObj.name)
  // if(pizzaAllObj.soldOut) return null;
  return (
    <li className={`pizza ${pizzaAllObj.soldOut ? "sold-out": ""}`}>
      <img src={pizzaAllObj.photoName} alt={`${pizzaAllObj.name}`} />
      <div>
        <h2>{pizzaAllObj.name}</h2>
        <p>{pizzaAllObj.ingredients}</p>
        <span>{pizzaAllObj.soldOut ? "SOLD OUT!" : `Price: ${pizzaAllObj.price}`}</span>
      </div>
    </li>
  );
};
const Footer = () => {
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      <p>
        Current time: {hour}:{min}
      </p>
      {isOpen ? (
        <div className="order">
          <p>We're open until {closeHour}:00 </p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>We're close come back later!</p>
      )}
    </footer>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
