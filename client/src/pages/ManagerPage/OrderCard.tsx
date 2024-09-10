
import axiosInstance from "../../axiosInstance";
import {
  Card,
  CardBody,
  Image,
  Text,
  Button,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  IconButton,
  CardFooter,
  ListItem,
  UnorderedList,
  Divider,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import InitialFocus from "../UserPage/ModalUserEdit";
export default function OrderCard({ order, setOrders}) {
  const deleteHandler = async () => {
    const res = await axiosInstance.delete(
      `${import.meta.env.VITE_API}/orders/${order.id}`
    );
    if (res.status === 200) {
      setOrders((prev) => prev.filter((el) => el.id !== order.id));
    }
  };
  const changeStatus = async () => {
    const res = await axiosInstance.put(
      `${import.meta.env.VITE_API}/orders/${order.id}/changeStatusOfOrder`
    );
    if (res.status === 200) {
      // setOrders(res.data)
      window.location.reload();
    }
  };

  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem width="40%">
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton _expanded={{ bg: "grey", color: "white" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <h5>Статус заказа: {order.status}</h5>
                    заказ № {order.id} {order.firstName} {order.lastName}{" "}
                    {order.city} {(order.createdAt).slice(0,10)} 
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="14px" />
                  ) : (
                    <AddIcon fontSize="14px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <UnorderedList textAlign="left">
                  <h5>Контакты</h5>
                  <ListItem>Имя: {order.firstName}</ListItem>
                  <ListItem>Фамилия: {order.lastName}</ListItem>
                  <ListItem>Телефон: {order.phone}</ListItem>
                  <ListItem>Email: {order.email}</ListItem>
                  <Divider />
                  <h5>Информация</h5>
                  <ListItem>Площадь: {order.square} кв.м</ListItem>
                  <ListItem>Город: {order.city}</ListItem>
                  <ListItem>Тип фонтана: {order.typeFountain}</ListItem>
                  <ListItem>Бюджет: {order.budget} руб.</ListItem>
                  <ListItem>
                    Дополнительная информация: {order.comment}
                  </ListItem>
                  <Flex direction="column" alignItems="flex-start">
                    Фотография:
                    <Flex
                      flexDirection="row"
                      wrap="wrap"
                      justifyContent="space-between"
                    >
                      {order.photo &&
                        order.photo
                          .split(",")
                          .map((image, index) => (
                            <Image
                              src={
                                image.includes("http")
                                  ? image
                                  : image.startsWith("/")
                                  ? `${image}`
                                  : `http://localhost:3200/img/${image}`
                              }
                              alt="Изображение фонтана"
                              objectFit="cover"
                              flex="1 1 auto"
                              height={200}
                              m={2}
                              key={index}
                            />
                          ))}
                    </Flex>
                  </Flex>
                  <Button onClick={changeStatus}>Изменить статус заказа</Button>
                  <Button onClick={deleteHandler}>Удалить заявку</Button>
                  {/* <Button variant="primary" onClick={deleteHandler}>Удалить</Button> */}
                </UnorderedList>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}

