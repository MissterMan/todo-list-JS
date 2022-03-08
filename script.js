//Select an Elemet
const input = document.querySelector("#kegiatan");
const buttontambah = document.querySelector(".tambah");
const buttonClear = document.querySelector(".clear");

const content = document.querySelector(".content");

buttontambah.disabled = true;
let totalKegiatan = 0;

updateDisplay();
getElement();

input.addEventListener("input", function () {
  if (input.value == "") {
    buttontambah.disabled = true;
  } else {
    buttontambah.disabled = false;
  }
});

buttontambah.addEventListener("click", function () {
  if (input.value == "") {
    alert("Text Field Empty");
    return;
  }
  // Generate Button
  const button = document.createElement("button");
  const buttonText = document.createTextNode("X");

  // Generate Span
  const span = document.createElement("span");
  const spanText = document.createTextNode(input.value);

  // Merge Text and Giving ClassName
  span.appendChild(spanText);
  span.classList.add("list");

  // Merge Text and Giving ClassName
  button.appendChild(buttonText);
  button.classList.add("close");

  // Generate Container List
  const div = document.createElement("div");
  div.classList.add("container-list");

  // Append Container List to Content
  content.appendChild(div);

  // Append Element to Container List
  div.appendChild(span);
  div.appendChild(button);

  saveElement();

  alert(`Kamu menambahkan ` + input.value + ` ke Todo List kamu`);

  // Set Value empty disable
  input.value = "";
  buttontambah.disabled = true;

  // Save total kegiatan at local storage
  totalKegiatan++;
  localStorage.setItem("jumlah", totalKegiatan);

  //updating display count
  updateDisplay();
  saveElement();
});

content.addEventListener("click", function (e) {
  if (e.target.classList == "close") {
    const spanText = e.target.previousSibling.innerHTML;
    const konfirmasi = confirm(
      `Kamu akan menghapus ${spanText} dari list kamu`
    );
    if (konfirmasi === true) {
      e.target.parentElement.remove();
      totalKegiatan--;
      localStorage.setItem("jumlah", totalKegiatan);
      updateDisplay();
    }
  }
});

buttonClear.addEventListener("click", function () {
  const contentList = document.querySelectorAll(".container-list");
  contentList.forEach((element) => {
    element.remove();
    // totalKegiatan = 0;
    // localStorage.setItem("jumlah", totalKegiatan);
    // localStorage.setItem("textSpan", totalKegiatan);
    localStorage.clear();
    updateDisplay();
  });
});

function updateDisplay() {
  const jumlah = document.querySelector(".jumlah");
  const getLocal = localStorage.getItem("jumlah");
  jumlah.innerHTML = `Total Kegiatan kamu ${getLocal}`;

  if (window.localStorage == null) {
    content.innerHTML = "Kegiatan kosong";
  }
}

function saveElement() {
  const list = document.querySelectorAll(".list");
  // Tidak bisa karena mengembalikan array
  // localStorage.setItem("textSpan", list.innerHTML);

  list.forEach((element) => {
    let textSpan = element.innerHTML;
    localStorage.setItem("textSpan", textSpan);
  });
}

function getElement() {
  let local = localStorage.getItem("textSpan");
  console.log(local);

  // Generate Button
  const button = document.createElement("button");
  const buttonText = document.createTextNode("X");

  // Generate Span
  const span = document.createElement("span");
  const spanText = document.createTextNode(local);

  // Merge Text and Giving ClassName
  span.appendChild(spanText);
  span.classList.add("list");

  // Merge Text and Giving ClassName
  button.appendChild(buttonText);
  button.classList.add("close");

  // Generate Container List
  const div = document.createElement("div");
  div.classList.add("container-list");

  // Append Container List to Content
  content.appendChild(div);

  // Append Element to Container List
  div.appendChild(span);
  div.appendChild(button);

  totalKegiatan++;
  updateDisplay();
}
