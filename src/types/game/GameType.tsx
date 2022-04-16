import { ROOM_TYPE } from "./ParameterGame"

export class GameRoom{
    value: ROOM_TYPE
    isOpen: boolean
    isSel: boolean

    constructor(value: ROOM_TYPE) {
        this.value = value
        this.isOpen = false
        this.isSel = false
    }

    open(): void {
        this.isOpen = true
    }

    getValue(): ROOM_TYPE {
        return this.value
    }
}

export interface IRoom {
    value: ROOM_TYPE,
    isOpen: boolean
    isUserSel: boolean
    isHostSel: boolean
}