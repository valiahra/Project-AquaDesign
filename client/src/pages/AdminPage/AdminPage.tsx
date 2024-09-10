import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance';
import AdminPageList from './AdminPageList';
import styles from './AdminPage.module.css';
import ModalNewFountain from '../../components/NewFountain/ModalNewFountain';
import { Input } from '@chakra-ui/react';

export default function AdminPage() {
  const [fountains, setFountains] = useState([]);
  const [value, setValue] = useState('');

  // const [currentPage, setCurrentPage] = useState(1);
  // const [fountainsPerPage] = useState(10);

  // const lastFountainsIndex = currentPage * fountainsPerPage;
  // const firstFountainsIndex = lastFountainsIndex - fountainsPerPage;
  // const currentFountains = fountains.slice(
  //   firstFountainsIndex,
  //   lastFountainsIndex
  // );
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/fountainsAdmin`)
      .then((res) => {
        console.log('****',res.data)
        setFountains(res.data);
      
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredCoffee = fountains.filter((fountain)=>{
    return fountain.title.toLowerCase().includes(value.toLowerCase())
  })

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Профиль администратора</h1>
      <ModalNewFountain fountains={fountains} setFountains={setFountains}/>

      <Input className={styles.inputs} width= '37%' 

            onChange={(event) => setValue(event.target.value)} type='text' name='search' placeholder='Введите название фонтана'/>
      <AdminPageList fountains={filteredCoffee} setFountains={setFountains}/>

    </div>
  )
}
