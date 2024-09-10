import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import UsersList from '../../components/ChatComponent/UserList';
import MessageGroup from '../../components/ChatComponent/MessageGroup';
import ChatComponent from '../../components/ChatComponent/ChatComponent';
import { useAppSelector } from '../../redux/hooks';
import useChat from '../../hooks/useChat';

export default function ChatForUser() {
  const { user: loggedUser } = useAppSelector((store) => store.userSlice);
  const { messages, users, typing, submitMessage, socketRef } = useChat();
  const [selectChatId, setSelectChatId] = useState<number | null>(null);

  const cardBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'whiteAlpha.900');
  console.log(users, messages, loggedUser);

  return (
    <Container bg="blue.100" maxW="container.2xl" py={5} borderRadius="md">
      <Text fontSize="3xl">Чат с менеджером</Text>
      <Box >
        <ChatComponent
          submitHandler={submitMessage}
          messages={messages}
          loggedUser={loggedUser}
          socketRef={socketRef}
          selectChatId={selectChatId}
        />
        {typing && typing.id !== loggedUser.id && (
          <Text mt={2} color={textColor}>
            {typing.username} печатает...
          </Text>
        )}
      </Box>
    </Container>
  );
}
