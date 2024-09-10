
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
  } from '@chakra-ui/react'
import WorksMap from '../OurWorksPage/WorksMap'

export default function ContactsTable() {
  return (
    <>
    <TableContainer width='20%' >
  <Table variant='striped' colorScheme='blue' background='white' size='lg'>
    <Thead>
      <Tr>
        <Th fontSize='15'>День недели</Th>
        <Th fontSize='15'>Время работы</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Понедельник</Td>
        <Td>8-00 — 18-00</Td>
      </Tr>
      <Tr>
        <Td>Вторник</Td>
        <Td>8-00 — 18-00</Td>
      </Tr>
      <Tr>
        <Td>Среда</Td>
        <Td>8-00 — 18-00</Td>
      </Tr>
      <Tr>
        <Td>Четверг</Td>
        <Td>8-00 — 18-00</Td>
      </Tr>
      <Tr>
        <Td>Пятница</Td>
        <Td>8-00 — 17-00</Td>
      </Tr>
      <Tr>
        <Td>Суббота</Td>
        <Td>По запросу</Td>
      </Tr>
      <Tr>
        <Td>Воскресенье</Td>
        <Td>По запросу</Td>
      </Tr>
      <Tr>
        <Td></Td>
        <Td></Td>
      </Tr>
    </Tbody>
    <Tfoot>
    </Tfoot>
  </Table>
</TableContainer>
{/* <Box ml='10%' mt='1%'><WorksMap/></Box> */}
</>
  )
}
