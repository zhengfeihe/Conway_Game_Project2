import './App.css';
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import {Fragment} from "react";
import GameContextGenerator from "./Components/GameContext";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home";
import Credits from "./pages/Credits";



function App() {
  return (
      <Fragment>
    <NavBar/>
    <Routes>
        <Route path = "/" element={<Home />}/>
        <Route path = "/game" element={<GameContextGenerator>
            <GamePage />
        </GameContextGenerator>}/>
        <Route path = "/credits" element={<Credits />}/>
    </Routes>
      </Fragment>

  );
}

export default App;
