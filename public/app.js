let arr = [];

async function fetchData() {
  try {
    const res = await fetch('/api/movies');
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

displayData();

async function displayData() {
  const data = await fetchData();
  arr.push(...data);
  render(arr);
}

function render(arr) {
  console.log("Rendering data:", arr);

  const inputYear1 = parseInt(input.value);
  const inputYear2 = parseInt(input2.value);

  const filteredArr = arr.filter(item => {
    const releaseYear = new Date(item.releaseDate).getFullYear();
    if (isNaN(inputYear1) || isNaN(inputYear2)) {
      return true;
    }
    return releaseYear >= inputYear1 && releaseYear <= inputYear2;
  });

  const container = document.getElementById("container");
  container.innerHTML = "";

  filteredArr.forEach(item => {
    console.log(item);
    container.innerHTML += `
        <div class="course ${item.grade}">
            <img id="images" src="images/${item.image}" onerror="handleImageError(this)"></img>
            <h3>${item.title}</h3>
            <span>${item.age}</span>
            <span>${item.releaseDate}</span>
            <span>Rating: ${item.rating}</span>
        </div>`;
  });
}

function handleImageError(img) {
  console.log(`Error loading image: ${img}`);
}

const input = document.getElementById("input1");
const input2 = document.getElementById("input2");
const log = document.getElementById("log");

input.addEventListener("input", updateValue);
input2.addEventListener("input", updateValue);

function updateValue() {
  log.textContent = 'Sorting with year: ' + input.value + ' to ' + input2.value;
  render(arr);
}
