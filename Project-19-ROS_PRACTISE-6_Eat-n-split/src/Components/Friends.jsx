import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

const Friends = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSplitBill(value) {
    console.log(value)
    setFriends((fr) => fr.map((frs) => frs.id === selectedFriend.id ? { ...frs, balance: frs.balance + value } : frs))

    setSelectedFriend(null);
  }
  function showFrien() {
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(curFren) {
    setFriends((prevFriends) => [...prevFriends, curFren]);
    setShowAddFriend(false);
  }
  function handleSelection(fn) {
    //   setSelectedFriend(fn);
    setSelectedFriend((cur) => cur?.id === fn.id ? null : fn)
    setShowAddFriend(false)

  }
  return (
    <>
      <div className="sidebar">
        <FriendsList
          tFriends={friends}
          onSelection={handleSelection}
          currSelFrn={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAdd={handleAddFriend} />}
        <Button onClick={showFrien}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} key={ selectedFriend.id } />}
    </>
  );
};

function FriendsList({ tFriends, onSelection, currSelFrn }) {
  return (
    <ul>
      {tFriends.map((f) => (
        <Friend f={f} key={f.id} onSelection={onSelection} currSelFrn={currSelFrn} />
      ))}
    </ul>
  );
}

function Friend({ f, onSelection, currSelFrn }) {
  const isSelected = currSelFrn?.id === f.id;
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={f.image} alt={f.name} />
      <h3>{f.name}</h3>

      {f.balance < 0 && (
        <p className="red">
          You owe {f.name} ${Math.abs(f.balance)}.
        </p>
      )}

      {f.balance === 0 && <p>You and {f.name} are even.</p>}

      {f.balance > 0 && (
        <p className="green">
          {f.name} owe you ${Math.abs(f.balance)}
        </p>
      )}

      <Button onClick={() => onSelection(f)}>{isSelected ? 'Close' : 'Select'}</Button>
    </li>
  );
}

function FormAddFriend({ onAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const curFren = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAdd(curFren);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="nammmm">👫Friend name</label>
      <input
        type="text"
        id="nammmm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="imageee">🎃 Image URL</label>
      <input
        type="text"
        id="imageee"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {

  const [bill, setBill] = useState("");
  const [userExp, setUserExp] = useState("");
  const friendExp = bill ? bill - userExp : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userExp) return;
    onSplitBill(whoIsPaying === 'user' ? friendExp : -userExp)
  }
  return (
    <form action="" className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label htmlFor="BillValue">💲 Bill Value</label>
      <input type="number" id="BillValue" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

      <label htmlFor="YourExpense">🟠Your expense</label>
      <input type="number" id="YourExpense" value={userExp} onChange={(e) => setUserExp(Number(e.target.value) > bill ? userExp : Number(e.target.value))} />

      <label htmlFor="FriendExpense">👫 {selectedFriend.name} expense</label>
      <input type="number" id="FriendExpense" disabled value={friendExp} />

      <label htmlFor="payingg">🤑 Who is paying the bill.</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
export default Friends;
