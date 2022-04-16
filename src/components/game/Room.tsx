import React, { useState , Dispatch, SetStateAction} from "react"
import ReactCardFlip from "react-card-flip"
import { IRoom } from '../../types/game/GameType';

const RoomDoor = ({clickAction, isUserSel, isHostSel}:{clickAction:any, isUserSel: boolean, isHostSel: boolean}) => {
    return (
        <div className={`container-room door ${isUserSel ? "userSel" : ""} ${isHostSel ? "hostSel" : ""}`} onClick={()=>{clickAction()}}>

        </div>
    )
}

const RoomInside = ({value, isUserSel, isHostSel}:{value:string, isUserSel: boolean, isHostSel: boolean}) => {
    return (
        <div className={`container-room inside ${isUserSel ? "userSel" : ""} ${isHostSel ? "hostSel" : ""}`}>
            <p>{value}</p>
        </div>
    )
}

export default ({roomState, clickAction}:{roomState:IRoom, clickAction: any}) => {

    const pickStateMessage = () => {
        let color: string = "", message: string = ""

        if (roomState.isHostSel) {
            color = "text-green-500"
            message = "사회자"
        }
        else if (roomState.isUserSel) {
            color = "text-blue-500"
            message = "선택한 방"
        }

        return (
            <span className={`text-lg ${color}`}>{message}</span>
        )
    }

    return (
        <div className="flex flex-col">
            <ReactCardFlip isFlipped={roomState.isOpen}>
                <RoomDoor clickAction={clickAction} isUserSel={roomState.isUserSel} isHostSel={roomState.isHostSel}></RoomDoor>
                <RoomInside value={roomState.value} isUserSel={roomState.isUserSel} isHostSel={roomState.isHostSel}></RoomInside>
            </ReactCardFlip>
            <div className="flex justify-center mt-4">
                {pickStateMessage()}
            </div>
        </div>
    )
}

