import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList, Text } from '@chakra-ui/react'

export default function ScaleFadeEx5() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
      <Text ml='42%' fontSize='25px'>5 шаг</Text>
        <Button  ml='32%' fontSize='20px'>Визуализация</Button>
        
          <Box
           
            color='white'
            mt='4'
            bg='blue.500'
            rounded='md'
            shadow='md'
            height='63%'
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

  