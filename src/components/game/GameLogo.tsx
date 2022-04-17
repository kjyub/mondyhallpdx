import React from 'react';

const HELP_MONTYHALL_URL = "https://namu.wiki/w/%EB%AA%AC%ED%8B%B0%20%ED%99%80%20%EB%AC%B8%EC%A0%9C"

function GameLogo() {
    const openHelp = () => {
        window.open(HELP_MONTYHALL_URL, "_blank")
    }

    return (
        <div className="flex flex-col p-16">
            <div className="flex flex-col">
                <p className="font-bold text-4xl">MondyHall Pdx</p>
                <div className='w-full flex justify-end'>
                    <span className="mt-2 p-1 text-sm hover:bg-yellow-200 hover:ring-1 ring-yellow-500 rounded-lg duration-300" onClick={()=>{openHelp()}}>몬티홀의 역설이란 ?</span>
                </div>
            </div>
        </div>
    );
}

export default GameLogo;
