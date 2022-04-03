import React, {useState} from 'react';
import GameLogo from "./GameLogo"
import GameSet from "./GameSet"
import GameStage from "./GameStage"

export default () => {
    
    const [isGameStart, setGameStart] = useState(false)

    return (
        <div className="center flex flex-col items-center shadow-lg shadow-blue-600 border">
            <GameLogo />
            <GameSet isGameStart={isGameStart} />
            <GameStage />
            <button onClick={()=>{isGameStart ? setGameStart(false) : setGameStart(true)}}>시작</button>
        </div>
    );
}
