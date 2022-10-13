import React, { useState } from "react";
import "./App.css";
import axios from "axios";
//주석 달아야지

function App() {
  const [address, setAddress] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [eth, setEth] = useState(0);

  function handleAddress(e) {
    console.log(e.target.value);

    setAddress(e.target.value);
  }

  async function handleAddressButton() {
    try {
      const result1 = await axios.get(
        `http://localhost:8080/address/${address}`
      );
      setBalance(result1.data);
      const value = await axios.get("http://localhost:8080/");
      setEth(value.data.data);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  return (
    <div className="App">
      <input className="address" type="text" onChange={handleAddress}></input>
      <button className="button" onClick={handleAddressButton}>
        click
      </button>
      <span>
        너의 잔액은... {balance} (₩ {(balance * eth).toLocaleString()})
      </span>
    </div>
  );
}

export default App;
