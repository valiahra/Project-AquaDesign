import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList, Text } from '@chakra-ui/react'

export default function ScaleFadeEx9() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
         <Text ml='38%' fontSize='25px'>9 шаг</Text>
        <Button  ml='18%' fontSize='20px'>Прием работы Заказчиком</Button>
       
          <Box
            color='white'
            mt='4'
            bg='blue.500'
            rounded='md'
            shadow='md'
             padding='2%'
          >
            <UnorderedList>
          <ListItem>Подписываются акты выполненных работ</ListItem>
          <ListItem>Передача объекта в эксплуатацию</ListItem>
          <ListItem>Принятие оборудования на гарантию</ListItem>

    </UnorderedList>
          </Box>
       
      </>
    )
  }

  // <Text ml='42%' fontSize='25px'>5 шаг</Text>
  // <Button onClick={onToggle} ml='32%' fontSize='20px'>Визуализация</Button>
  // <ScaleFade initialScale={0.9} in={isOpen}>
  //   <Box
     
  //     color='white'
  //     mt='4'
  //     bg='blue.500'
  //     rounded='md'
  //     shadow='md'
  //   >
  //     <UnorderedList>