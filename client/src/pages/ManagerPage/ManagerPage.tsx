import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance';
import { Card, CardHeader, CardBody, CardFooter,Heading,Stack,StackDivider ,Box,Text ,Button} from '@chakra-ui/react'
import ListOfOrders from './ListOfOrders';
import ManagerOrdersComponent from './ManagerOrdersComponent';
import styles from './ManagerPage.module.css'

export default function ManagerPage({orders, setOrders}) {
    // const [orders, setOrders] = useState([]);
    const[orderOn, setorderOn] = useState([])
    const[orderWork, setorderWork] = useState([])
    const[orderOff, setorderOff] = useState([])

    useEffect(() => {
        axiosInstance
          .get(`${import.meta.env.VITE_API}/orders/on`)
          .then((res) => {
            // console.log(res.data)
            setorderOn(res.data);
            console.log(res.data);
          })
          .catch((err) => console.error(err));
        
        axiosInstance
          .get(`${import.meta.env.VITE_API}/orders/work`)
          .then((res) => {
            // console.log(res.data)
            setorderWork(res.data);
            console.log(res.data);
          })
          .catch((err) => console.error(err));

          axiosInstance
          .get(`${import.meta.env.VITE_API}/orders/off`)
          .then((res) => {
            // console.log(res.data)
            setorderOff(res.data);
            console.log(res.data);
          })
          .catch((err) => console.error(err));  


      }, [orders]);


  return (
    <div>
       <ManagerOrdersComponent orderOn={orderOn} setorderOn={setorderOn} orderWork={orderWork} setorderWork={setorderWork} orderOff={orderOff} setorderOff={setorderOff} /> 
    </div>
  )
}
