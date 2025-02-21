document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");
    const contentDiv = document.getElementById("content");

    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
                window.history.pushState({ path: url }, "", url); // Update URL without reloading
                initializeCryptoTable(); // Reinitialize table if needed
            })
            .catch(error => console.error("Error loading page:", error));
    }

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-target");
            if (page) loadPage(page);
        });
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.path) {
            loadPage(event.state.path);
        }
    });

    // Function to initialize crypto table
    function initializeCryptoTable() {
        const cryptoTable = document.getElementById("cryptoTable");
        if (!cryptoTable) return;

        const cryptoData = [
            {
                name: "Bitcoin",
                symbol: "BTC",
                price: "$ 23,207.5",
                change: "+2.62%",
                trend: "positive",
                chartClass: "chart-positive"
            },
            {
                name: "Ethereum",
                symbol: "ETH",
                price: "$1,515",
                change: "-0.76%",
                trend: "negative",
                chartClass: "chart-negative"
            },
            {
                name: "USDT",
                symbol: "USDT",
                price: "$1.00",
                change: "+0.09%",
                trend: "positive",
                chartClass: "chart-neutral"
            },
            {
                name: "Polygon",
                symbol: "MATIC",
                price: "$1.29",
                change: "+3.94%",
                trend: "positive",
                chartClass: "chart-positive"
            },
            {
                name: "Ripple",
                symbol: "XRP",
                price: "$0.3821",
                change: "+0.04%",
                trend: "negative",
                chartClass: "chart-negative"
            },
            {
                name: "Polkadot",
                symbol: "DOT",
                price: "$6.31",
                change: "+1.20%",
                trend: "positive",
                chartClass: "chart-positive"
            }
        ];

        // Clear existing table contents
        cryptoTable.innerHTML = `
            <tr>
                <th>Coin</th>
                <th>Price</th>
                <th>Change</th>
                <th>Chart</th>
                <th>Actions</th>
            </tr>
        `;

        // Populate table with new data
        cryptoData.forEach(coin => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>
                <div class="coin-icon">
                    <img src="../assets/icons/${coin.symbol.toLowerCase()}-icon.png" alt="${coin.symbol}" style="width: 2px; height: 2px;">
                </div>
                <div class="coin-info">
                    <span class="coin-name">${coin.name}</span>
                    <span class="coin-symbol">${coin.symbol}</span>
                </div>
            </td>
            <td>${coin.price}</td>
            <td><span class="change-${coin.trend}">${coin.change}</span></td>
            <td>
                <div class="chart-container ${coin.chartClass}"></div>
            </td>
            <td>
                <button class="action-button details-button">Details</button>
                <button class="action-button trade-button">Trade</button>
            </td>
        `;
            cryptoTable.appendChild(row);

            // Attach event listeners for buttons
            const detailsButton = row.querySelector(".details-button");
            const tradeButton = row.querySelector(".trade-button");

            detailsButton.addEventListener("click", function () {
                alert(`Details for ${coin.name}`);
                // Add details page or modal here
            });

            tradeButton.addEventListener("click", function () {
                alert(`Trading ${coin.name}`);
                // Add trade functionality here
            });
        });
    }

    initializeCryptoTable();
});
