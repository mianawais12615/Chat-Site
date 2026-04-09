import { useEffect, useState } from "react";
import ChatRoom from "./Components /ChatRoom";
import "./App.css";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5050";

let socket;

function App() {
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  // User Form Fields
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
      setTimeout(() => setLoading(false), 1500);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Fallback in case connection takes too long
    const timeout = setTimeout(() => setLoading(false), 3000);

    return () => {
      socket.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const handleLeave = () => {
    setUsername("");
    setRoom("");
    setJoined(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("join", room);
    }
    setJoined(true);
  };
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <h2 className="loading-text">Chat App</h2>
          <p className="loading-subtext">Connecting to server...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {joined == false ? (
        <div className="join-group-container">
          <h2>Join a Chat Group</h2>
          <form className="join-group-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Group Name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <button type="submit">Join</button>
          </form>
        </div>
      ) : (
        <ChatRoom
          username={username}
          room={room}
          socket={socket}
          onLeave={handleLeave}
        />
      )}
    </>
  );
}

export default App;
