const board = (size) => {
  //each cell in the board has {id, color}
  const board = []
  for (let i = 0; i < size; i++) {
    const arr = []
    for (let j = 0; j < size; j++) {
      arr.push({ id: [i, j], element: null, reveal: true })
    }
    board.push(arr)
  }
  return board
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
  const randomBombCells = getRandomBombCells(gameBoard, size)
  while (randomBombCells.length) {
    let [row, column] = randomBombCells.pop()
    gameBoard[row][column].element = '💣'
  }

  return countNeighbors(gameBoard)
}
export default createBoard