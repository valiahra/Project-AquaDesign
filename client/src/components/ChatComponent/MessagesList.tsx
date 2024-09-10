import React from 'react';
// import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
import { Box, VStack } from '@chakra-ui/react';

export default function MessagesList({ messages, loggedUser, selectChatId }) {
  let showMessage = messages.filter((item) => item.chatId === loggedUser.id);
  if (selectChatId && loggedUser.isManager) {
    showMessage = messages.filter((item) => item.chatId === selectChatId);
  }
  return (
    <Box
      overflowY="auto"
      height="65vh"
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing={4} align="stretch">
        {showMessage.map((message) => (
          <ChatMessage
            message={message}
            key={message.id}
            loggedUser={loggedUser}
          />
        ))}
      </VStack>
    </Box>
  );
}
