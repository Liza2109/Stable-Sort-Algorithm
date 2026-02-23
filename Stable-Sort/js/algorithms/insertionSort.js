async function insertionSort(arr, speed, gap, shouldStop) {
  let a = [...arr];
  let sorted = [0];

  for (let i = 1; i < a.length; i++) {
    if (shouldStop()) return null;

    let key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      if (shouldStop()) return null;

      a[j + 1] = a[j];
      renderBars(a, gap, [j, j+1], sorted);
      await sleep(speed);
      j--;
    }
    a[j + 1] = key;
    sorted.push(i);
  }

  renderBars(a, gap, [], sorted);
  return a;
}
