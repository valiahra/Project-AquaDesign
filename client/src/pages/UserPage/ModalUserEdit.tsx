import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image
} from '@chakra-ui/react'
import React, { useState } from 'react'
import axiosInstance from '../../axiosInstance';

export default function InitialFocus({userOrder, setUserOrders}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [card, setCard] = useState(userOrder);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const changeHandler = (e) => {
    setCard((prev) => ({...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setImage(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreview(previews);
      setIsImageLoaded(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('firstName', card.firstName);
    newFormData.append('lastName', card.lastName);
    newFormData.append('phone', card.phone);
    newFormData.append('email', card.email);
    newFormData.append('city', card.city);
    newFormData.append('typeFountain', card.typeFountain);
    newFormData.append('comment', card.comment);
    newFormData.append('budget', card.budget);
    newFormData.append('square', card.square);
    if (image && image.length > 0) {
      image.forEach((file) => {
        newFormData.append('images', file);
      });
    }
  
    try {
      const response = await axiosInstance.put(`${import.meta.env.VITE_API}/orders/${userOrder.id}/editUserOrder`, newFormData);
      if (response.status === 200) {
        setUserOrders((prev) => prev.map((order) => order.id === userOrder.id? {...order, photo: response.data.photo } : order));
        onClose();
        props.onUpdateCard(card);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Внести изменения в заявку</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Внести изменения в заявку</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} >
            <FormControl>
              <FormLabel>Имя</FormLabel>
              <Input ref={initialRef} placeholder='Имя' value={card.firstName} name='firstName' onChange={changeHandler}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Фамилия</FormLabel>
              <Input ref={initialRef} placeholder='Фамилия' value={card.lastName} name='lastName' onChange={changeHandler}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Город</FormLabel>
              <Input ref={initialRef} placeholder='Город' value={card.city} name='city' onChange={changeHandler}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Тип фонтана</FormLabel>
              <Input ref={initialRef} placeholder='Тип фонтана' value={card.typeFountain} name='typeFountain' onChange={changeHandler}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Бюджет</FormLabel>
              <Input ref={initialRef} placeholder='Бюджет' value={card.budget} name='budget' onChange={changeHandler}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Площадь</FormLabel>
              <Input ref={initialRef} placeholder='Площадь' value={card.square} name='square' onChange={changeHandler}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Дополнительная информация</FormLabel>
              <Textarea ref={initialRef} placeholder='Дополнительная информация' value={card.comment} name='comment' onChange={changeHandler}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel  htmlFor="file-upload">Фотография</FormLabel>
              <Input ref={initialRef} 
              type='file' 
              multiple 
              name='images' 
              accept="image/*"
              display="none"
              id="file-upload"
              onChange={handleImageChange}/>
              {isImageLoaded && (
                <div>
                  {imagePreview.map((preview, index) => (
                    <Image
                      src={preview}
                      alt="Preview"
                      objectFit="cover"
                      width={350}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3}  onClick={submitHandler}>
              Сохранить изменения
            </Button>
            <Button onClick={onClose}>Выйти</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}