let display = document.getElementById("display");
let justCalculated = false; // 🔹 flag to track if result was just shown

function append(value) {
  if (justCalculated) {
    // If last action was "=", start fresh when typing a number
    if (!isNaN(value)) {  
      display.value = value; 
    } else {
      // if it's an operator, continue using the result
      display.value += value;
    }
    justCalculated = false;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "";
  justCalculated = false;
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
    justCalculated = true; // ✅ mark that we just calculated
  } catch {
    display.value = "Error";
    justCalculated = false;
  }
}
// 🌙 Dark / Light Toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// ✅ Keyboard support stays the same
document.addEventListener("keydown", function(event) {
  if (event.key >= "0" && event.key <= "9") {
    append(event.key);
  } else if (["+", "-", "*", "/","%","."].includes(event.key)) {
    append(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (event.key === "Delete") {
    clearDisplay();
  }
});