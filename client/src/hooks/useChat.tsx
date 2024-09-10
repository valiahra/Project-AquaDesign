import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useAppSelector } from '../redux/hooks';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  // const { user } = useAppSelector((store) => store.userSlice);

  const socketRef = useRef(null);

  useEffect(() => {
    axiosInstance(`${import.meta.env.VITE_API}/messages/`).then(({ data }) =>
      setMessages(data)
    );
  }, []);


  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3200');
    const socket = socketRef.current;

    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'SET_USERS_FROM_SERVER':
          setUsers(payload);
          break;

        case 'ADD_MESSAGE_FROM_SERVER':
          setMessages((prev) => [...prev, payload]);
          break;

        case 'CLIENT_TYPING_FROM_SERVER':
          setTyping(payload);
          break;

        case 'TYPING_FROM_SERVER_STOP':
          setTyping(false);
          break;

        default:
          break;
      }
    };
  }, []);

  const submitMessage = (input, loggedUser, selectChat = 0) => {
    const socket = socketRef.current;
    if (selectChat && loggedUser.isManager) {
      socket.send(JSON.stringify({ type: 'ADD_MESSAGE_FROM_CLIENT', payload: input, selectChat: selectChat }));
    } else {
      socket.send(JSON.stringify({ type: 'ADD_MESSAGE_FROM_CLIENT', payload: input }));
    }
  };

  return {
    messages,
    users,
    typing,
    submitMessage,
    socketRef,
  };
}
