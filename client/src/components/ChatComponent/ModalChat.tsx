import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
// import ChatPage from '../../pages/ChatPage/ChatPage';
import ChatForUser from '../../pages/ChatPage/ChatForUser';
import { EmailIcon } from '@chakra-ui/icons';

export default function ModalChat() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
    <Button
        leftIcon={<EmailIcon />}
        size="lg"
        type="submit"
        onClick={onOpen}
        style={{ 
          backgroundColor: 'white', 
          color: '#337ab7', 
          border: '2px solid #337ab7', 
          marginRight: '20px' 
        }}
        _hover={{
          backgroundColor: '#337ab7',
          color: 'white',
        }}
        _active={{
          backgroundColor: '#286090',
          color: 'white',
          borderColor: '#286090',
        }}
      >
        Задать вопрос
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl" >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ChatForUser />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
