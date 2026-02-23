const barsContainer = document.getElementById("bars");

function renderBars(array, gap, comparing = [], sorted = [], showNumbers = true) {
  barsContainer.innerHTML = "";
  barsContainer.style.gap = gap + "px";

  const barWidth = Math.max(4, (barsContainer.clientWidth / array.length) - gap);

  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.className = "bar";

    if (comparing.includes(index)) bar.classList.add("compare");
    if (sorted.includes(index)) bar.classList.add("sorted");

    bar.style.height = (value / 100) * 100 + "%";
    bar.style.width = barWidth + "px";

    if (showNumbers) {
      const label = document.createElement("span");
      label.innerText = value;
      bar.appendChild(label);
    }

    barsContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}
