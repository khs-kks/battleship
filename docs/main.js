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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU1BLGVBQWUsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7QUFFcEUsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQzlCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUM5QixNQUFNQyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNoREQsVUFBVSxDQUFDRSxPQUFPLENBQUNDLEdBQUcsR0FBR0wsQ0FBQyxDQUFDTSxRQUFRLEVBQUU7SUFDckNKLFVBQVUsQ0FBQ0UsT0FBTyxDQUFDRyxNQUFNLEdBQUdOLENBQUMsQ0FBQ0ssUUFBUSxFQUFFO0lBQ3hDSixVQUFVLENBQUNNLFdBQVcsR0FBRyxHQUFHO0lBQzVCTixVQUFVLENBQUNPLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUN2Q1IsVUFBVSxDQUFDTyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7SUFFekNiLGVBQWUsQ0FBQ2MsV0FBVyxDQUFDVCxVQUFVLENBQUM7RUFDekM7QUFDRixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWxlY3RTaGlwc0dyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtc2VsZWN0LXNoaXBzXCIpO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuICAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTtcbiAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuXG4gICAgc2VsZWN0U2hpcHNHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuICB9XG59XG4iXSwibmFtZXMiOlsic2VsZWN0U2hpcHNHcmlkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaSIsImoiLCJzaW5nbGVDZWxsIiwiY3JlYXRlRWxlbWVudCIsImRhdGFzZXQiLCJyb3ciLCJ0b1N0cmluZyIsImNvbHVtbiIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiXSwic291cmNlUm9vdCI6IiJ9