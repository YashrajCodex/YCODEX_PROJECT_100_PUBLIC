import { useState } from "react";
import PackingList from "./PackingList";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
// import FlashCards from "./FlashCards";

const App = () => {
  const [listItems, setListItems] = useState([]);

  const addListItem = (new_Item) => {
    setListItems((i) => [...i, new_Item]);
  };

  const deleteListItem = (del_id) => {
    setListItems((each_item) =>
      each_item.filter((eachFilterItem) => eachFilterItem.id !== del_id)
    );
  };

  const ClearList = () => {
    const confirmed = window.confirm("Are you sure you want to delete all items!! ☢");
    if (confirmed) {
      setListItems([])
    }
  }

  const handleToogle = (toogle_id) => {
    setListItems((each_item) =>
      each_item.map((each_map_item) =>
        each_map_item.id === toogle_id
          ? { ...each_map_item, packed: !each_map_item.packed }
          : each_map_item
      )
    );
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addListItem} />
      <PackingList
        listOfItems={listItems}
        onDeleteItem={deleteListItem}
        onToggleItems={handleToogle}
        onClearList = {ClearList}
      />
      <Stats listedItems={listItems} />
    </div>
  );
};
export default App;
