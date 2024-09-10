import styles from './FountainCard.module.css';
import { Card, CardBody, Stack, Text, Link } from '@chakra-ui/react';
import { Image } from '@chakra-ui/image';

export default function FountainCard({ el, setEntries }) {
  return (
    <div className={styles.wrapper}>
    <Card className={styles.card} maxW="xl" borderRadius="none">
      {el.photos && el.photos.length > 0 ? (
        <Image src={el.photos[0]?.image} alt="photo" className={styles.image} />
      ) : (
        <Text>Нет доступных изображений</Text>
      )}
      <CardBody className={styles.cardBody}>
        <Stack mt="3" className={styles.textContainer}>
          <Link href={`/ourWorks/${el.id}`} className={styles.titleLink}>
          <Text
              fontSize={el.title.length > 40 ? 'lg' : 'xl'}
              noOfLines={2} 
            >
              {el.title}
            </Text>
          </Link>
          <Text fontSize="md" margin={0} className={styles.city}>{el.City.nameCity}</Text>
        </Stack>
      </CardBody>
    </Card>
  </div>
  );
}
