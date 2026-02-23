async function bubbleSort(arr, speed, gap, shouldStop) {
  let a = [...arr];
  let sorted = [];

  for (let i = 0; i < a.length - 1; i++) {
    if (shouldStop()) return null;

    for (let j = 0; j < a.length - i - 1; j++) {
      if (shouldStop()) return null;

      renderBars(a, gap, [j, j+1], sorted);
      await sleep(speed);

      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];
      }
    }
    sorted.push(a.length - 1 - i);
  }

  renderBars(a, gap, [], [...sorted, 0]);
  return a;
}
