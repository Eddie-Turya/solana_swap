// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getQuote, getSwapTransaction } = require("./jupiter");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get Quote
app.post("/quote", async (req, res) => {
  try {
    const { inputMint, outputMint, amount } = req.body;
    const response = await getQuote(inputMint, outputMint, amount);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Swap Transaction
app.post("/swap", async (req, res) => {
  try {
    const { inputMint, outputMint, amount, userPublicKey } = req.body;
    const response = await getSwapTransaction(inputMint, outputMint, amount, userPublicKey);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
