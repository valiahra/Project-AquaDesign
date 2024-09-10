import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Link, ListItem, UnorderedList, useDisclosure } from "@chakra-ui/react"
import React from "react"

export default function ProjecDrawer() {
    // const [size, setSize] = React.useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const handleClick = () => {
       
        onOpen()
      }
    
    return (
      <>
          <Button size='lg'
           onClick={() => handleClick()}
          m={4}
          >{`Меню`}</Button>
        <Drawer onClose={onClose} isOpen={isOpen} size='md'>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Меню</DrawerHeader>
            <DrawerBody>
            <UnorderedList>
        <ListItem><Link to="/ourWorks">Наши работы</Link></ListItem>
        <ListItem><Link to="/projects">Проекты фонтанов</Link></ListItem>
        <ListItem><Link to="/constructor">Подбор фонтанов(конструктор)</Link></ListItem>
        <ListItem><Link to="/order">Как заказать</Link></ListItem>
     </UnorderedList>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }