import React from 'react'

export default function MessageGroup({ messages, loggedUser, setSelectChatId }) {
    if (!loggedUser.isManager) return;

    const groupMessage = messages.reduce((arr, item) => {
      if (arr.find((el) => el.id === item.chatId) || item.User.isManager)
        return arr;
      arr.push({ userName: item.User.username, id: item.chatId });
      return arr;
    }, []);
  
    return (
      <ul style={{ color: 'black' }}>
        {groupMessage.length &&
          groupMessage.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelectChatId(item.id)}
              style={{ cursor: 'pointer' }}
            >
              {item.userName} - ({item.id})
            </li>
          ))}
      </ul>
    );
  }
