import React, {useEffect, useState} from 'react';
import GameLogo from "./GameLogo"
import GameSet from "./GameSet"
import GameStage from "./GameStage"
import { GAME_TYPE, STORAGE_RESULT } from '../../types/game/ParameterGame';
import GameResult from './GameResult';

const getPrevResultsFromLocalStorage = (storageName:STORAGE_RESULT):boolean[] => {
    let results:boolean[] = []

    const raw = localStorage.getItem(storageName)

    if (raw !== null) {
        const rawArray = Array.from(raw)

        rawArray.forEach(s => {
            if (s === STORAGE_RESULT.RESULT_SUCCESS) {
                results.push(true)
            } else if (s === STORAGE_RESULT.RESULT_FAIL) {
                results.push(false)
            }
        })
    }

    return results
}

const setResultToLocalStorage = (storageName:STORAGE_RESULT, results: boolean[]) => {
    let storageRaw: string = ""

    results.forEach(result => {
        if (result) {
            storageRaw += STORAGE_RESULT.RESULT_SUCCESS
        } else {
            storageRaw += STORAGE_RESULT.RESULT_FAIL
        }
    })

    localStorage.setItem(storageName, storageRaw)
}

const removeResultFromLocalStorage = () => {
    localStorage.removeItem(STORAGE_RESULT.LS_RESULTS_CHANGED)
    localStorage.removeItem(STORAGE_RESULT.LS_RESULTS_NOT_CHANGED)
}

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
        loadResults()

        return () => {
            saveResults()
        }
    }, [])

    useEffect(()=>{
        if (gameState === GAME_TYPE.FINISH) {
            if (typeChange) {
                setResultsChanged([...resultsChanged,gameResult])
            } else {
                setResultsNotChanged([...resultsNotChanged,gameResult])
            }
        }
    }, [gameState])

    const loadResults = () => {
        setResultsChanged(getPrevResultsFromLocalStorage(STORAGE_RESULT.LS_RESULTS_CHANGED))
        setResultsNotChanged(getPrevResultsFromLocalStorage(STORAGE_RESULT.LS_RESULTS_NOT_CHANGED))
    }

    const saveResults = () => {
        setResultToLocalStorage(STORAGE_RESULT.LS_RESULTS_CHANGED, resultsChanged)
        setResultToLocalStorage(STORAGE_RESULT.LS_RESULTS_NOT_CHANGED, resultsNotChanged)
    }

    return (
        <div className="center flex flex-col items-center shadow-lg shadow-blue-600 border p-4">
            <GameLogo />
            <GameSet gameState={gameState} typeChange={typeChange} setTypeChange={setTypeChange} />
            <GameStage gameState={gameState} typeChange={typeChange} throwGameError={throwGameError} setGameResult={setGameResult} setGameState={setGameState} />
            <button 
                className={`px-4 py-2 mb-4 ${gameState === GAME_TYPE.RUNNING ? "bg-red-400": "bg-green-400"} font-semibold`}
                onClick={()=>{gameState === GAME_TYPE.RUNNING ? setGameState(GAME_TYPE.READY) : setGameState(GAME_TYPE.RUNNING)}}>
                {gameState === GAME_TYPE.RUNNING ? "종료": "시작"}
            </button>

            <div className="flex flex-col items-center px-2 py-6 bg-gray-50 rounded-lg">
                <div className="mb-4">
                    <button
                        className="px-4 py-2 mx-2 bg-gray-400 rounded-full"
                        onClick={()=>{removeResultFromLocalStorage()}}>
                        결과 초기화
                    </button>
                    <button
                        className="px-4 py-2 mx-2 bg-blue-400 rounded-full"
                        onClick={()=>{saveResults(); alert("저장되었습니다")}}>
                        결과 저장
                    </button>
                </div>

                <GameResult resultsChanged={resultsChanged} resultsNotChanged={resultsNotChanged}></GameResult>
            </div>
        </div>
    );
}
