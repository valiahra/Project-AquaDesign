import { Avatar, Box, HStack, VStack, Text, } from '@chakra-ui/react';
import React from 'react';
// import { Card } from 'react-bootstrap';

export default function ChatMessage({ message, loggedUser }) {
  const isManager = loggedUser.id === message.User?.id;
  const bgColor = isManager ? 'blue.100' : 'gray.200';
  const alignSelf = isManager ? 'flex-end' : 'flex-start';

  return (
    <VStack align={alignSelf} mt={2} mb={2} w="100%">
      <HStack
        spacing={3}
        align={alignSelf === 'flex-end' ? 'flex-end' : 'flex-start'}
      >
        <Avatar name={message.User?.username} size="sm" />
        <Box
          maxW="90%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={3}
          bg={bgColor}
          boxShadow="md"
        >
          <Text fontSize="sm" color="gray.500">
            {message.User?.username}
          </Text>
          <Text color="black">{message.text}</Text>
        </Box>
      </HStack>
    </VStack>
  );
}
