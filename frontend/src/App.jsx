import { useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import io from "socket.io-client";
import ClientRoom from './components/ClientRoom.jsx';
import JoinCreateRoom from './components/JoinCreateRoom.jsx';
import Sidebar from './components/Sidebar.jsx';
import Room from './components/Room.jsx';
import "./index.css";

const socket = io("https://whiteboard-ywzk.onrender.com");

function App() {
  const [userNo, setUserNo] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const uuid = () => {
    const S4 = () => {
      return ((Math.random() * 0x10000) | 0).toString(16).padStart(4, '0');
    }

    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  };

  useEffect(() => {
    if(roomJoined) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined]);

  return (
    <div className='home'>
      <ToastContainer />
      {roomJoined ? (
        <div>
          <Sidebar users={users} socket={socket} />
          {user.presenter ? (
            <Room
              userNo={userNo}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          ) : (
            <ClientRoom
              userNo={userNo}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          )}
        </div>
      ) : (
        <JoinCreateRoom
          uuid={uuid}
          setRoomJoined={setRoomJoined}
          setUser={setUser}
        />
      )}
    </div>
  )
}

export default App
