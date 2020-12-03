const board = (size) => {
  const board = []
  for (let i = 0; i < size; i++) {
    const row = []
    for (let j = 0; j < size; j++) {
      row.push({ id: [i, j], element: null, reveal: false, flag: false })
    }
    board.push(row)
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
const createBoard = (size, bomb) => {
  const gameBoard = board(size)
  const randomBombCells = getRandomBombCells(gameBoard, size)
  while (randomBombCells.length) {
    let [row, column] = randomBombCells.pop()
    gameBoard[row][column].element = bomb
  }
  return countNeighbors(gameBoard, bomb)
}

const writeBoard = (board, cellProp, revealedCount, bomb) => {
  let [i, j] = cellProp.id
  const element = cellProp.element

  if (element === 0) {
    return checkNeighbors(i, j, board, revealedCount)
  } else if (element === bomb) {
    return { board: board, revealedCount, gameOver: true }
  } else {
    board[i][j].reveal = true
    revealedCount++
    return { board, revealedCount, gameOver: false }
  }
}
const countNeighbors = (board, bomb) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].element === bomb) continue

      let element = 0
      if (topLeft(i, j, board, bomb)) element++
      if (top(i, j, board, bomb)) element++
      if (topRight(i, j, board, bomb)) element++
      if (right(i, j, board, bomb)) element++
      if (bottomRight(i, j, board, bomb)) element++
      if (bottom(i, j, board, bomb)) element++
      if (bottomLeft(i, j, board, bomb)) element++
      if (left(i, j, board, bomb)) element++
      board[i][j].element = element
    }
  }
  return board
}
//top left
const topLeft = (i, j, board, bomb) => {
  if (i > 0 && j > 0 && board[i - 1][j - 1].element === bomb) {
    return true
  } else {
    return false
  }
}
//top
const top = (i, j, board, bomb) => {
  if (i > 0 && board[i - 1][j].element === bomb) {
    return true
  } else {
    return false
  }
}
//top right
const topRight = (i, j, board, bomb) => {
  if (i > 0 && j < board[i].length - 1 && board[i - 1][j + 1].element === bomb) {
    return true
  } else {
    return false
  }
}
//right
const right = (i, j, board, bomb) => {
  if (j < board[i].length - 1 && board[i][j + 1].element === bomb) {
    return true
  } else {
    return false
  }
}
//right bottom
const bottomRight = (i, j, board, bomb) => {
  if (i < board.length - 1 && j < board[i].length - 1 && board[i + 1][j + 1].element === bomb) {
    return true
  } else {
    return false
  }
}
//bottom
const bottom = (i, j, board, bomb) => {
  if (i < board.length - 1 && board[i + 1][j].element === bomb) {
    return true
  } else {
    return false
  }
}
//left bottom
const bottomLeft = (i, j, board, bomb) => {
  if (j > 0 && i < board.length - 1 && board[i + 1][j - 1].element === bomb) {
    return true
  } else {
    return false
  }
}
//left
const left = (i, j, board, bomb) => {
  if (j > 0 && board[i][j - 1].element === bomb) {
    return true
  } else {
    return false
  }
}


const checkNeighbors = (i, j, board, revealedCount) => {
  const stack = [[i, j]]
  const size = board.length
  let count = revealedCount
  const visited = new Map()
  const isVisited = (map, i, j) => {
    return (map.has(i) && map.get(i).has(j)) ? true : false
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