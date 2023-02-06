var boardWidth = 20;
var boardHeight = 20;
var pixelsPerCell = 50;
var board = getCanvasBoard();


drawHorizontalLine(2);
drawHorizontalLine(4);


var lineNumber = 5;

drawHorizontalLine(lineNumber);

lineNumber = 6 + 3;

drawHorizontalLine(lineNumber);



for (var i = 5; i < 10; i++) {
    drawVerticalLine(i);
}


function drawHorizontalLine(lineNumber) {
    const x = 0;
    const y = lineNumber * pixelsPerCell;
    const width = boardWidth * pixelsPerCell;
    const height = 0;
    board.strokeRect(x, y, width, height);
}

function drawVerticalLine(columnNumber) {
    const x = columnNumber * pixelsPerCell;
    const y = 0;
    const width = 0;
    const height = boardHeight * pixelsPerCell;
    board.strokeRect(x, y, width, height);
}

function getCanvasBoard() {
    const canvas = document.getElementById("canvas");
    canvas.setAttribute("width", (boardWidth * pixelsPerCell).toString());
    canvas.setAttribute("height", (boardHeight * pixelsPerCell).toString());
    const board = canvas.getContext("2d");
    return board;
}