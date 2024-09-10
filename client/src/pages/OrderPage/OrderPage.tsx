import React from 'react';
import styles from './OrgerPage.module.css';
import ApplicationForm from '../../components/ApplicationForm/ApplicationForm';
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { useAppSelector } from '../../redux/hooks';
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  CheckIcon,
} from '@chakra-ui/icons';
import ScaleFadeEx from './SlideFadeEx';
import ScaleFadeEx2 from './SlideFadeEx2';
import ScaleFadeEx3 from './SlideFadeEx3';
import ScaleFadeEx4 from './SlideFadeEx4';
import ScaleFadeEx5 from './SlideFadeEx5';
import ScaleFadeEx6 from './SlideFadeEx6';
import ScaleFadeEx7 from './SlideFadeEx7';
import { Link } from 'react-router-dom';
import ScaleFadeEx8 from './SlideFadeEx8';
import ScaleFadeEx9 from './SlideFadeEx9';
import ApplicationModal from '../../components/ApplicationForm/ApplicationModal';



export default function OrderPage() {
  // const { user } = useAppSelector((store) => store.userSlice);
  return (
    <div>
      <h1>Как заказать</h1>

<div className={styles.parent}>
  <div>
  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
  fontSize='29px'
  icon={<ArrowForwardIcon />}
  ml='46%'
  width='16%'
  height='30%'
/>
    <ScaleFadeEx/>
  </div>

  <div>
  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
 fontSize='29px'
  icon={<ArrowDownIcon />}
  ml='38%'
  width='16%'
  height='30%'
/>
<ScaleFadeEx2/>
  </div>
      
  <div>  
  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
  fontSize='29px'
  icon={<ArrowDownIcon />}
  ml='44%'
  width='16%'
  height='30%'
/>
  <ScaleFadeEx4/>
  </div>

  <div>

  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
  fontSize='29px'
  icon={<ArrowBackIcon />}
  ml='38%'
  width='16%'
  height='30%'
/>

<ScaleFadeEx3/>
  </div> 


  <div> 
  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
  fontSize='30px'
  icon={<ArrowForwardIcon />}
  ml='42%'
  width='16%'
  height='30%'
/>
  <ScaleFadeEx5/>
  </div>


  <div>
  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
  fontSize='30px'
  icon={<ArrowDownIcon />}
  ml='37%'
  width='16%'
  height='30%'
/>
  <ScaleFadeEx6/>
  </div>


<div> 
  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
  fontSize='30px'
  icon={<ArrowDownIcon />}
  ml='39%'
  width='16%'
  height='30%'
/>
 <ScaleFadeEx8/>
  </div>

  <div> 
  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
  fontSize='30px'
  icon={<ArrowBackIcon />}
  ml='37%'
  width='16%'
  height='30%'
/>
 <ScaleFadeEx7/>
  </div>


  <div> 
  <IconButton
  isRound={true}
  variant='solid'
  colorScheme='green'
  aria-label='Done'
  fontSize='30px'
  icon={<ArrowForwardIcon />}
  ml='37%'
  width='16%'
  height='30%'
/>
 <ScaleFadeEx9/>
  </div>


  <div className={styles.modal}>
  <ApplicationModal/>
  </div>
</div>
        
      </div>
      
  );
}
