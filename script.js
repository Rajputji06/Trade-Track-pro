// script.js
async function fetchPrices() {
  try {
    const response = await fetch("/api/prices");
    const data = await response.json();

    const container = document.getElementById("prices");
    container.innerHTML = ""; // clear old prices

    // Loop through all coins
    for (const [coin, info] of Object.entries(data)) {
      const div = document.createElement("div");
      div.className = "coin-card";
      div.innerHTML = `
        <h2>${coin}</h2>
        <p>💰 $${info.price ? info.price.toLocaleString() : "N/A"}</p>
      `;
      container.appendChild(div);

      // If BTC, show chart
      if (coin === "BTC" && info.history) {
        drawChart(info.history);
      }
    }
  } catch (err) {
    console.error("⚠️ Error fetching prices", err);
    document.getElementById("prices").innerHTML =
      "<p class='error'>⚠️ Failed to load prices</p>";
  }
}

function drawChart(history) {
  const ctx = document.getElementById("btcChart").getContext("2d");

  // Destroy old chart if it exists
  if (window.btcChart) {
    window.btcChart.destroy();
  }

  window.btcChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: history.map((d) => d.time),
      datasets: [
        {
          label: "BTC Price (USD)",
          data: history.map((d) => d.price),
          borderColor: "orange",
          backgroundColor: "rgba(255,165,0,0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, labels: { color: "#fff" } },
      },
      scales: {
        x: { ticks: { color: "#fff" } },
        y: { ticks: { color: "#fff" } },
      },
    },
  });
}

// Fetch prices every 10s
fetchPrices();
setInterval(fetchPrices, 10000);
