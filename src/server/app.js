const express = require("express");
const axios = require("axios");
const { ethers } = require("ethers");
const app = express();
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
const port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let value;
app.get("/", async (req, res) => {
  try {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=krw"
      )
      .then((result) => {
        console.log(result.data.ethereum.krw);
        value = result.data.ethereum.krw;
      });
    res.send({ data: value });
  } catch (err) {
    console.log(err);
  }
});

app.get("/address/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await axios
      .get(
        `https://api-goerli.etherscan.io/api?module=account&action=balance&address=${id}&tag=latest&apikey=YJMIQHB4KMR3J9QACA1Z24XH54XWXG8HS1`
      )
      .then((result) => {
        console.log(result.data.result);
        balance = ethers.utils.formatEther(result.data.result);
      });
    res.status(200).send(balance);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("listening");
});
