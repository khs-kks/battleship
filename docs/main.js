/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU1BLGVBQWUsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7QUFFcEUsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQzlCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUM5QixNQUFNQyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNoREQsVUFBVSxDQUFDRSxPQUFPLENBQUNDLEdBQUcsR0FBR0wsQ0FBQyxDQUFDTSxRQUFRLEVBQUU7SUFDckNKLFVBQVUsQ0FBQ0UsT0FBTyxDQUFDRyxNQUFNLEdBQUdOLENBQUMsQ0FBQ0ssUUFBUSxFQUFFO0lBQ3hDSixVQUFVLENBQUNNLFdBQVcsR0FBRyxHQUFHO0lBQzVCTixVQUFVLENBQUNPLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUN2Q1IsVUFBVSxDQUFDTyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7SUFFekNiLGVBQWUsQ0FBQ2MsV0FBVyxDQUFDVCxVQUFVLENBQUM7RUFDekM7QUFDRjtBQUVBLE1BQU1VLFdBQVcsR0FBR2QsUUFBUSxDQUFDQyxhQUFhLENBQUMsZUFBZSxDQUFDO0FBQzNELE1BQU1jLGFBQWEsR0FBR2YsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7QUFFL0QsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQzlCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUM5QixNQUFNQyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNoREQsVUFBVSxDQUFDRSxPQUFPLENBQUNDLEdBQUcsR0FBR0wsQ0FBQyxDQUFDTSxRQUFRLEVBQUU7SUFDckNKLFVBQVUsQ0FBQ0UsT0FBTyxDQUFDRyxNQUFNLEdBQUdOLENBQUMsQ0FBQ0ssUUFBUSxFQUFFO0lBQ3hDSixVQUFVLENBQUNPLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNuQ1IsVUFBVSxDQUFDTSxXQUFXLEdBQUcsR0FBRztJQUM1QjtJQUNBO0lBQ0E7O0lBRUEsTUFBTU0sV0FBVyxHQUFHWixVQUFVLENBQUNhLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDOUNILFdBQVcsQ0FBQ0QsV0FBVyxDQUFDVCxVQUFVLENBQUM7SUFDbkNXLGFBQWEsQ0FBQ0YsV0FBVyxDQUFDRyxXQUFXLENBQUM7RUFDeEM7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWxlY3RTaGlwc0dyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtc2VsZWN0LXNoaXBzXCIpO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuICAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTtcbiAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuXG4gICAgc2VsZWN0U2hpcHNHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuICB9XG59XG5cbmNvbnN0IGFpQm9hcmRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haWJvYXJkLWdyaWRcIik7XG5jb25zdCB5b3VyQm9hcmRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi55b3VyYm9hcmQtZ3JpZFwiKTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4gICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbiAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJteXNoaXBzXCIpO1xuICAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAvLyAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAvLyAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuICAgIC8vICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcblxuICAgIGNvbnN0IHNpbmdsZUNlbGwyID0gc2luZ2xlQ2VsbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4gICAgeW91ckJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsMik7XG4gIH1cbn1cblxuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbi8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbi8vICAgICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbi8vICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4vLyAgICAgLy8gICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4vLyAgICAgLy8gICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTtcbi8vICAgICAvLyAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG5cbi8vICAgICAgIHlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4vLyAgICAgfVxuLy8gICB9XG4iXSwibmFtZXMiOlsic2VsZWN0U2hpcHNHcmlkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaSIsImoiLCJzaW5nbGVDZWxsIiwiY3JlYXRlRWxlbWVudCIsImRhdGFzZXQiLCJyb3ciLCJ0b1N0cmluZyIsImNvbHVtbiIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJhaUJvYXJkR3JpZCIsInlvdXJCb2FyZEdyaWQiLCJzaW5nbGVDZWxsMiIsImNsb25lTm9kZSJdLCJzb3VyY2VSb290IjoiIn0=