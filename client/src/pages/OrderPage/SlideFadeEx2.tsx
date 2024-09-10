import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, ListItem, UnorderedList,Text } from '@chakra-ui/react'

export default function ScaleFadeEx2() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
      <Text ml='40%' fontSize='25'>2 шаг</Text>
        <Button   ml='27%' fontSize='20px'>Получение заявки</Button>
        
          <Box
            color='white'
            mt='4'
            bg='blue.500'
            rounded='md'
            shadow='md'
            //  padding='1%'
          >
            <UnorderedList>
          <ListItem>Отправить нам заполненный опросник или сослаться на любой подходящий фонтан (водоем) из раздела Наши работы и Проекты или прислать свой эскиз (фото, чертежи и т.д.)</ListItem>
          <ListItem>Наши специалисты свяжутся с Вами для обсуждения деталей</ListItem>
    </UnorderedList>
          </Box>
      </>
    )
  }

