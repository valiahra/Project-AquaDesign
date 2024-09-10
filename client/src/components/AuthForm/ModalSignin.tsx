import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import AuthForm from './AuthForm';

export default function ModalSignin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div onClick={onOpen}>Войти</div>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent >
           <ModalHeader>Войти</ModalHeader> 
          <ModalCloseButton />
          <ModalBody>
          <AuthForm title='Войти' type='signin' />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
