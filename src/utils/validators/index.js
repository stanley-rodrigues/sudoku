
export const solver = (grid, row = 0, col = 0) => {
  if (grid[row][col] !== -1) {
    const isLast = row >= 8 && col >= 8;
    if (!isLast) {
      const [newRow, newCol] = getNext(row, col);
      return solver(grid, newRow, newCol);
    }
  }

  for (let num = 1; num <= 9; num++) {

    if (checkValid(grid, row, col, num)) {
      grid[row][col] = num;
      const [newRow, newCol] = getNext(row, col);

      if (!newRow && !newCol) return true;
      if (solver(grid, newRow, newCol)) return true;
    }
  }

  grid[row][col] = -1;
  return false;
};


const getNext = (row, col) => {
  return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
};

const checkValid = (grid, row, col, num) => {

  if (
    checkRow(grid, row, num) &&
    checkCol(grid, col, num) &&
    checkBox(grid, row, col, num)
  )
    return true;

  return false;
};

const checkRow = (grid, row, num) => {

  return grid[row].indexOf(num) === -1;
};

const checkCol = (grid, col, num) => {

  return grid.map((row) => row[col]).indexOf(num) === -1;
};

const checkBox = (grid, row, col, num) => {
  let boxArr = [],
    rowStart = row - (row % 3),
    colStart = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boxArr.push(grid[rowStart + i][colStart + j]);
    }
  }
  return boxArr.indexOf(num) === -1;
};


export const compareSudokus = (currentSudoku, solvedSudoku) => {

  const res = {
    isComplete: true,
    isSolvable: true,
  };


  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
        if (currentSudoku[i][j] !== -1) {
          res.isSolvable = false;
        }
        res.isComplete = false;
      }
    }
  }
  return res;
};
