import React, {useState} from 'react';

export default ({isGameStart}:{isGameStart:boolean}) => {

    const [typeChange,setTypeChange] = useState(true)

    return (
        <div className="flex flex-col">
            <div className={`buttonSetChangeType w-72 ${isGameStart !== true && "editable"}`}>
                <button 
                    className={`change ${typeChange !== true && "select"}`} 
                    onClick={()=>{setTypeChange(true)}}
                >
                    바꾼다
                </button>
                <button 
                    className={`notChange ${typeChange !== false && "select"}`} 
                    onClick={()=>{setTypeChange(false)}}
                >
                    바꾸지 않는다
                </button>
            </div>
        </div>
    );
}
