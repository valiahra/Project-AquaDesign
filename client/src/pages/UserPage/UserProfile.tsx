// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../../axiosInstance';
// import { useAppSelector } from '../../redux/hooks';
// import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, IconButton, Button } from '@chakra-ui/react'

export default function UserProfile() {
    const { user } = useAppSelector((store) => store.userSlice);

  return (
    <Card maxW='md'>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src='#' />
        <Box>
          <Heading size='lg'>{user.username}</Heading>
          <Heading size='s'>{user.email}</Heading>
          <Heading size='s'>{user.phone}</Heading>
        </Box>
      </Flex>
    </Flex>
  </CardHeader>
  <CardBody>
    {/* <Text>
      With Chakra UI, I wanted to sync the speed of development with the speed
      of design. I wanted the developer to be just as excited as the designer to
      create a screen.
    </Text> */}
  </CardBody>
  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  > 
    <Button flex='1' variant='ghost'>
     Профиль
    </Button>
  </CardFooter>
</Card>
  )
}

