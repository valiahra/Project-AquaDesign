import { Card, CardHeader, CardBody, CardFooter, Box, Heading, Stack, StackDivider ,Text} from '@chakra-ui/react'

export default function TelephoneComponent() {
  return (
    <Card size='sm' width= '20%' ml='2%'>
  <CardHeader>
    <Heading size='md'></Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='14'>
      <Box>
        <Heading size='sm' textTransform='uppercase'>
        Телефон
        </Heading>
        <Text pt='2' fontSize='sm'>
        +7 (920) 507-5006
        </Text>
      </Box>
      <Box>
        <Heading size='sm' textTransform='uppercase'>
        E-mail
        </Heading>
        <Text pt='2' fontSize='sm'>
        manager_fountains@mail.ru
        </Text>
      </Box>
      <Box>
        <Heading size='sm' textTransform='uppercase'>
        Адрес
        </Heading>
        <Text pt='2' fontSize='sm'>
        115230, г. Москва, Электролитный проезд, д. 3, стр. 79, эт. 1 (от м. Нагорная 600 метров)
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>
  )
}
