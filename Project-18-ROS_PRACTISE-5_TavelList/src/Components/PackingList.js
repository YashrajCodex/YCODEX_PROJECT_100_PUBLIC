import { useState } from "react";
// import "./index.css";

const Item = ({ singleItem, onDeleteItem, onToggleItems }) => {
  return (
    <li>
      <input
        type="checkbox"
        id=""
        value={singleItem.packed}
        onChange={() => onToggleItems(singleItem.id)}
      />
      <span
        style={singleItem.packed ? { textDecoration: "strike-through" } : {}}
      >
        {singleItem.quantity} : {singleItem.description}
      </span>
      <button onClick={() => onDeleteItem(singleItem.id)}>
        <i class="fa-solid fa-trash-can" style={{color: 'white'}}></i>
      </button>
    </li>
  );
};
const PackingList = ({
  listOfItems,
  onDeleteItem,
  onToggleItems,
  onClearList,
}) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = listOfItems;

  if (sortBy === "description")
    sortedItems = listOfItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = listOfItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            singleItem={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.description}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input.</option>
          <option value="description">Sort by description.</option>
          <option value="packed">Sort by packed status.</option>
        </select>
      </div>
     
    </div>
  );
};

export default PackingList;
