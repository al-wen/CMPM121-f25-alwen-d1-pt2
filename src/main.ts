import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const shopItems: Item[] = [
  {
    name: "Clown Tree",
    cost: 10,
    rate: 0.1,
    description: "increases clown rate by 0.1",
  },
  {
    name: "Clown Printer",
    cost: 100,
    rate: 2,
    description: "increases clown rate by 2",
  },
  {
    name: "Clown Factory",
    cost: 1000,
    rate: 50,
    description: "increases clown rate by 50",
  },
  {
    name: "Clown Manufacturing Complex",
    cost: 10000,
    rate: 1500,
    description: "increases clown rate by 1500",
  },
  {
    name: "Blessing of the Clown God",
    cost: 1000000,
    rate: 0,
    description: "doubles clown rate",
  },
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
      (Owned: <span id="upgradeOwned${index}">0</span>)<br>
      <span style="font-size: 0.8em;">${item.description}</span>
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
  const costElement = document.getElementById(`upgradeCost${index}`)!;
  const ownedElement = document.getElementById(`upgradeOwned${index}`)!;

  button.addEventListener("click", () => {
    if (counter >= upgradeCost[index]) {
      counter -= upgradeCost[index];
      upgradeOwned[index]++;
      upgradeCost[index] *= upgradeGrowthRate;
      costElement.textContent = upgradeCost[index].toFixed(2);
      ownedElement.textContent = upgradeOwned[index].toString();
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

  if (
    shopItems.find((item) => item.name === "Blessing of the Clown God") &&
    upgradeOwned[
        shopItems.findIndex((item) => item.name === "Blessing of the Clown God")
      ] > 0
  ) {
    rate *= Math.pow(
      2,
      upgradeOwned[
        shopItems.findIndex((item) => item.name === "Blessing of the Clown God")
      ],
    );
  }

  counter += rate * timepassed;
  lastTime = currentTime;

  counterElement.textContent = Math.floor(counter).toString();
  growthRateElement.textContent = `Clown Growth Rate: ${
    rate.toFixed(2)
  } clowns/sec`;

  shopItems.forEach((_, index) => {
    const ownedElement = document.getElementById(`upgradeOwned${index}`)!;
    ownedElement.textContent = upgradeOwned[index].toString();
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
