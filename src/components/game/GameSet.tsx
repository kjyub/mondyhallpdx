import React, {useState ,Dispatch, SetStateAction} from 'react';

export default ({isGameStart,typeChange,setTypeChange}:{isGameStart:boolean, typeChange:boolean, setTypeChange:Dispatch<SetStateAction<boolean>>}) => {


    return (
        <div className={`flex flex-col`}>
            <div className={`buttonSetChangeType w-72 ${isGameStart !== true && "editable"}`}>
                <button
                    disabled={isGameStart}
                    className={`change ${typeChange !== true && "select"}`} 
                    onClick={()=>{setTypeChange(true)}}
                >
                    바꾼다
                </button>
                <button 
                    disabled={isGameStart}
                    className={`notChange ${typeChange !== false && "select"}`} 
                    onClick={()=>{setTypeChange(false)}}
                >
                    바꾸지 않는다
                </button>
            </div>
        </div>
    );
}
