let array = generateArray(20);
let sorting = false;
let paused = false;

/* ===== MANUAL MODE STATE ===== */
let manualMode = false;
let adding = false;

const sizeInput = document.getElementById("arraySize");
const gapInput = document.getElementById("barGap");
const speedInput = document.getElementById("speed");
const algoSelect = document.getElementById("algorithm");
const startBtn = document.getElementById("startBtn");

/* ===== MANUAL MODE ELEMENTS ===== */
const manualBtn = document.getElementById("manualBtn");
const manualSection = document.getElementById("manualSection");
const addValueBtn = document.getElementById("addValueBtn");
const valueInput = document.getElementById("valueInput");
const manualInfo = document.getElementById("manualInfo");

function calcDelay() {
  const percent = speedInput.value;
  document.getElementById("speedLabel").innerText = percent + "%";
  return 20 + Math.pow((100 - percent), 2) * 0.8;
}

function updateLabels() {
  document.getElementById("sizeLabel").innerText = sizeInput.value;
  document.getElementById("gapLabel").innerText = gapInput.value;
  document.getElementById("speedLabel").innerText = speedInput.value + "%";
}

/* ---------- MANUAL MODE TOGGLE ---------- */
manualBtn.addEventListener("click", () => {
  manualMode = !manualMode;

  manualSection.style.display = manualMode ? "block" : "none";
  manualBtn.innerText = manualMode ? "Manual Mode ON" : "Add Manually";

  if (manualMode) {
    array = [];
    manualInfo.innerText = "";
    renderBars(array, gapInput.value);
  }
});

/* ---------- ADD VALUE MANUALLY (NEGATIVE FIX) ---------- */
addValueBtn.addEventListener("click", async () => {
  if (!manualMode || adding || sorting) return;

  const maxSize = Number(sizeInput.value);
  const val = Number(valueInput.value);

  if (valueInput.value === "" || isNaN(val)) {
    manualInfo.innerText = "Enter a valid number";
    return;
  }

  /* ❌ BLOCK NEGATIVE VALUES */
  if (val < 0) {
    manualInfo.innerText = "Negative values are not allowed";
    return;
  }

  if (array.length >= maxSize) {
    manualInfo.innerText = "Array size limit reached";
    return;
  }

  adding = true;
  array.push(val);
  manualInfo.innerText = `Added ${array.length} / ${maxSize}`;
  valueInput.value = "";

  renderBars(array, gapInput.value);
  await new Promise(res => setTimeout(res, 1000));
  adding = false;
});

/* ---------- ARRAY SIZE CHANGE ---------- */
sizeInput.oninput = () => {
  updateLabels();
  if (!manualMode && !sorting) {
    array = generateArray(sizeInput.value);
    renderBars(array, gapInput.value);
  }
};

gapInput.oninput = () => renderBars(array, gapInput.value);
speedInput.oninput = updateLabels;

/* ---------- RESET ---------- */
function resetArray() {
  sorting = false;
  paused = false;
  startBtn.innerText = "Start Sorting";

  if (manualMode) {
    array = [];
    manualInfo.innerText = "";
  } else {
    array = generateArray(sizeInput.value);
  }

  renderBars(array, gapInput.value);
}

/* ---------- SORT (PAUSE / RESUME) ---------- */
async function toggleSort() {

  /* PAUSE */
  if (sorting) {
    sorting = false;
    startBtn.innerText = "Resume";
    return;
  }

  if (array.length === 0) return;

  /* START / RESUME */
  sorting = true;
  startBtn.innerText = "Stop";

  const delay = calcDelay();
  const gap = gapInput.value;
  const shouldStop = () => !sorting;

  if (algoSelect.value === "bubble")
    await bubbleSort(array, delay, gap, shouldStop);

  if (algoSelect.value === "insertion")
    await insertionSort(array, delay, gap, shouldStop);

  if (algoSelect.value === "merge")
    await mergeSort(array, delay, gap, shouldStop);

  if (algoSelect.value === "counting")
    await countingSort(array, delay, gap, shouldStop);

  sorting = false;
  startBtn.innerText = "Start Sorting";
}

function showAlgorithm() {
  window.open("algorithms.html", "_blank");
}

updateLabels();
renderBars(array, gapInput.value);
