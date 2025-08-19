import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// serve static frontend
app.use(express.static("."));

// prices endpoint
app.get("/api/prices", async (req, res) => {
  try {
    const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,cardano,solana&vs_currencies=usd");
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
