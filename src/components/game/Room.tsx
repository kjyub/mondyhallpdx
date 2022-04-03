import React, { useState , useRef, useEffect} from "react"
import ReactCardFlip from "react-card-flip"

const RoomDoor = ({action}:{action:any}) => {
    const onClick = () =>{
        action()
    }

    return (
        <div className="container-room door" onClick={onClick}>

        </div>
    )
}

const RoomInside = ({value}:{value:string}) => {
    return (
        <div className="container-room inside">
            <p>{value}</p>
        </div>
    )
}

export default ({isOpen, openAction, value}:{isOpen:boolean, openAction: any, value:string}) => {
    return (
        <ReactCardFlip isFlipped={isOpen}>
            <RoomDoor action={openAction}></RoomDoor>
            <RoomInside value={value}></RoomInside>
        </ReactCardFlip>
    )
}

