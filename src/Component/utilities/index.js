const board = (size) => {
  //each cell in the board has {id, color}
  const closedBoard = []
  const openedBoard = []
  for (let i = 0; i < size; i++) {
    const close = []
    const open = []
    for (let j = 0; j < size; j++) {
      close.push({ id: [i, j], element: null, reveal: false, flag: false })
      open.push({ id: [i, j], element: null, reveal: true, flag: false })
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
      if (board[i][j].element === '🧨') continue

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
  if (i > 0 && j > 0 && board[i - 1][j - 1].element === '🧨') {
    return true
  } else {
    return false
  }
}
//top
const top = (i, j, board) => {
  if (i > 0 && board[i - 1][j].element === '🧨') {
    return true
  } else {
    return false
  }
}
//top right
const topRight = (i, j, board) => {
  if (i > 0 && j < board[i].length - 1 && board[i - 1][j + 1].element === '🧨') {
    return true
  } else {
    return false
  }
}
//right
const right = (i, j, board) => {
  if (j < board[i].length - 1 && board[i][j + 1].element === '🧨') {
    return true
  } else {
    return false
  }
}
//right bottom
const bottomRight = (i, j, board) => {
  if (i < board.length - 1 && j < board[i].length - 1 && board[i + 1][j + 1].element === '🧨') {
    return true
  } else {
    return false
  }
}
//bottom
const bottom = (i, j, board) => {
  if (i < board.length - 1 && board[i + 1][j].element === '🧨') {
    return true
  } else {
    return false
  }
}
//left bottom
const bottomLeft = (i, j, board) => {
  if (j > 0 && i < board.length - 1 && board[i + 1][j - 1].element === '🧨') {
    return true
  } else {
    return false
  }
}
//left
const left = (i, j, board) => {
  if (j > 0 && board[i][j - 1].element === '🧨') {
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
    gameBoard.openedBoard[row][column].element = '🧨'
    gameBoard.closedBoard[row][column].element = '🧨'
  }

  return { openedBoard: countNeighbors(gameBoard.openedBoard), closedBoard: countNeighbors(gameBoard.closedBoard) }
}

const writeBoard = (board, cellProp, revealedCount, openedBoard) => {
  let [i, j] = cellProp.id
  const element = cellProp.element

  if (element === 0) {
    return checkNeighbors(i, j, board, revealedCount)
  } else if (element === '🧨') {
    return { board: openedBoard, revealedCount, gameOver: true }
  } else {
    board[i][j].reveal = true
    revealedCount++
    return { board, revealedCount, gameOver: false }
  }
}
const checkNeighbors = (i, j, board, revealedCount) => {
  const stack = [[i, j]]
  const size = board.length
  let count = revealedCount
  const visited = new Map()
  const isVisited = (map, i, j) => {
    if (map.has(i) && map.get(i).has(j)) {
      return true
    } else {
      return false
    }
  }
  while (stack.length) {
    let [i, j] = stack.pop()

    if (!board[i][j].reveal) {
      board[i][j].reveal = true
      count++
    }
    visited.set(i, (visited.get(i) || new Set()).add(j))
    if (j > 0 && !isVisited(visited, i, j - 1)) {
      if (!board[i][j - 1].reveal) {
        board[i][j - 1].reveal = true
        count++
      }
      if (board[i][j - 1].element === 0) {
        stack.push([i, j - 1, visited])
      }
    }
    if (i > 0 && !isVisited(visited, i - 1, j)) {
      if (!board[i - 1][j].reveal) {
        board[i - 1][j].reveal = true
        count++
      }
      if (board[i - 1][j].element === 0) {
        stack.push([i - 1, j, visited])
      }
    }
    if (j < size - 1 && !isVisited(visited, i, j + 1)) {
      if (!board[i][j + 1].reveal) {
        board[i][j + 1].reveal = true
        count++
      }
      if (board[i][j + 1].element === 0) {
        stack.push([i, j + 1, visited])
      }
    }
    if (i < size - 1 && !isVisited(visited, i + 1, j)) {
      if (!board[i + 1][j].reveal) {
        board[i + 1][j].reveal = true
        count++
      }
      if (board[i + 1][j].element === 0) {
        stack.push([i + 1, j, visited])
      }
    }
  }

  return { board, revealedCount: count, gameOver: false }
}


export default createBoard
export { writeBoard }