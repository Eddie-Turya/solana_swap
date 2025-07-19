// jupiter.js
const fetch = require("node-fetch");

const JUPITER_API = "https://quote-api.jup.ag";

async function getQuote(inputMint, outputMint, amount) {
  const url = `${JUPITER_API}/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;
  const response = await fetch(url);
  return await response.json();
}

async function getSwapTransaction(inputMint, outputMint, amount, userPublicKey) {
  const response = await fetch(`${JUPITER_API}/v6/swap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputMint,
      outputMint,
      amount,
      slippageBps: 50,
      userPublicKey,
      wrapUnwrapSOL: true,
      dynamicComputeUnitLimit: true,
      feeAccount: "4EkpmcAnw2F9fMj8U6ySofZNmWyAkGkRhp3MMc7ZLLsL", // your fee wallet
      platformFeeBps: 30
    }),
  });

  return await response.json();
}

module.exports = { getQuote, getSwapTransaction };
