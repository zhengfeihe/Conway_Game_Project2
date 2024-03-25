import { useContext } from "react";
import { GameContext } from "./GameContext.jsx";
import Cell from "./Cell.jsx"

export default function Grid() {
    const gameContextValue = useContext(GameContext);
    const gamestate = gameContextValue.gameState;


    return (
        <>
            {gamestate.grid.map((row, rowIndex) => (
                <div key={rowIndex} className="GridRow">
                    {row.map((_, colIndex) => (
                        <Cell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
                    ))}
                </div>
            ))}
        </>
    );

}
