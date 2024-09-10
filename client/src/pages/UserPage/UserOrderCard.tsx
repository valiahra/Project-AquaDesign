import React from 'react'
import { Button,Box, UnorderedList, Image, ListItem, Flex } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
  } from "@chakra-ui/accordion";
  import {  AddIcon, MinusIcon  } from '@chakra-ui/icons';
import axiosInstance from '../../axiosInstance';
import InitialFocus from './ModalUserEdit';
import styles from './UserOrderCard.module.css'




export default function UserOrderCard({ userOrder, setUserOrders,userOrders}) {
console.log(userOrder)

  const deleteHandler = async () => {
    const res = await axiosInstance.delete(
      `${import.meta.env.VITE_API}/orders/${userOrder.id}/userOrder`
    );
    if (res.status === 200) {
      setUserOrders((prev) => prev.filter((el) => el.id !== userOrder.id));
    }
  };
  return (
<Accordion allowMultiple  >
<AccordionItem  width='40%' className={styles.wrapper}>
  {({ isExpanded }) => (
    <>
      <h2>
        <AccordionButton   _expanded={{ bg: 'grey', color: 'white' }}>
          <Box as='span' flex='1' textAlign='left'>
           <h5>Статус заказа: {userOrder.status}</h5> заказ № {userOrder.id} 
          </Box>
          {isExpanded ? (
            <MinusIcon fontSize='14px' />
          ) : (
            <AddIcon fontSize='14px' />
          )}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
      <UnorderedList>
        <h5>Контакты</h5>
        <ListItem>Имя: <b>{userOrder.firstName}</b></ListItem>
          <ListItem>Фамилия: <b>{userOrder.lastName}</b></ListItem>
          <ListItem>Телефон: <b>{userOrder.phone}</b></ListItem>
          <ListItem>Email: <b>{userOrder.email}</b></ListItem>
          <h5>Информация</h5> 
          <ListItem>Город проведения работ: <b>{userOrder.city}</b></ListItem>
          <ListItem>Тип фонтана: <b>{userOrder.typeFountain} </b></ListItem>
          <ListItem>Бюджет: <b>{userOrder.budget}</b></ListItem>
          <ListItem>Занимаемая площадь: <b>{userOrder.square}</b></ListItem>
          <ListItem>Фотография:
  <Flex flexDirection="row" wrap="wrap" justifyContent="space-between">
    {userOrder.photo && userOrder.photo.split(",").map((image, index) => (
      <Image
        src={image.includes("http")? image : `http://localhost:3200/img/${image}`}
        alt="Изображение фонтана"
        objectFit="cover"
        flex="1 1 auto"
        height={200}
        width={300}
        m={2}
        key={index}
      />
    ))}
  </Flex>
</ListItem>
          <ListItem>Дополнительная информация: {userOrder.comment}</ListItem>
          {/* <InitialFocus userOrder={userOrder} setUserOrders={setUserOrders}/> */}
          {userOrder.status === 'принят' ? (<><Button onClick={deleteHandler}>Удалить заявку</Button> <InitialFocus userOrder={userOrder} setUserOrders={setUserOrders}/></>):<h6 style={{color:'tomato'}}>Вы не можете удалить или внести изменения в заказ! Для удаления заказа обратитесь к менеджеру.</h6>}
    </UnorderedList>
      </AccordionPanel>
    </>
  )}
</AccordionItem>
</Accordion>
  )
}

