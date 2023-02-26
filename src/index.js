const selectShipsGrid = document.querySelector(".grid-select-ships");

for (let i = 0; i < 10; i += 1) {
  for (let j = 0; j < 10; j += 1) {
    const singleCell = document.createElement("div");
    singleCell.dataset.row = i.toString();
    singleCell.dataset.column = j.toString();
    singleCell.textContent = "X";
    singleCell.classList.add("placed-ship");
    singleCell.classList.add("cell-relative");

    selectShipsGrid.appendChild(singleCell);
  }
}

const aiBoardGrid = document.querySelector(".aiboard-grid");
const yourBoardGrid = document.querySelector(".yourboard-grid");

for (let i = 0; i < 10; i += 1) {
  for (let j = 0; j < 10; j += 1) {
    const singleCell = document.createElement("div");
    singleCell.dataset.row = i.toString();
    singleCell.dataset.column = j.toString();
    singleCell.classList.add("myships");
    singleCell.textContent = "X";
    //   singleCell.textContent = "X";
    //   singleCell.classList.add("placed-ship");
    //   singleCell.classList.add("cell-relative");

    const singleCell2 = singleCell.cloneNode(true);
    aiBoardGrid.appendChild(singleCell);
    yourBoardGrid.appendChild(singleCell2);
  }
}

//   for (let i = 0; i < 10; i += 1) {
//     for (let j = 0; j < 10; j += 1) {
//       const singleCell = document.createElement("div");
//       singleCell.dataset.row = i.toString();
//       singleCell.dataset.column = j.toString();
//     //   singleCell.textContent = "X";
//     //   singleCell.classList.add("placed-ship");
//     //   singleCell.classList.add("cell-relative");

//       yourBoardGrid.appendChild(singleCell);
//     }
//   }
