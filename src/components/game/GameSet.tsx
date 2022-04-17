import React, {useState ,Dispatch, SetStateAction} from 'react';
import { GAME_TYPE } from '../../types/game/ParameterGame';

export default ({gameState,typeChange,setTypeChange}:{gameState:GAME_TYPE, typeChange:boolean, setTypeChange:Dispatch<SetStateAction<boolean>>}) => {
    const enable:boolean = gameState === GAME_TYPE.RUNNING

    return (
        <div className={`flex flex-col`}>
            <div className="flex justify-center my-2">
                <span>처음 선택을 바꾸겠습니까?</span>
            </div>
            <div className={`buttonSetChangeType w-72 ${!enable && "editable"}`}>
                <button
                    disabled={enable}
                    className={`change ${typeChange !== true && "select"}`} 
                    onClick={()=>{setTypeChange(true)}}
                >
                    바꾼다
                </button>
                <button 
                    disabled={enable}
                    className={`notChange ${typeChange !== false && "select"}`} 
                    onClick={()=>{setTypeChange(false)}}
                >
                    바꾸지 않는다
                </button>
            </div>
        </div>
    );
}
