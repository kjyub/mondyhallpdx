import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import Room from "./Room"
import { GAME_TYPE, ROOM_TYPE } from '../../types/game/ParameterGame';
import { GameRoom, IRoom } from '../../types/game/GameType';

const ROOM_COUNT:number = 3

const DELAY_HOST_OPEN: number = 2000
const DELAY_CHANGE_SEL: number = 1000
const DELAY_SHOW_RESULT: number = 1000

const MSG_GAME_SEQ_0_0 = "3개의 방 중 차가 들어있을것 같은 방을 고르세요"
const MSG_GAME_SEQ_1_0 = "사회자가 염소가 들어있는 방의 문을 엽니다"
const MSG_GAME_SEQ_1_1 = "당신은 선택을 바꾸지 않았습니다"
const MSG_GAME_SEQ_1_2 = "당신은 선택을 바꿨습니다"
const MSG_GAME_SEQ_2_0 = "성공"
const MSG_GAME_SEQ_2_1 = "실패"

const DEFAULT_ROOM:IRoom = {
    value: ROOM_TYPE.GOAT,
    isOpen: false,
    isUserSel: false,
    isHostSel: false
}

const getDefaultRooms = ():IRoom[] => {
    let defaultRooms:IRoom[] = []

    for (let i = 0; i < ROOM_COUNT; i++) {
        defaultRooms.push(DEFAULT_ROOM)
    }

    return defaultRooms
}

const initIRooms = ():IRoom[] => {
    let rooms:IRoom[] = []

    // 차가 들어갈 방의 번호
    const carIndex = Math.floor(Math.random() * ROOM_COUNT)

    let roomValue: ROOM_TYPE

    for (let i = 0; i < ROOM_COUNT; i++) {
        if (i === carIndex) {
            roomValue = ROOM_TYPE.CAR
        }
        else {
            roomValue = ROOM_TYPE.GOAT
        }

        rooms.push({
            value: roomValue,
            isOpen: false,
            isUserSel: false,
            isHostSel: false
        })
    }

    return rooms
}

const getIndexOfRoomOpenedByHost = (roomStates: IRoom[]):number => {
    let roomIndexByHost = -1

    // RoomCount가 많지 않으므로 Break가 구지 필요할것같지 않아 map을 사용한다
    roomStates.map((roomState, index) => {
        if (!roomState.isUserSel && roomState.value !== ROOM_TYPE.CAR) {
            roomIndexByHost = index
        }
    })

    return roomIndexByHost
}

const getSelRoomIndexByChange = (roomStates: IRoom[], roomIndexByHost: number):number => {
    let roomIndexByChange = -1

    // RoomCount가 많지 않으므로 Break가 구지 필요할것같지 않아 map을 사용한다
    roomStates.map((roomState, index) => {
        if (!roomState.isUserSel && index !== roomIndexByHost) {
            roomIndexByChange = index
        }
    })

    return roomIndexByChange
}

const isSuccess = (roomStates: IRoom[], selIndex:number):boolean => {
    let isSuccess = false

    // RoomCount가 많지 않으므로 Break가 구지 필요할것같지 않아 map을 사용한다
    roomStates.map((roomState, index) => {
        if (roomState.value === ROOM_TYPE.CAR && index === selIndex) {
            isSuccess = true
        }
    })

    return isSuccess
}

export default ({gameState,typeChange,throwGameError,setGameResult,setGameState}:
    {gameState:GAME_TYPE,typeChange:boolean,throwGameError:any,setGameResult:Dispatch<SetStateAction<boolean>>,setGameState:Dispatch<SetStateAction<GAME_TYPE>>}) => {

    // 게임의 메세지.
    const [gameMessage, setGameMessage] = useState<string>("안녕하세요")

    // 방들의 상태를 저장한다.
    const [roomStates, setRoomStates] = useState<IRoom[]>(getDefaultRooms())
    
    // 현재 진행 중인 게임 순서의 위치를 저장한다.
    const [gameSeqIndex, setGameSeqIndex] = useState<number>(-1)

    // 사용자가 지정한 방의 번호를 저장한다.
    const [userPickRoom, setUserPickRoom] = useState<number>(-1)

    // 현재 방을 열수 있는 상태인지 저장한다.
    const [isEnableOpen, setIsEnableOpen] = useState<boolean>(false)
    console.log("GameStage", gameState.toString(), roomStates)

    useEffect(()=>{
        if (gameState === GAME_TYPE.RUNNING) {
            setRoomStates(getDefaultRooms())
            gameStart()
            setGameSeqIndex(0)
        } else {
            gameStop()
        }

    },[gameState])

    useEffect(() => {
        // 사용자는 방 하나를 선택한다.
        if (gameSeqIndex === 0) {
            setIsEnableOpen(true)
            setGameMessage(MSG_GAME_SEQ_0_0)
        }
        // 사용자가 방을 선택한 후 사회자가 염소가 있는 방 하나를 연다.
        else if (gameSeqIndex === 1) {
            setIsEnableOpen(false)

            const roomIndexByHost = getIndexOfRoomOpenedByHost(roomStates)
            if (roomIndexByHost < 0 || roomIndexByHost >= ROOM_COUNT){
                throwGameError("사회자가 열 문을 찾지 못했습니다.")
            }
            
            setGameMessage(MSG_GAME_SEQ_1_0)

            // 사회자가 문여는 딜레이
            setTimeout(() => {
                // 함수로 나눠서 실행하면 setState가 비동기적으로 실행되어 정상적인 처리가 불가능
                let changeStates:IRoom[] = [...roomStates]

                changeStates[roomIndexByHost] = {
                    ...roomStates[roomIndexByHost],
                    isOpen: true,
                    isHostSel: true
                }
                
                setRoomStates(changeStates)
    
                // 픽이 바뀌는 딜레이
                if (typeChange) {
                    const beforeUserPick = userPickRoom
                    const selRoomIndexByChange = getSelRoomIndexByChange(roomStates, roomIndexByHost)
                    setGameMessage(MSG_GAME_SEQ_1_2)
    
                    setTimeout(() => {
                        // setRoomSelByUser(userPickRoom, false)
                        // setRoomSelByUser(selRoomIndexByChange, true)
                        
                        // 함수로 나눠서 실행하면 setState가 비동기적으로 실행되어 정상적인 처리가 불가능
                        let changeStates2:IRoom[] = [...changeStates]
                        
                        changeStates2[beforeUserPick] = {
                            ...roomStates[beforeUserPick],
                            isUserSel: false,
                        }
                        changeStates2[selRoomIndexByChange] = {
                            ...roomStates[selRoomIndexByChange],
                            isUserSel: true,
                        }
                        
                        setRoomStates(changeStates2)
                        setUserPickRoom(selRoomIndexByChange)
                        setGameSeqIndex(gameSeqIndex + 1)
                    }, DELAY_CHANGE_SEL)
                }
                else {
                    setGameMessage(MSG_GAME_SEQ_1_1)
                    setGameSeqIndex(gameSeqIndex + 1)
                }
            }, DELAY_HOST_OPEN)
        }
        else if (gameSeqIndex === 2) {
            setTimeout(() => {
                setRoomOpen(userPickRoom, true)
                console.log(userPickRoom, roomStates)
                if (isSuccess(roomStates, userPickRoom)) {
                    setGameMessage(MSG_GAME_SEQ_2_0)
                    setGameResult(true)
                } else {
                    setGameMessage(MSG_GAME_SEQ_2_1)
                    setGameResult(false)
                }

                setGameState(GAME_TYPE.FINISH)
            }, DELAY_SHOW_RESULT)
        }
    }, [gameSeqIndex])

    const gameStart = () => {
        const rooms: IRoom[] = initIRooms()

        setRoomStates(rooms)
        setGameSeqIndex(0)
        setIsEnableOpen(true)
    }

    const gameStop = () => {
    }
    
    const setRoomOpen = (index: number, isOpen: boolean) => {
        if (gameState === GAME_TYPE.RUNNING) 
        {
            let changeStates:IRoom[] = [...roomStates]

            changeStates[index] = {
                ...roomStates[index],
                isOpen: true
            }
            
            setRoomStates(changeStates)
        }
    }

    const setRoomSelByUser = (index: number, isSel: boolean) => {
        if (gameState === GAME_TYPE.RUNNING) 
        {
            let changeStates:IRoom[] = [...roomStates]

            changeStates[index] = {
                ...roomStates[index],
                isUserSel: isSel
            }

            setRoomStates(changeStates)
        }
    }

    const setRoomSelByHost = (index: number, isSel: boolean) => {
        if (gameState === GAME_TYPE.RUNNING) 
        {
            let changeStates:IRoom[] = [...roomStates]

            changeStates[index] = {
                ...roomStates[index],
                isHostSel: isSel
            }

            setRoomStates(changeStates)
        }
    }

    const roomClickAction = (index: number) => {
        if (gameState === GAME_TYPE.RUNNING &&
            isEnableOpen &&
            !roomStates[index].isOpen &&
            gameSeqIndex === 0) 
        {
            setRoomSelByUser(index, true)
            
            setUserPickRoom(index)

            setGameSeqIndex(gameSeqIndex + 1)
        }
    }

    const renderRooms = (index: number) => {
        return (
            <Room roomState={roomStates[index]} clickAction={()=>{roomClickAction(index)}}></Room>
        )
    }

    return (
        <div className="flex flex-col my-8 p-8">
            <div className="flex justify-center">
                {roomStates.map((roomState, index) => renderRooms(index))}
            </div>
            <div className="flex my-4 justify-center">
                <span className="font-semibold text-2xl">{gameState ? gameMessage : ""}</span>
            </div>
        </div>
    );
}
