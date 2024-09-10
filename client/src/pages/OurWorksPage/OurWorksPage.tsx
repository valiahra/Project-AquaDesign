// import React from 'react'
import styles from './OurWorksPage.module.css';
import ListWork from '../../components/ListWork/ListWork';
import WorksMap from './WorksMap';


export default function OurWorksPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Готовые объекты</h1>
      <WorksMap />
      <ListWork />
    </div>
  );
}
