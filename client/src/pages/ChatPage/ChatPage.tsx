import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
// import { DotOnlineIcon, SendIcon } from '../../../ui/icons';
// import UserContext from '../../contexts/UserContext';
import useChat from '../../hooks/useChat';
import { useAppSelector } from '../../redux/hooks';
import UsersList from '../../components/ChatComponent/UserList';
import ChatComponent from '../../components/ChatComponent/ChatComponent';
import MessageGroup from '../../components/ChatComponent/MessageGroup';

export default function ChatPage() {
  // const { user: loggedUser } = useContext(UserContext);
  const { user: loggedUser } = useAppSelector((store) => store.userSlice);
  const { messages, users, typing, submitMessage, socketRef } = useChat();
  const [selectChatId, setSelectChatId] = useState<number | null>(null);

  const cardBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'whiteAlpha.900');
  console.log(users, messages, loggedUser);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center">
        <Box w="full" p={4} bg={cardBg} borderRadius="lg" boxShadow="xl">
          <HStack spacing={4} align="flex-start">
            <Box w="25%" p={4}>
              <UsersList
                users={users.filter((el) => el.id !== loggedUser.id)}
              />
              <MessageGroup
                messages={messages}
                loggedUser={loggedUser}
                setSelectChatId={setSelectChatId}
              />
            </Box>
            <Divider orientation="vertical" />
            <Box w="75%" p={4}>
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
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}
