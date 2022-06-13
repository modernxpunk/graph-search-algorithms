import React, { useEffect, useState } from "react";
import Cell from './components/Cell'
import { get4directions, isTarget, search, types } from "./utils/const";

function App() {

  const [algorithm, setAlgorithm] = useState('default')

  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(20)

  const [board, setBoard] = useState(Array(width).fill('empty').map(w => w = Array(height).fill('empty')))

  const [startCell, setStartCell] = useState([Math.floor(height * 0.2) - 1, Math.floor(width / 2)])
  const [endCell, setEndCell] = useState([Math.floor(height * 0.8), Math.floor(width / 2)])

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setBoard(board => {
      const [startX, startY] = startCell
      const [endX, endY] = endCell

      board[startX][startY] = 's'
      board[endX][endY] = 'e'

      return [...board]
    })
  }, [])


  const getNeighbors = v => {
    const neighbors = []
    for (const [x, y] of get4directions(v)) {
      if (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
        if (board[x][y] !== "wall") {
          neighbors.push([x, y])
        }
      }
    }
    return neighbors
  }

  const draw = (cell, type, delay = 0) => {
    const [x, y] = cell
    setTimeout(() => {
      setBoard(board => {
        board[x][y] = type
        return [...board]
      })
    }, delay)
  }

  const drawPath = (path, delay) => {
    setTimeout(() => {
      let i = 0
      for (let v = endCell; v !== undefined; v = path[v]) {
        if (isTarget(v, startCell)) continue
        if (isTarget(v, endCell)) continue
        draw(v, 'path', 50 * i++)
      }
    }, delay)
  }

  const bfs = () => {
    let path = []

    const used = [startCell]
    const q = [startCell]

    while (q.length !== 0) {
      const v = q.shift()
      if (isTarget(v, endCell)) break
      for (const cell of getNeighbors(v)) {
        const [x, y] = cell
        if (!search(used, cell)) {
          q.push(cell)
          used.push(cell)
          path[cell] = v
          !(isTarget([x, y], endCell)) && draw(cell, 'notEmpty', 10 * used.length)
        }
      }
    }
    drawPath(path, 10 * used.length)
  }

  const visualize = () => {
    if (algorithm === "bfs") bfs()
    else if (algorithm === "dfs") dfs()
    else if (algorithm === "dijkstra") dijkstra()
    else {
      setErrorMessage('Select algoritm')
      setTimeout(() => setErrorMessage(''), 1500)
    }
  }

  const dfs = () => {
    const used = []
    const p = []

    const wrappedDFS = s => {
      (!(isTarget(s, startCell) || isTarget(s, endCell))) && draw(s, "notEmpty", 10 * used.length)
      if (isTarget(s, endCell)) return [s]

      const neighbors = []
      for (const [x, y] of get4directions(s)) {
        if (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
          if (!search(used, [x, y]) && board[x][y] !== "wall") {
            p[[x, y]] = s
            used.push(s)
            neighbors.push([x, y])
          }
        }
      }

      for (const v of neighbors) {
        const path = wrappedDFS(v)
        if (path) {
          path.unshift(v)
          return path
        }
      }

      return 0
    }

    wrappedDFS(startCell)

    drawPath(p, 10 * used.length)
  }

  const dijkstra = () => {

  }

  const clear = () => {
    setBoard(board => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (!(isTarget([i, j], startCell) || isTarget([i, j], endCell)))
            board[i][j] = 'empty'
        }
      }
      return [...board]
    })
  }

  useEffect(() => {
    clear()
  }, [algorithm])

  const makeWall = cell => draw(cell, 'wall')

  return (
    <div className="wrapper">
      <div className="app">
        <nav className="nav">
          <div className="nav__title">
            <h1>Project</h1>
          </div>
          <div className="nav__items">
            <div className="item-nav">
              <select defaultValue={algorithm} style={{ border: errorMessage ? "1px solid red" : "" }} onChange={e => setAlgorithm(e.target.value)}>
                <option value="default" disabled>Select algorithm</option>
                <option value="bfs">Breadth-first search</option>
                <option value="dfs">Depth-first search</option>
                <option value="dijkstra">Dijkstra's algorithm</option>
              </select>
            </div>
            <div className="item-nav">
              <button onClick={visualize}>Visualize</button>
            </div>
            <div className="item-nav">
              <button onClick={clear}>Clear</button>
            </div>
          </div>
        </nav>
        <div className="legends">
          {Object.keys(types).map(type => {
            const bgColorCell = types[type].styles.backgroundColor
            const title = types[type].text.title
            return (
              <div className="item__legend" key={title}>
                <div className="item__legend-block" style={{ backgroundColor: bgColorCell }}></div>
                <div className="item__legend-desc">{title}</div>
              </div>
            )
          })}
        </div>
        <div className="board">
          {board.map((_, i) =>
            <div className="board__row" key={i}>
              {board[i].map((_, j) => <Cell key={100 * j} makeWall={() => makeWall([i, j])} type={board[i][j]} />)}
            </div>
          )}
        </div>
        <div className="footer">
          <div className="footer__author">
            <h3>by Oleksandr Kovalskyi</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
