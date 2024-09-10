import React from 'react';
import styles from './ContactsPage.module.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import WorksMap from '../OurWorksPage/WorksMap';
import { Grid, GridItem } from '@chakra-ui/react';
import ContactsTable from './ContactsTable';
import TelephoneComponent from './TelephoneComponent';
import ContactsTable2 from './ContactsTable2';
import TelephoneComponent2 from './TelephoneComponent2';

export default function ContactsPage() {
  return (
    <Box>
      <Tabs isFitted variant="enclosed">
         <TabList mb="1em">
          <Tab>Офис</Tab>
          <Tab>Склад</Tab>
        </TabList> 
        
        <TabPanels>
          <TabPanel className={styles.container}>
            <ContactsTable />
             <TelephoneComponent />  
          </TabPanel>

          <TabPanel className={styles.container} >
           <ContactsTable2 />
           <TelephoneComponent2 />  
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
