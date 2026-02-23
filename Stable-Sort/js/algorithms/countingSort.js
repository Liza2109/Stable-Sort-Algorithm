async function countingSort(array, delay, gap, shouldStop) {

  const max = Math.max(...array);
  const min = Math.min(...array);

  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(array.length);

  // 🔵 Initial unsorted
  renderBars(array, gap);
  await new Promise(res => setTimeout(res, delay));

  /* ---------- COUNT FREQUENCY ---------- */
  for (let i = 0; i < array.length; i++) {
    if (shouldStop()) return;
    count[array[i] - min]++;
  }

  /* ---------- PREFIX SUM ---------- */
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  /* ---------- BUILD OUTPUT (NO VISUAL) ---------- */
  for (let i = array.length - 1; i >= 0; i--) {
    if (shouldStop()) return;

    const value = array[i];
    const pos = count[value - min] - 1;

    output[pos] = value;
    count[value - min]--;
  }

  /* ---------- COPY BACK + RED ACTIVE ---------- */
  for (let i = 0; i < array.length; i++) {
    if (shouldStop()) return;

    array[i] = output[i];
    renderBars(array, gap, [i]); // 🔴 active bar
    await new Promise(res => setTimeout(res, delay));
  }

  /* ---------- FINAL SORTED (GREEN) ---------- */
  const sortedIndices = [];
  for (let i = 0; i < array.length; i++) {
    sortedIndices.push(i);
  }

  renderBars(array, gap, [], sortedIndices); // 🟢 all sorted
}
