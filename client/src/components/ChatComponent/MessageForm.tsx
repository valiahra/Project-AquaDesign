import { Box, Button, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './MessageForm.module.css';
import { ArrowUpIcon, ChatIcon } from '@chakra-ui/icons';
// import { Button, Form, InputGroup } from 'react-bootstrap';
// import SendIcon from '../../../ui/icons/SendIcon';

export default function MessageForm({ submitHandler, socketRef, loggedUser, selectChatId }) {
  const [input, setInput] = useState('');
  const changeHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;
    socket.send(JSON.stringify({ type: 'TYPING_FROM_CLIENT' }));

    const time = setTimeout(() => {
      socket.send(JSON.stringify({ type: 'STOP_TYPING_FROM_CLIENT' }));
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [input]);

  return (
    <Box
      as="form"
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler(input, loggedUser, selectChatId);
        setInput('');
      }}
    >
      <FormControl>
        <InputGroup >
          <Input
            placeholder="Введите сообщение"
            value={input}
            onChange={changeHandler}
            color="black"
            bg="white"
           
          />
          <InputRightElement width="4.5rem">
            <Button
             
              size="md"
             
              colorScheme="cyan"
              type="submit"
            >
            
              <ArrowUpIcon /> 
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Box>
  );
}
