//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;

const upgradeCost1: number = 10;
const upgradeCost2: number = 100;
const upgradeCost3: number = 1000;

let upgradeOwned1: number = 0;
let upgradeOwned2: number = 0;
let upgradeOwned3: number = 0;

const upgradeRate1: number = 0.1;
const upgradeRate2: number = 2.0;
const upgradeRate3: number = 50.0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Clown Clicker</h1>
  <p>Clowns: <span id="counter">0</span></p>

  <p id="growthRate">Growth Rate: 0 clowns/sec</p>
  
  <button id="increment">🤡</button></p>

  <p><button id="upgrade1">Clown Tree</button>
  <button id="upgrade2">Clown Printer</button>
  <button id="upgrade3">Clown Factory</button></p>

  <p id="upgradeCostText1">Tree: <span id="upgradeCost1">${upgradeCost1}</span> clowns (Owned: <span id="upgradeOwned1">0</span>)</p>
  <p id="upgradeCostText2">Printer: <span id="upgradeCost2">${upgradeCost2}</span> clowns (Owned: <span id="upgradeOwned2">0</span>)</p>
  <p id="upgradeCostText3">Factory: <span id="upgradeCost3">${upgradeCost3}</span> clowns (Owned: <span id="upgradeOwned3">0</span>)</p>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

const upgradeButton1 = document.getElementById("upgrade1")!;
const upgradeButton2 = document.getElementById("upgrade2")!;
const upgradeButton3 = document.getElementById("upgrade3")!;

const upgradeOwned1Element = document.getElementById("upgradeOwned1")!;
const upgradeOwned2Element = document.getElementById("upgradeOwned2")!;
const upgradeOwned3Element = document.getElementById("upgradeOwned3")!;

const growthRateElement = document.getElementById("growthRate")!;

// Buttons

button.addEventListener("click", () => {
  console.log("Clowns:", button, counterElement, counter);
  counter++;
  counterElement.textContent = Math.floor(counter).toString();
});

upgradeButton1.addEventListener("click", () => {
  if (counter >= upgradeCost1) {
    counter -= upgradeCost1;
    upgradeOwned1 += 1;
    upgradeOwned1Element.textContent = upgradeOwned1.toString();
  }
});

upgradeButton2.addEventListener("click", () => {
  if (counter >= upgradeCost2) {
    counter -= upgradeCost2;
    upgradeOwned2 += 1;
    upgradeOwned2Element.textContent = upgradeOwned2.toString();
  }
});

upgradeButton3.addEventListener("click", () => {
  if (counter >= upgradeCost3) {
    counter -= upgradeCost3;
    upgradeOwned3 += 1;
    upgradeOwned3Element.textContent = upgradeOwned3.toString();
  }
});

// Update

let lastTime = performance.now();

function update() {
  const currentTime = performance.now();
  const timepassed = (currentTime - lastTime) / 1000;

  const rate = upgradeOwned1 * upgradeRate1 + upgradeOwned2 * upgradeRate2 +
    upgradeOwned3 * upgradeRate3;
  counter += rate * timepassed;
  lastTime = currentTime;

  counterElement.textContent = Math.floor(counter).toString();
  growthRateElement.textContent = `Growth Rate: ${rate.toFixed(2)} clowns/sec`;
  upgradeOwned1Element.textContent = upgradeOwned1.toString();
  upgradeOwned2Element.textContent = upgradeOwned2.toString();
  upgradeOwned3Element.textContent = upgradeOwned3.toString();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
