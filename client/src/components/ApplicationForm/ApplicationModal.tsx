import { ArrowLeftIcon, ArrowRightIcon, EmailIcon } from '@chakra-ui/icons';
import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';
import ApplicationForm from './ApplicationForm';

export default function ApplicationModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        size="lg"
        type="submit"
        onClick={onOpen}
        style={{ 
          backgroundColor: 'white', 
          color: 'linear-gradient(to right, #557488, #172f44);', 
          border: '2px solid #337ab7', 
          marginRight: '20px' 
        }}
        _hover={{
          backgroundColor: '#337ab7',
          color: '#337ab7',
        }}
        _active={{
          backgroundColor: '#286090',
          color: 'white',
          borderColor: '#286090',
        }}
      >
        Отправить заявку
      </Button>

      <Modal  isCentered isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Заполните форму</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <ApplicationForm onClose={onClose}/>
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Закрыть</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </div>
  );
}
