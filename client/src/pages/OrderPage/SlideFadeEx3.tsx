import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList, Text } from '@chakra-ui/react'

export default function ScaleFadeEx3() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
      <Text ml='40%' fontSize='25px'>3 шаг</Text>
        <Button  ml='3%' fontSize='20px'>Выставление коммерческого предложения</Button>
       
          <Box
           
            color='white'
            mt='4'
            bg='blue.500'
            rounded='md'
            shadow='md'
            height='66%'
             padding='2%'
          >
            <UnorderedList>
          <ListItem>Инженеры подготовят один или несколько вариантов</ListItem>
          <ListItem>Поиск оптимального решения по стоимости, срокам и объемам работ и поставки</ListItem>
    </UnorderedList>
          </Box>
       
      </>
    )
  }

  