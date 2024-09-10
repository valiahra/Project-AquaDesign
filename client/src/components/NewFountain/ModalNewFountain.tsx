import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import ApplicationForm from '../ApplicationForm/ApplicationForm';
import CreateNewFountain from './CreateNewFountain';

export default function ModalNewFountain({ fountains, setFountains }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        size="lg"
        type="submit"
        onClick={onOpen}
        colorScheme="teal"
        variant="outline"
      >
        Добавить новый фонтан
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Заполните все поля</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateNewFountain
              onClose={onClose}
              fountains={fountains}
              setFountains={setFountains}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
