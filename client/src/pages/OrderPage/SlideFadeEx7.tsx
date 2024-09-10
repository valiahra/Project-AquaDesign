import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList, Text } from '@chakra-ui/react'

export default function ScaleFadeEx7() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
         <Text ml='38%' fontSize='25px'>7 шаг</Text>
        <Button  ml='8%' fontSize='20px'>Поставка оборудования и материалов</Button>
       
          <Box
            color='white'
            mt='4'
            bg='blue.500'
            rounded='md'
            shadow='md'
             padding='2%'
          >
            <UnorderedList>
          <ListItem>В кратчайшие сроки осуществляем поставку оборудования мировых производителей и продукции собственного изготовления</ListItem>
          <ListItem>Все поставляемое оборудование защищено гарантийным сроком до 5 лет</ListItem>
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