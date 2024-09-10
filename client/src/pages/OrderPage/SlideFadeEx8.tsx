import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList, Text } from '@chakra-ui/react'

export default function ScaleFadeEx8() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
         <Text ml='40%' fontSize='25px'>8 шаг</Text>
        <Button  ml='20%' fontSize='20px'>Монтаж и строительство</Button>
          <Box
           
            color='white'
            mt='4'
            bg='blue.500'
            rounded='md'
            shadow='md'
            height='58%'
             padding='2%'
          >
            <UnorderedList>
          <ListItem>Все этапы работ осуществляют высококлассные специалисты с опытом возведения фонтанов и водоемов не менее 10 лет</ListItem>
          <ListItem>В завершении выполняются пуско-наладочные работы</ListItem>
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