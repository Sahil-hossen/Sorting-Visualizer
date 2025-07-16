const container = document.getElementById("array-container");
const algoSelector = document.getElementById("algo-selector");
let array = [];
let stopFlag = false;

function generateArray(size = 50) {
  array = [];
  stopFlag = false;
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 450) + 10;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
}

function stopSorting() {
  stopFlag = true;
}

async function startSorting() {
  const algo = algoSelector.value;
  if (algo === "bubble") await bubbleSort();
  else if (algo === "selection") await selectionSort();
  else if (algo === "insertion") await insertionSort();
  else if (algo === "merge") await mergeSort(0, array.length - 1);
  else if (algo === "quick") await quickSort(0, array.length - 1);
  else if (algo === "heap") await heapSort();
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1 && !stopFlag; i++) {
    for (let j = 0; j < array.length - i - 1 && !stopFlag; j++) {
      bars[j].classList.add("compared");
      bars[j + 1].classList.add("compared");
      await delay(30);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }
      bars[j].classList.remove("compared");
      bars[j + 1].classList.remove("compared");
    }
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length && !stopFlag; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length && !stopFlag; j++) {
      bars[j].classList.add("compared");
      await delay(30);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
      bars[j].classList.remove("compared");
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;
    }
    await delay(30);
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length && !stopFlag; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key && !stopFlag) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j]}px`;
      j--;
      await delay(30);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    await delay(30);
  }
}

async function mergeSort(left, right) {
  if (left >= right || stopFlag) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSort(left, mid);
  await mergeSort(mid + 1, right);
  await merge(left, mid, right);
}

async function merge(left, mid, right) {
  const bars = document.getElementsByClassName("bar");
  const leftArr = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while (i < leftArr.length && j < rightArr.length && !stopFlag) {
    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i];
      bars[k].style.height = `${leftArr[i]}px`;
      i++;
    } else {
      array[k] = rightArr[j];
      bars[k].style.height = `${rightArr[j]}px`;
      j++;
    }
    k++;
    await delay(30);
  }
  while (i < leftArr.length && !stopFlag) {
    array[k] = leftArr[i];
    bars[k].style.height = `${leftArr[i]}px`;
    i++;
    k++;
    await delay(30);
  }
  while (j < rightArr.length && !stopFlag) {
    array[k] = rightArr[j];
    bars[k].style.height = `${rightArr[j]}px`;
    j++;
    k++;
    await delay(30);
  }
}

async function quickSort(low, high) {
  if (low < high && !stopFlag) {
    let pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  const bars = document.getElementsByClassName("bar");
  let pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high && !stopFlag; j++) {
    bars[j].classList.add("compared");
    await delay(30);
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
    }
    bars[j].classList.remove("compared");
  }
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1]}px`;
  bars[high].style.height = `${array[high]}px`;
  await delay(30);
  return i + 1;
}

async function heapSort() {
  const bars = document.getElementsByClassName("bar");
  let n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0 && !stopFlag; i--) {
    await heapify(n, i);
  }
  for (let i = n - 1; i > 0 && !stopFlag; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    bars[0].style.height = `${array[0]}px`;
    bars[i].style.height = `${array[i]}px`;
    await delay(30);
    await heapify(i, 0);
  }
}

async function heapify(n, i) {
  const bars = document.getElementsByClassName("bar");
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && array[l] > array[largest]) largest = l;
  if (r < n && array[r] > array[largest]) largest = r;
  if (largest !== i && !stopFlag) {
    [array[i], array[largest]] = [array[largest], array[i]];
    bars[i].style.height = `${array[i]}px`;
    bars[largest].style.height = `${array[largest]}px`;
    await delay(30);
    await heapify(n, largest);
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

generateArray();
