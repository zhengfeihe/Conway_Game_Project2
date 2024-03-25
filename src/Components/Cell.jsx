import {useContext} from "react";
import {GameContext} from "./GameContext";
import "../css/Cell.css"
export  default function Cell(props) {
    const gameContextValue = useContext(GameContext);
    const gamestate = gameContextValue.gameState;
    const setGameState = gameContextValue.setGameState;
    const row = props.row;
    const col= props.col;
    let status = gamestate.grid[row][col].status;
    let last = gamestate.grid[row][col].last;

    function onClick() {
        let newGameState = {...gamestate};
        if(newGameState.grid[row][col].status){
            newGameState.grid[row][col].status = 0;
            newGameState.liveCellsCount -= 1;
        }else{
            newGameState.grid[row][col].status = 1;
            newGameState.liveCellsCount += 1;
        }

        setGameState(newGameState);
        console.log(gameContextValue.gameState.grid[0]);
    }
    let className = "cell";
    if (status) {
        // Append the corresponding heatmap class based on lastAlive, defaulting to "heatmap-10" for values beyond 9
        className += ` color-${last >= 0 && last <= 9 ? last : 10}`;
    } else {
        className += " died";
    }
    return <div className={className} onClick={onClick}> </div>

}


