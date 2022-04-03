import React from 'react';

function GameLogo() {
    return (
        <div className="flex flex-col p-16">
            <div className="flex flex-col">
                <p className="font-bold text-4xl">MondyHall Pdx</p>
                <div className='w-full flex justify-end'>
                    <span className="mt-2 p-1 text-sm hover:bg-yellow-200 hover:ring-1 ring-yellow-500 rounded-lg duration-300">몬티홀의 역설이란 ?</span>
                </div>
            </div>
        </div>
    );
}

export default GameLogo;
