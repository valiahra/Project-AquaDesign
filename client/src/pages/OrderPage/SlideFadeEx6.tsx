import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList,Text } from '@chakra-ui/react'

export default function ScaleFadeEx6() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
      <Text ml='38%' fontSize='25px'>6 шаг</Text>
        <Button  ml='27%' fontSize='20px'>Проектирование</Button>
        
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
          <ListItem>На основании заполненного опросника или сформулированного технического задания разрабатывается необходимый объем проектной документации</ListItem>
          <ListItem>По результатам работы предоставляется полный пакет чертежей</ListItem>
    </UnorderedList>
          </Box>
        
      </>
    )
  }

 