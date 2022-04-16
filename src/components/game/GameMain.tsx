import React, {useState} from 'react';
import GameLogo from "./GameLogo"
import GameSet from "./GameSet"
import GameStage from "./GameStage"

export default () => {
    console.log("GAME MAIN")
    
    const [isGameStart, setGameStart] = useState(false)
    const [typeChange, setTypeChange] = useState(false)
    const [gameResult, setGameResult] = useState(false)

    const throwGameError = (msg: string):void => {
        setGameStart(false)

        alert(msg)
    }

    return (
        <div className="center flex flex-col items-center shadow-lg shadow-blue-600 border">
            <GameLogo />
            <GameSet isGameStart={isGameStart} typeChange={typeChange} setTypeChange={setTypeChange} />
            <GameStage isGameStart={isGameStart} typeChange={typeChange} throwGameError={throwGameError} setGameResult={setGameResult} />
            <button 
                className="px-4 py-2 my-4 bg-green-400 font-semibold"
                onClick={()=>{isGameStart ? setGameStart(false) : setGameStart(true)}}>
                {isGameStart ? "종료": "시작"}
            </button>
        </div>
    );
}
