import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const GameContext = createContext();

function generateGrid(row, col, rate){
    const count = Math.floor(row*col*rate);
    const grid = Array.from({length:row},()=>
        Array.from({length:col}, ()=> ({
            longLast: 2,
            last: 0,
            status: 0
        }))
    );

    const centerCount = Math.max(1, Math.floor(Math.sqrt(count)));
    const centers = [];

    for (let i = 0; i < centerCount; i++) {
        let cx, cy;
        do {
            cx = Math.floor(Math.random() * row);
            cy = Math.floor(Math.random() * col);
        } while (grid[cx][cy].status === 1);
        centers.push({ x: cx, y: cy });
        grid[cx][cy].status = 1;
    }

    let validCells = centers.length;

    const calculateDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    for (let x = 0; x < row; x++) {
        for (let y = 0; y < col; y++) {
            if (grid[x][y].status === 0) {
                const distances = centers.map(center => calculateDistance(x, y, center.x, center.y));
                const minDistance = Math.min(...distances);
                const probability = rate + (rate * (3 - minDistance / Math.max(row, col)));
                if (Math.random() < probability && validCells < count) {
                    grid[x][y].status = 1;
                    validCells += 1;
                }
            }
        }
    }
    return grid;

}

export default function GameContextGenerator({ children }) {
    const [row,setRow] = useState(20);
    const [col,setCol] = useState(20);
    const [rate,setRate] = useState(0.05);

    const calculateAliveNumber=(grid) =>{
        return grid.reduce((total, row) => (
            total + row.reduce((rowTotal, cell) => (
                rowTotal + (cell.status === 1 ? 1 : 0)
            ), 0)
        ), 0);
    }

    const [gameState, setGameState] = useState(()=>{
        const initialGrid = generateGrid(row, col, rate);
        return {
            liveCellsCount: calculateAliveNumber(initialGrid),
            grid: initialGrid,
        };
    })

    const resetGrid= (row , col) => {
        setGameState(()=>{
            const newGrid = generateGrid(row, col, rate);
            return {
                liveCellsCount: calculateAliveNumber(newGrid),
                grid: newGrid,
            };
        });
    }

    const gameContextValue = {
        gameState,
        setGameState,
        setRow,
        setCol,
        setRate,
        resetGrid,
    };


    return (
        <GameContext.Provider value={ gameContextValue }>
            {children}
        </GameContext.Provider>
    );
}