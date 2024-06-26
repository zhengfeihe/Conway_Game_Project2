import React from "react";
import "../css/HomePage.css"

export default function Home() {
    return(
      <div>
          <h1> Home Page</h1>
          <div className="paragraph-part">
              <h2>Conway's Game of Life</h2>
              <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.[1] It is a zero-player game,[2][3] meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.
                  It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
          </div>

          <div className="paragraph-part">
              <h2>Rules</h2>
              <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbors, which are the cells that are horizontally,
                  vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
              <ul>
                  <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
                  <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                  <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                  <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
              </ul>
              <p>The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.Each generation is a pure function of the preceding one.
                  The rules continue to be applied repeatedly to create further generation</p>
          </div>
      </div>
    );
}