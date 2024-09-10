import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
  } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'


export default function MenuComponent() {
  return (
    <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<HamburgerIcon />}
      variant="outline"
      borderColor="#337ab7"
      color="#337ab7"
      _hover={{ bg: "#f5f5f5" }}
    />
    <MenuList bg="#fff" borderColor="#337ab7" padding="10px">
      <MenuItem as='a' href='/ourWorks' padding="10px" _hover={{ bg: "#f5f5f5" }}>
        Готовые объекты
      </MenuItem>
      <MenuItem as='a' href='/projects' padding="10px" _hover={{ bg: "#f5f5f5" }}>
        Проекты фонтанов
      </MenuItem>
      <MenuItem as='a' href='/constructor' padding="10px" _hover={{ bg: "#f5f5f5" }}>
        Подбор фонтанов
      </MenuItem>
    </MenuList>
  </Menu>
  )
}
