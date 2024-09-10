import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import ApplicationForm from './ApplicationForm';

export default function ApplicModalNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div onClick={onOpen}>Отправить заяку</div>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ApplicationForm onClose={onClose}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
