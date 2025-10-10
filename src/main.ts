//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;

let upgradeCounter: number = 0;

const upgradeCost: number = 10;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>D1</h1>
  <p>Clowns: <span id="counter">0</span></p>
  <button id="increment">🤡</button></p>
  <button id="upgrade">▲</button></p>
  <p id="upgradeCostText">Upgrade: <span id="upgradeCost">${upgradeCost}</span> clowns</p>
  <p>Upgrades: <span id="upgradeCounter">0</span></p>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const upgradeButton = document.getElementById("upgrade")!;
const upgradeElement = document.getElementById("upgradeCounter")!;
//const upgradeCostText = document.getElementById("upgradeCost")!;

// Buttons

button.addEventListener("click", () => {
  console.log("Clowns:", button, counterElement, counter);
  counter++;
  counterElement.textContent = Math.floor(counter).toString();
});

upgradeButton.addEventListener("click", () => {
  if (counter >= upgradeCost) {
    counter -= upgradeCost;
    upgradeCounter += 1;
    upgradeElement.textContent = Math.floor(upgradeCounter).toString();
    console.log("Upgrades:", upgradeButton, upgradeElement, upgradeCounter);
  }
});

// Update

let lastTime = performance.now();

function update() {
  const currentTime = performance.now();
  const timepassed = (currentTime - lastTime) / 1000;

  counter += upgradeCounter * timepassed;
  lastTime = currentTime;

  counterElement.textContent = Math.floor(counter).toString();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
