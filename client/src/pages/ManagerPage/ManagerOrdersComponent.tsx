import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import ListOfOrders from './ListOfOrders'
import styles from './ManagerPage.module.css'

export default function ManagerOrdersComponent({orderOn, setorderOn,orderWork,setorderWork,orderOff,setorderOff, orders, setOrders}) {
    const colors = useColorModeValue(
      ['white.50', 'white.50', 'white.50'],
      ['white.900', 'white.900', 'white.900'],
    )
    const [tabIndex, setTabIndex] = useState(0)
    const bg = colors[tabIndex]
    return (
      <Tabs onChange={(index) => setTabIndex(index)} bg={bg} align='center'  colorScheme="blue">
        <TabList >
          <Tab><b>ПРИНЯТ</b></Tab>
          <Tab><b>В РАБОТЕ</b></Tab>
          <Tab><b>ЗАВЕРШЕН</b></Tab>
        </TabList>
        <TabPanels p='2rem'>
          <TabPanel className={styles.manager}><ListOfOrders orders={orderOn} setorders={setorderOn} /></TabPanel>
          <TabPanel className={styles.manager}><ListOfOrders orders={orderWork} setorders={setorderWork} /></TabPanel>
          <TabPanel className={styles.manager}><ListOfOrders orders={orderOff} setorders={setorderOff} /></TabPanel>
        </TabPanels>
      </Tabs>
    )
  }