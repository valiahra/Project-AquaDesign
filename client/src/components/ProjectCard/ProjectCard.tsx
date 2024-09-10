import { Link, Stack } from '@chakra-ui/layout';
import styles from './ProjectCard.module.css';
import { Card, CardBody, Text } from '@chakra-ui/react';
import React from 'react';
import { Image } from '@chakra-ui/image';

export default function ProjectCard({ el, setEntries }) {
  return (
    <div className={styles.wrapper}>
    <Card className={styles.card} maxW="xl" borderRadius="none">
      {el.photos && el.photos.length > 0 ? (
        <Image
          src={el.photos[0].image}
          alt="photo"
          className={styles.image}
        />
      ) : (
        <Text>Нет доступных изображений</Text>
      )}
      <CardBody>
        <Stack mt="3">
          <Link href={`/progectsCardInfo/${el.id}`} className={styles.title}>
            <Text
              fontSize={el.title.length > 37 ? 'md' : 'lg'}
              noOfLines={2} 
            >
              {el.title}
            </Text>
          </Link>
          <Text fontSize="md" className={styles.city} noOfLines={1} isTruncated>
            {el.City.nameCity}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  </div>
  );
}
