import React from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import { Box } from '@chakra-ui/react';
// import { HStack } from '@chakra-ui/react';

export default function ChatComponent({
  submitHandler,
  messages,
  loggedUser,
  socketRef,
  selectChatId,
}) {
  return (
    <Box>
      <MessagesList
        messages={messages}
        loggedUser={loggedUser}
        selectChatId={selectChatId}
      />
      <MessageForm
        submitHandler={submitHandler}
        socketRef={socketRef}
        loggedUser={loggedUser}
        selectChatId={selectChatId}
      />
    </Box>
  );
}
