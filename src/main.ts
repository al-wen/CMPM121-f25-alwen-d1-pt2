import "./style.css";

// ----- GAME DATA -----

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

let currency: number = 0;

const upgradeGrowthRate: number = 1.15;

const purchasedItems: number[] = Array(shopItems.length).fill(0);
const itemCosts: number[] = shopItems.map((item) => item.cost);

// ----- DOM ELEMENTS -----

document.body.innerHTML = `
  <h1>Clown Clicker</h1>
  <p>Clowns: <span id="counter">0</span></p>

  <p id="growthRate">Clown Growth Rate: 0 clowns/sec</p>
  
  <button id="increment" style="font-size: 8rem; padding: 0; border: none; background: none; color: inherit; cursor: pointer;">🤡</button>

  <p id="upgradeButtons"></p>
  <div id="upgradeInfo"></div>
`;

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

// ----- EVENT HANDLERS -----

incrementButton.addEventListener("click", () => {
  currency++;
  counterElement.textContent = Math.floor(currency).toString();
});

shopItems.forEach((_, index) => {
  const button = document.getElementById(`upgrade${index}`)!;
  const costElement = document.getElementById(`upgradeCost${index}`)!;
  const ownedElement = document.getElementById(`upgradeOwned${index}`)!;

  button.addEventListener("click", () => {
    if (currency >= itemCosts[index]) {
      currency -= itemCosts[index];
      purchasedItems[index]++;
      itemCosts[index] *= upgradeGrowthRate;
      costElement.textContent = itemCosts[index].toFixed(2);
      ownedElement.textContent = purchasedItems[index].toString();
    }
  });
});

// ----- GAME LOOP -----

let lastTime = performance.now();

function update() {
  const currentTime = performance.now();
  const timepassed = (currentTime - lastTime) / 1000;

  let rate = 0;
  shopItems.forEach((item, index) => {
    rate += purchasedItems[index] * item.rate;
  });

  if (
    shopItems.find((item) => item.name === "Blessing of the Clown God") &&
    purchasedItems[
        shopItems.findIndex((item) => item.name === "Blessing of the Clown God")
      ] > 0
  ) {
    rate *= Math.pow(
      2,
      purchasedItems[
        shopItems.findIndex((item) => item.name === "Blessing of the Clown God")
      ],
    );
  }

  currency += rate * timepassed;
  lastTime = currentTime;

  counterElement.textContent = Math.floor(currency).toString();
  growthRateElement.textContent = `Clown Growth Rate: ${
    rate.toFixed(2)
  } clowns/sec`;

  shopItems.forEach((_, index) => {
    const ownedElement = document.getElementById(`upgradeOwned${index}`)!;
    ownedElement.textContent = purchasedItems[index].toString();
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
