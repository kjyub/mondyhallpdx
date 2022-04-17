import React, {useState ,Dispatch, SetStateAction} from 'react';
import { GAME_TYPE } from '../../types/game/ParameterGame';

const MSG_RESULT_SUCCESS = "성공"
const MSG_RESULT_FAIL = "실패"

const resultPanel = (results:boolean[], title: string) => {
    const resultHouse = (result:boolean) => {
        return (
            <span className={`${result ? "text-blue-500" :"text-red-500"}`}>
                {result ? MSG_RESULT_SUCCESS : MSG_RESULT_FAIL}
            </span>
        )
    }

    let successCount = 0
    results.forEach(value => {
        if (value) {
            successCount += 1
        }
    })

    let resultPercent: string = results.length > 0 ? `${((successCount/results.length)*100).toFixed(2)}%` : "0%"

    return (
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg mx-2">
            <div className="flex flex-col p-4 border-b border-gray-500">
                <span className="text-center text-semibold text-xl text-gray-600">{title}</span>
                <span className="text-right text-gray-600 text-sm">{resultPercent}</span>
            </div>
            <div className="flex flex-col p-4">
                {results.map(result => resultHouse(result))}
            </div>
        </div>
    )
}

export default ({resultsChanged,resultsNotChanged}:{resultsChanged:boolean[], resultsNotChanged:boolean[]}) => {
    if (resultsChanged.length === 0 && resultsNotChanged.length === 0) {
        return (<div></div>)
    }
    

    return (
        <div className={`flex justify-center`}>
            {resultPanel(resultsChanged, "바꾼 결과")}
            {resultPanel(resultsNotChanged, "바꾸지 않은 결과")}
        </div>
    );
}
