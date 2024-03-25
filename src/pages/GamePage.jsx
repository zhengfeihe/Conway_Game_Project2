import {GameContext} from "../Components/GameContext";
import Grid from "../Components/Grid.jsx"
import {useContext, useEffect, useState} from "react";
import "../css/Gamepage.css"


function countNeighbors(grid, row, col) {
    let count = 0;

    const neighborPositions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    neighborPositions.forEach(([m, n]) => {
        const neighborRow = row + m;
        const neighborCol = col + n;

        const isWithinBounds =
            neighborRow >= 0 &&
            neighborCol >= 0 &&
            neighborRow < grid.length &&
            neighborCol < grid[0].length;

        if (isWithinBounds && (grid[neighborRow][neighborCol].status ===1 || grid[neighborRow][neighborCol].status ===2 )) {
            count++;
        }
    });

    return count;
}


function convertToInteger(inputValue) {
    let value = inputValue.replace(/[^\d]/g, '');
    return parseInt(value, 10) || ''; // Return an empty string if the result is NaN
}


export default function GamePage(){
    const gameContextValue = useContext(GameContext);
    const gamestate = gameContextValue.gameState;
    const setGameState = gameContextValue.setGameState;
    const setRow = gameContextValue.setRow;
    const setCol = gameContextValue.setCol;
    const setRate = gameContextValue.setRate;
    const [rowInput, setRowInput] = useState("");
    const [colInput, setColInput] = useState("");
    const [error, setError] = useState("");
    const [longLast, setLongLast] = useState(false);
    const [run, setRun] = useState(false);


    function ProcessRowInput(e) {
        const numericValue = convertToInteger(e.target.value);
        setRowInput(numericValue);
    }

    function ProcessColInput(e) {
        const numericValue = convertToInteger(e.target.value);
        setColInput(numericValue);
    }

    function generateNextGeneration() {
        let temp = { ...gamestate };
        for (let i = 0; i < temp.grid.length; i++) {
            for (let j = 0; j < temp.grid[0].length; j++) {
                const neighbors = countNeighbors(temp.grid, i, j);
                if (temp.grid[i][j].status) {
                    if (neighbors === 2 || neighbors === 3) {
                        temp.grid[i][j].status = 2;
                        if (longLast && temp.grid[i][j].longLast < 2) {
                                temp.grid[i][j].longLast = 2;
                        }
                    }
                } else {
                    if (longLast && temp.grid[i][j].longLast > 0) {
                        if (neighbors) {
                            temp.grid[i][j].status = 2;
                            temp.grid[i][j].last++;
                        }
                        temp.grid[i][j].longLast--;
                    } else if (neighbors === 3) {
                        temp.grid[i][j].status = 2;
                        temp.grid[i][j].last++;
                        temp.grid[i][j].longLast = 2;
                    }
                }
            }
        }
        let newCount = 0;
        for (let i = 0; i < temp.grid.length; i++) {
            for (let j = 0; j < temp.grid[0].length; j++) {
                if(temp.grid[i][j].status === 2){
                    temp.grid[i][j].status = 1;
                    newCount++;
                }else{
                    temp.grid[i][j].status = 0;
                }
            }
        }
        temp.liveCellsCount = newCount;
        setGameState(temp);
    }


    function ProcessSubmit(){
        if(rowInput === "" || colInput === "" || rowInput < 3 || rowInput > 40 || colInput < 3 || colInput > 40){
            setError("Wrong Input! Both row and column should in the range [3,40] ")
        }else{
            gameContextValue.resetGrid(rowInput, colInput);
            gameContextValue.setCol(colInput);
            gameContextValue.setRow(rowInput);
        }
    }
    useEffect(() => {
        let id;
        if (run) {
            id = setInterval(() => {
                generateNextGeneration();
            }, 100);
        }
        return () => clearInterval(id);
    }, [gamestate, run]);


    function Reset(){
        setRun(false);
        setRowInput("");
        setColInput("");
        setError("");
        setLongLast(false);
        setRun(false);
        gameContextValue.resetGrid(20, 20);
    }

    function Next() {
        setRun(false);
        generateNextGeneration();
        console.log(gamestate.grid);
    }

    function Auto() {
        setRun(!run);
    }

    function Long(){
        setLongLast(!longLast);
    }


    return (
        <div>
            <h1> Living Cells Count: {gamestate.liveCellsCount}</h1>
            <div className= "UserInput">
                <input type="text" id ="height" placeholder="height" onChange={ProcessRowInput} value={rowInput}></input>
                <input type="text" id ="width" placeholder="width" onChange={ProcessColInput} value={colInput}></input>
                <button type="text" id ="inputButton" onClick={ProcessSubmit} >Submit</button>
                <h3>{error}</h3>
            </div>

            <Grid />

            <div className="ControlOptions">
                <button id="reset" onClick={Reset}>
                    Reset
                </button>
                <button id="singal" onClick={Next}>
                    Next
                </button>
                <button id="auto-play"  onClick={Auto}>
                    Auto Play
                </button>
                <button id="long-lasting" onClick={Long}> Long Lasting </button>
            </div>
        </div>
            );
}