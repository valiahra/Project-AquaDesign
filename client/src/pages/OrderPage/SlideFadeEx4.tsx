import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList ,Text} from '@chakra-ui/react'

export default function ScaleFadeEx4() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
      <Text ml='45%' fontSize='25px'>4 шаг</Text>
        <Button  ml='27%' fontSize='20px'>Заключение договора</Button>
        
          <Box
           
            color='white'
            mt='4'
            bg='blue.500'
            rounded='md'
            shadow='md'
             padding='2%'
          >
            <UnorderedList>
          <ListItem>Выбираем удобный для Заказчика вариант сотрудничества по объему работ, а именно полный цикл или отдельные виды (например, поставка оборудования и шефмонтаж, визуализация и проектирование и т.д.)</ListItem>
          <ListItem>Решение юридических и технических вопросов</ListItem>
    </UnorderedList>
          </Box>
        
      </>
    )
  }

 