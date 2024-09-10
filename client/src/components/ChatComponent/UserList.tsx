import React from 'react';
import { VStack, HStack, Text, Box, Heading, Tooltip, Avatar } from '@chakra-ui/react';
import DotOnlineIcon from '../../../ui/icons/DotOnlineIcon';

export default function UsersList({ users }) {
  return (
    <VStack
      align="stretch"
      spacing={3}
      p={4}
      bg="gray.100"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading as="h6" size="sm" mb={2}>
        Пользователи онлайн
      </Heading>
      {users.map((user) => (
        <HStack key={user.id} spacing={2} align="center">
          <Tooltip label="Онлайн">
            <Avatar name={user.username} size="sm" />
          </Tooltip>
          <Text>{user.username}</Text>
        </HStack>
      ))}
    </VStack>
  );
}