async function mergeSort(arr, speed, gap, shouldStop) {
  async function helper(a) {
    if (a.length <= 1 || shouldStop()) return a;

    const mid = Math.floor(a.length / 2);
    const left = await helper(a.slice(0, mid));
    const right = await helper(a.slice(mid));

    return merge(left, right);
  }

  async function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
      if (shouldStop()) return result;

      result.push(left[0] <= right[0] ? left.shift() : right.shift());
      renderBars([...result, ...left, ...right], gap);
      await sleep(speed);
    }
    return [...result, ...left, ...right];
  }

  return helper(arr);
}
