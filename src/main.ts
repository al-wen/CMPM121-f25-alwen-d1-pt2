import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
}

const shopItems: Item[] = [
  { name: "Clown Tree", cost: 10, rate: 0.1 },
  { name: "Clown Printer", cost: 100, rate: 2 },
  { name: "Clown Factory", cost: 1000, rate: 50 },
];

let counter: number = 0;

const upgradeGrowthRate: number = 1.15;

const upgradeOwned: number[] = Array(shopItems.length).fill(0);
const upgradeCost: number[] = shopItems.map((item) => item.cost);

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Clown Clicker</h1>
  <p>Clowns: <span id="counter">0</span></p>

  <p id="growthRate">Clown Growth Rate: 0 clowns/sec</p>
  
  <button id="increment">🤡</button></p>

  <p id="upgradeButtons"></p>
  <div id="upgradeInfo"></div>
`;

// Add click handler
const upgradeButtonsContainer = document.getElementById("upgradeButtons")!;
const upgradeInfoContainer = document.getElementById("upgradeInfo")!;

shopItems.forEach((item, index) => {
  upgradeButtonsContainer.innerHTML += `
    <button id="upgrade${index}">${item.name}</button>
  `;
  upgradeInfoContainer.innerHTML += `
    <p id="upgradeCostText${index}">${item.name}: 
      <span id="upgradeCost${index}">${item.cost}</span> clowns 
      (Owned: <span id="upgradeOwned${index}">0</span>)
    </p>
  `;
});

const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growthRate")!;
const incrementButton = document.getElementById("increment")!;

// Buttons
incrementButton.addEventListener("click", () => {
  console.log("Clowns:", counterElement, counter);
  counter++;
  counterElement.textContent = Math.floor(counter).toString();
});

shopItems.forEach((_, index) => {
  const button = document.getElementById(`upgrade${index}`)!;
  const costEl = document.getElementById(`upgradeCost${index}`)!;
  const ownedEl = document.getElementById(`upgradeOwned${index}`)!;

  button.addEventListener("click", () => {
    if (counter >= upgradeCost[index]) {
      counter -= upgradeCost[index];
      upgradeOwned[index]++;
      upgradeCost[index] *= upgradeGrowthRate;
      costEl.textContent = upgradeCost[index].toFixed(2);
      ownedEl.textContent = upgradeOwned[index].toString();
    }
  });
});

// Update
let lastTime = performance.now();

function update() {
  const currentTime = performance.now();
  const timepassed = (currentTime - lastTime) / 1000;

  let rate = 0;
  shopItems.forEach((item, index) => {
    rate += upgradeOwned[index] * item.rate;
  });

  counter += rate * timepassed;
  lastTime = currentTime;

  counterElement.textContent = Math.floor(counter).toString();
  growthRateElement.textContent = `Clown Growth Rate: ${
    rate.toFixed(2)
  } clowns/sec`;

  shopItems.forEach((_, index) => {
    const ownedEl = document.getElementById(`upgradeOwned${index}`)!;
    ownedEl.textContent = upgradeOwned[index].toString();
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
