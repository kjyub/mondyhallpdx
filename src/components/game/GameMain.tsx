import React, {useEffect, useState} from 'react';
import GameLogo from "./GameLogo"
import GameSet from "./GameSet"
import GameStage from "./GameStage"
import { GAME_TYPE } from '../../types/game/ParameterGame';
import GameResult from './GameResult';

export default () => {
    console.log("GAME MAIN")
    
    const [gameState, setGameState] = useState<GAME_TYPE>(GAME_TYPE.READY)
    const [typeChange, setTypeChange] = useState(false)
    const [gameResult, setGameResult] = useState(false)

    const [resultsChanged, setResultsChanged] = useState<boolean[]>([])
    const [resultsNotChanged, setResultsNotChanged] = useState<boolean[]>([])

    const throwGameError = (msg: string):void => {
        setGameState(GAME_TYPE.READY)

        alert(msg)
    }

    useEffect(()=>{
        if (gameState === GAME_TYPE.FINISH) {
            if (typeChange) {
                setResultsChanged([...resultsChanged,gameResult])
            } else {
                setResultsNotChanged([...resultsNotChanged,gameResult])
            }
            console.log(resultsChanged, resultsNotChanged)
        }
    }, [gameState])

    return (
        <div className="center flex flex-col items-center shadow-lg shadow-blue-600 border p-4">
            <GameLogo />
            <GameSet gameState={gameState} typeChange={typeChange} setTypeChange={setTypeChange} />
            <GameStage gameState={gameState} typeChange={typeChange} throwGameError={throwGameError} setGameResult={setGameResult} setGameState={setGameState} />
            <button 
                className={`px-4 py-2 my-4 ${gameState === GAME_TYPE.RUNNING ? "bg-red-400": "bg-green-400"} font-semibold`}
                onClick={()=>{gameState === GAME_TYPE.RUNNING ? setGameState(GAME_TYPE.READY) : setGameState(GAME_TYPE.RUNNING)}}>
                {gameState === GAME_TYPE.RUNNING ? "종료": "시작"}
            </button>

            <GameResult resultsChanged={resultsChanged} resultsNotChanged={resultsNotChanged}></GameResult>
        </div>
    );
}
