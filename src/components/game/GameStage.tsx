import React, {useState} from 'react';
import Room from "./Room"

export default () => {
    const [roomOpen1, setRoomOpen1] = useState(false);
    const [roomOpen2, setRoomOpen2] = useState(false);
    const [roomOpen3, setRoomOpen3] = useState(false);

    return (
        <div className="flex my-8 p-8">
            <Room isOpen={roomOpen1} openAction={()=>{setRoomOpen1(true)}} value={"염소"}></Room>
            <Room isOpen={roomOpen2} openAction={()=>{setRoomOpen2(true)}} value={"염소"}></Room>
            <Room isOpen={roomOpen3} openAction={()=>{setRoomOpen3(true)}} value={"염소"}></Room>
        </div>
    );
}
