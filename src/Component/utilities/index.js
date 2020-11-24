const board = (size) => {
  //each cell in the board has {id, color}
  const closedBoard = []
  const openedBoard = []
  for (let i = 0; i < size; i++) {
    const close = []
    const open = []
    for (let j = 0; j < size; j++) {
      close.push({ id: [i, j], element: null, reveal: false })
      open.push({ id: [i, j], element: null, reveal: true })
    }
    closedBoard.push(close)
    openedBoard.push(open)
  }
  return { closedBoard, openedBoard }
}

const getRandomBombCells = (board, bombs) => {
  const randomBombCells = []
  while (randomBombCells.length < bombs) {
    const row = Math.floor(Math.random() * bombs)
    const column = Math.floor(Math.random() * bombs)
    if (board[row][column].element === null) {
      randomBombCells.push([row, column])
    }
  }
  return randomBombCells
}
const countNeighbors = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].element === '💣') continue

      let element = 0
      if (topLeft(i, j, board)) element++
      if (top(i, j, board)) element++
      if (topRight(i, j, board)) element++
      if (right(i, j, board)) element++
      if (bottomRight(i, j, board)) element++
      if (bottom(i, j, board)) element++
      if (bottomLeft(i, j, board)) element++
      if (left(i, j, board)) element++
      board[i][j].element = element
    }
  }
  return board
}
//top left
const topLeft = (i, j, board) => {
  if (i > 0 && j > 0 && board[i - 1][j - 1].element === '💣') {
    return true
  } else {
    return false
  }
}
//top
const top = (i, j, board) => {
  if (i > 0 && board[i - 1][j].element === '💣') {
    return true
  } else {
    return false
  }
}
//top right
const topRight = (i, j, board) => {
  if (i > 0 && j < board[i].length - 1 && board[i - 1][j + 1].element === '💣') {
    return true
  } else {
    return false
  }
}
//right
const right = (i, j, board) => {
  if (j < board[i].length - 1 && board[i][j + 1].element === '💣') {
    return true
  } else {
    return false
  }
}
//right bottom
const bottomRight = (i, j, board) => {
  if (i < board.length - 1 && j < board[i].length - 1 && board[i + 1][j + 1].element === '💣') {
    return true
  } else {
    return false
  }
}
//bottom
const bottom = (i, j, board) => {
  if (i < board.length - 1 && board[i + 1][j].element === '💣') {
    return true
  } else {
    return false
  }
}
//left bottom
const bottomLeft = (i, j, board) => {
  if (j > 0 && i < board.length - 1 && board[i + 1][j - 1].element === '💣') {
    return true
  } else {
    return false
  }
}
//left
const left = (i, j, board) => {
  if (j > 0 && board[i][j - 1].element === '💣') {
    return true
  } else {
    return false
  }
}

const createBoard = (size) => {
  const gameBoard = board(size)
  const randomBombCells = getRandomBombCells(gameBoard.openedBoard, size)
  while (randomBombCells.length) {
    let [row, column] = randomBombCells.pop()
    gameBoard.openedBoard[row][column].element = '💣'
    gameBoard.closedBoard[row][column].element = '💣'
  }

  return {openedBoard: countNeighbors(gameBoard.openedBoard), closedBoard: countNeighbors(gameBoard.closedBoard)}
}

const writeBoard = (board, cellProp, revealedCount, openedBoard) => {
  let [i, j] = cellProp.id
  const element = cellProp.element

  if (element === 0) {
    return checkNeighbors(i, j, board)
  } else if (element === '💣') {
    return { board: openedBoard, revealedCount, gameOver: true}
  } else {
    board[i][j].reveal = true
    revealedCount++
    return { board, revealedCount, gameOver: false }
  }
}
const checkNeighbors = (i, j, board, revealedCount) => {
  let row = i, cell = j
  let count = revealedCount
  const openCellAndCount = (row, cell) => {
    board[row][cell].reveal = true
    count++
  }
  const resetRowAndColumn = () => {
    row = i
    cell = j
  }
  const elementIsZero = (row, cell) => {
    return board[row][cell].element === 0
  }
  //go left
  while (cell >= 0 && elementIsZero(row, cell)) {
    openCellAndCount(row, cell)
    cell--
  }
  //go right
  resetRowAndColumn()
  while (cell < board[row].length && elementIsZero(row, cell)) {
    openCellAndCount(row, cell)
    cell++
  }

  //go up
  resetRowAndColumn()
  while (row >= 0 && elementIsZero(row, cell)) {
    openCellAndCount(row, cell)
    row--
  }

  //go down
  resetRowAndColumn()
  while (row < board.length && elementIsZero(row, cell)) {
    openCellAndCount(row, cell)
    row++
  }

  //check diaganal
  resetRowAndColumn()
  //go toward top left
  while (row >= 0 && cell >= 0 && elementIsZero(row, cell)) {
    openCellAndCount(row, cell)
    row--
    cell--
  }

  //go toward top right
  resetRowAndColumn()
  while (row >= 0 && cell < board[row].length && elementIsZero(row, cell)) {
    openCellAndCount(row, cell)
    row--
    cell++
  }

  //go toward bottom left
  resetRowAndColumn()
  while (row < board.length && cell >= 0 && elementIsZero(row, cell)) {
    openCellAndCount(row, cell)
    row++
    cell--
  }

  //go toward bottom right
  resetRowAndColumn()
  while (row < board.length && cell < board.length && elementIsZero(row, cell)) {
    openCellAndCount(row, cell)
    row++
    cell++
  }
  return { board, revealedCount: count, gameOver: false}
}


export default createBoard
export { writeBoard }