const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// Fetch data from API using .then
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => addIntoTable(data))
  .catch((error) => console.log(error));

// Fetch data from API using async/await
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    addIntoTable(data);
  } catch (error) {
    console.log(error);
  }
}

function addIntoTable(data) {
  const table = document.getElementById("coinTable");

  // Clear existing table rows
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Iterate over data and create table rows
  data.forEach((coin) => {
    const row = table.insertRow();

    const imageCell = row.insertCell();
    const image = document.createElement("img");
    image.src = coin.image;
    image.className = "image";
    imageCell.appendChild(image);

    const nameCell = row.insertCell();
    nameCell.textContent = coin.name;

    const symbolCell = row.insertCell();
    symbolCell.textContent = coin.symbol.toUpperCase();

    const priceCell = row.insertCell();
    priceCell.textContent = "$"+coin.current_price;

    const volumeCell = row.insertCell();
    volumeCell.textContent = "$"+coin.total_volume;

    const percentageChangeCell = row.insertCell();
    const percentageChange = coin.price_change_percentage_24h+"%";
    percentageChangeCell.textContent = percentageChange;
    percentageChangeCell.classList.add(percentageChange >= '0' ? "green" : "red");

    const marketCapCell = row.insertCell();
    marketCapCell.textContent = "$"+coin.market_cap;
  });
}

function search() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();
  const table = document.getElementById("coinTable");

  for (let i = 1; i < table.rows.length; i++) {
    const name = table.rows[i].cells[1].textContent.toLowerCase();
    const symbol = table.rows[i].cells[2].textContent.toLowerCase();

    if (name.includes(searchTerm) || symbol.includes(searchTerm)) {
      table.rows[i].style.display = "";
    } else {
      table.rows[i].style.display = "none";
    }
  }
}

function sortByMarketCap() {
  const table = document.getElementById("coinTable");
  const rows = Array.from(table.rows).slice(1); // Exclude header row

  rows.sort((a, b) => {
    const marketCapA = parseFloat(
      a.cells[6].textContent.replace(/[^0-9.-]+/g, "")
    );
    const marketCapB = parseFloat(
      b.cells[6].textContent.replace(/[^0-9.-]+/g, "")
    );
    return marketCapB - marketCapA;
  });

  for (let i = 0; i < rows.length; i++) {
    table.appendChild(rows[i]);
  }
}

function sortByPercentageChange() {
  const table = document.getElementById("coinTable");
  const rows = Array.from(table.rows).slice(1); // Exclude header row

  rows.sort((a, b) => {
    const percentageChangeA = parseFloat(a.cells[5].textContent);
    const percentageChangeB = parseFloat(b.cells[5].textContent);
    return percentageChangeB - percentageChangeA;
  });

  for (let i = 0; i < rows.length; i++) {
    table.appendChild(rows[i]);
  }
}
