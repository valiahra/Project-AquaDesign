import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from './OneFountain.module.css';
import { Image, Stack, Text, Heading, Box, Button } from '@chakra-ui/react';

import Slider from 'react-slick';
import ApplicationModal from '../ApplicationForm/ApplicationModal';

type FountainType = {
  title: string;
  description: string;
  techDescription: string;
  photos: { image: string }[];
  City: { nameCity: string };
};

export default function OneFountain() {
  const { id } = useParams();
  const back = useNavigate();

  const [oneFountain, setOneFountain] = useState<FountainType | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/fountains/${id}`)
      .then((res) => {
        setOneFountain(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.wrapper}>
      <Box className={styles.container}>
        {oneFountain ? (
          <>
            <Heading className={styles.header}>
              {oneFountain.title}, г. {oneFountain.City.nameCity}
            </Heading>
            <Slider {...settings} className={styles.carousel}>
              {oneFountain.photos?.map((el, index) => (
                <Image
                  key={index}
                  src={el.image}
                  alt="Фонтан"
                  objectFit="cover"
                  borderRadius="lg"
                />
              ))}
            </Slider>
            <div className={styles.modal}>
              <Button
                   size="lg"
                   type="submit"
                   style={{ 
                     backgroundColor: 'white', 
                     color: 'linear-gradient(to right, #557488, #172f44);',
                     border: '2px solid #337ab7', 
                     marginRight: '20px' 
                   }}
                   _hover={{
                     backgroundColor: '#337ab7',
                     color: '#337ab7',
                   }}
                   _active={{
                     backgroundColor: '#286090',
                     color: 'white',
                     borderColor: '#286090',
                   }}
               onClick={() => back(-1)}>
                Назад
              </Button>
              <ApplicationModal />
            </div>
            <Stack className={styles.descriptionContainer}>
  <Box pl={5} pr={5} pt={5} flex="1" className={styles.description}>
    <Heading size="md">
      Описание
    </Heading>
    <Text fontSize='lg'>
      {oneFountain.description}
    </Text>
  </Box>
  <Box pl={5} pr={5} pt={5} flex="1" className={styles.techDescription}>
    <Heading size="md">
      Дополнительная информация
    </Heading>
    <Text fontSize='lg'>
      {oneFountain.techDescription}
    </Text>
  </Box>
</Stack>
          </>
        ) : (
          <Text>Загрузка данных...</Text>
        )}
      </Box>
    </div>
  );
}
