import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList , Text} from '@chakra-ui/react'

export default function ScaleFadeEx() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
      <Text ml='47%' fontSize='25px'>1 шаг</Text>
        <Button  ml='27%' fontSize='20px'>Обращение в компанию</Button>
        
          <Box
            color='white'
            mt='4'
            bg='blue.400'
            rounded='md'
            shadow='md'
            height='67%'
            padding='2%'
            
            
          >
            <UnorderedList mt='1px'>
          {/* <ListItem>Первичная консультация по телефону или посредством электронной почты</ListItem> */}
          <ListItem>Анализ пожеланий и определение типа и назначение водного объекта</ListItem>
          <ListItem>Предварительная оценка стоимости и сроков</ListItem>
    </UnorderedList>
          </Box>
       
      </>
    )
  }