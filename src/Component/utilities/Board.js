import React, { Component } from 'react'

class Board extends Component {
  constructor(size, bomb) {
    super(size)
    this.boardSize = size
    this.bomb = bomb
    this.gameBoard = this.board(this.boardSize)
    this.randomBombCells = this.getRandomBombCells()
    this.revealedCount = 0
    this.gameOver = false
  }
  createBoard() {
    const copyRandomBombCells = this.randomBombCells.slice()
    while (copyRandomBombCells.length) {
      let [row, col] = copyRandomBombCells.pop()
      this.gameBoard[row][col].element = this.bomb
    }
    this.countNeighbors()
    return this.gameBoard
  }
  countNeighbors() {
    for (let i = 0; i < this.gameBoard.length; i++) {
      for (let j = 0; j < this.gameBoard[i].length; j++) {
        if (this.gameBoard[i][j].element === this.bomb) continue

        let element = 0

        // topLeft
        if (i > 0 && j > 0 && this.gameBoard[i - 1][j - 1].element === this.bomb) element++

        // top
        if (i > 0 && this.gameBoard[i - 1][j].element === this.bomb) element++

        // topRight
        if (i > 0 && j < this.gameBoard[i].length - 1 && this.gameBoard[i - 1][j + 1].element === this.bomb) element++

        // right
        if (j < this.gameBoard[i].length - 1 && this.gameBoard[i][j + 1].element === this.bomb) element++

        // bottomRight
        if (i < this.gameBoard.length - 1 && j < this.gameBoard[i].length - 1 && this.gameBoard[i + 1][j + 1].element === this.bomb) element++

        // bottom
        if (i < this.gameBoard.length - 1 && this.gameBoard[i + 1][j].element === this.bomb) element++

        // bottomLeft
        if (j > 0 && i < this.gameBoard.length - 1 && this.gameBoard[i + 1][j - 1].element === this.bomb) element++

        // left
        if (j > 0 && this.gameBoard[i][j - 1].element === this.bomb) element++

        this.gameBoard[i][j].element = element
      }
    }
  }
  board(size) {
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
  getRandomBombCells() {
    const randomBombCells = []
    while (randomBombCells.length < this.boardSize) {
      const row = Math.floor(Math.random() * this.boardSize)
      const column = Math.floor(Math.random() * this.boardSize)
      if (this.gameBoard[row][column].element === null) {
        randomBombCells.push([row, column])
      }
    }
    return randomBombCells
  }
  writeBard(cell) {
    let [row, col] = cell.id
    const element = cell.element
    if (element === this.bomb) {
      this.gameOver = true
      return
    }
    if (element === 0) {
      this.checkNeighbors(row, col)
    } else {
      this.gameBoard[row][col].reveal = true
      this.revealedCount++
    }
  }
  checkNeighbors(row, col) {
    const stack = [[row, col]]
    let count = this.revealedCount
    const visited = new Map()

    const isVisited = (row, col) => {
      return (visited.has(row) && visited.get(row).has(col))
    }

    const openCell = (row, col) => {
      if (isVisited(row, col)) return
      if (!this.gameBoard[row][col].reveal) {
        this.gameBoard[row][col].reveal = true
        count++
      }
      if (this.gameBoard[row][col].element === 0) {
        stack.push([row, col])
      }
    }

    while (stack.length) {
      let [row, col] = stack.pop()

      if (!this.gameBoard[row][col].reveal) {
        this.gameBoard[row][col].reveal = true
        count++
      }

      visited.set(row, (visited.get(row) || new Set()).add(col))

      if (col > 0) openCell(row, col - 1)
      if (row > 0) openCell(row - 1, col)
      if (col < this.boardSize - 1) openCell(row, col + 1)
      if (row < this.boardSize - 1) openCell(row + 1, col)
    }
  }






}
export default Board