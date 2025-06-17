//This is a Tip Calculator

import React, { useState } from 'react'

const TipCal = () => {
  const [billPrice, setBillPrice] = useState("")
  const [personelRating, setPersonelRating] = useState(0);
  const [friendRating, setFriendRating] = useState(0);

  function onPrChange(e) {
    setPersonelRating(Number(e.target.value))
  }
  function onFrChange(e) {
    setFriendRating(Number(e.target.value))
  }
  function Reset() {
    setBillPrice("");
    setFriendRating(0);
    setPersonelRating(0);
  }

  const tip = billPrice * ((personelRating + friendRating) / 2 / 100);
  // const tip = personelRating + friendRating;
  return (
    <div>
      <div>
        <p>How much was the bill?</p>
        <input type="number" value={billPrice} onChange={(e) => setBillPrice(Number(e.target.value))} />
      </div>
      <div>
        <p>How did you like the service?</p>
        <PerService Rating={personelRating} onRating={setPersonelRating} onChangeRating={onPrChange} />
      </div>
      <div>
        <p>How did your friend like the service?</p>
        <PerService Rating={friendRating} onRating={setFriendRating} onChangeRating={onFrChange} />
      </div>

      {billPrice > 0 && (
        <>
          <Display pR={personelRating} fR={friendRating} bP={billPrice} tip={tip} />
          <Button Reset={Reset} />
        </>)}
    </div>
  )
}

function PerService({ Rating, onChangeRating }) {
  return (
    <div>
      <select name="" id="" value={Rating} onChange={(e) => onChangeRating(e)}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good(10%)</option>
        <option value="20">Absolutely amazing!(20%)</option>
      </select>
    </div>
  )
}

function Display({ pR, fR, bP, tip }) {
  return (
    <div>
      <h2>
        You pay ${bP + tip} (${bP} + ${tip});
      </h2>
    </div>
  )
}

function Button({ Reset }) {
  return <button onClick={Reset}>Reset</button>
}
export default TipCal
