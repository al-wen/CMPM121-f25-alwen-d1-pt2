//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>D1</h1>
  <p>Clowns: <span id="counter">0</span></p>
  <button id="increment">🤡</button>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  console.log("Clowns:", button, counterElement, counter);
  counter++;
  counterElement.textContent = Math.floor(counter).toString();
});

let lastTime = performance.now();

function update() {
  const currentTime = performance.now();
  const timepassed = (currentTime - lastTime) / 1000;

  counter += timepassed;

  counterElement.textContent = Math.floor(counter).toString();

  lastTime = currentTime;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
