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

export default function ModalSignup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div onClick={onOpen}>Регистрация</div>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Регистрация</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AuthForm title="Зарегистрироваться" type="signup" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
