import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import styles from './AdminPageCard.module.css';
import Slider from 'react-slick';

export default function AdminPageCard({ fountain, setFountains }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techDescription: '',
    coordinateX: '',
    coordinateY: '',
    nameCity: '',
    place: '',
    titleView: '',
    image: '',
    nameType: '',
  });
  const [error, setError] = useState(null);

  const deleteHandler = async () => {
    try {
      const res = await axiosInstance.delete(
        `${import.meta.env.VITE_API}/fountains/${fountain.id}`
      );
      if (res.status === 200) {
        setFountains((prev) => prev.filter((el) => el.id !== fountain.id));
      } else {
        setError('Ошибка при удалении фонтана');
      }
    } catch (error) {
      setError('Ошибка при удалении фонтана');
    }
  };

  const handleEdit = (fountain) => {
    setEditing(fountain.id);
    setFormData({
      title: fountain.title,
      description: fountain.description,
      techDescription: fountain.techDescription,
      coordinateX: fountain.coordinateX,
      coordinateY: fountain.coordinateY,
      nameCity: fountain.City ? fountain.City.nameCity : '',
      place: fountain.PlaceInstal ? fountain.PlaceInstal.place : '',
      titleView: fountain.View ? fountain.View.titleView : '',
      image: null,
      nameType: Array.isArray(fountain.types)
        ? fountain.types.map((el) => el.nameType).join(', ')
        : '',
    });
    setImage(fountain.photos.map((el) => el.image));
    setImagePreview(
      fountain.photos.map((el) => {
        if (el.image.includes('/')) {
          return el.image;
        } else {
          return `http://localhost:3200/img/${el.image}`;
        }
      })
    );
    setIsImageLoaded(true);
  };

  const handleSave = async (id) => {
    try {
      const newFormData = new FormData();
      newFormData.append('title', formData.title);
      newFormData.append('description', formData.description);
      newFormData.append('techDescription', formData.techDescription);
      newFormData.append('coordinateX', formData.coordinateX);
      newFormData.append('coordinateY', formData.coordinateY);
      newFormData.append('nameCity', formData.nameCity);
      newFormData.append('place', formData.place);
      newFormData.append('titleView', formData.titleView);
      newFormData.append('nameType', formData.nameType);
      if (image && image.length > 0) {
        image.forEach((file) => {
          newFormData.append('images', file);
        });
      }

      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API}/fountainsAdmin/${id}`,
        newFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        
      );
      if (res.status === 200) {
        const updatedFountain = await axiosInstance.get(
          `${import.meta.env.VITE_API}/fountains/${id}`
        );
        setFountains((prevFountains) =>
          prevFountains.map((f) => (f.id === id ? updatedFountain.data : f))
        );
        setEditing(null);
        setError(null);
        window.location.reload()
      } else {
        setError('Ошибка при сохранении фонтана');
      }
    } catch (error) {
      console.error(error);
      setError('Ошибка при сохранении фонтана');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setImage(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreview(previews);
      setIsImageLoaded(true);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.wrapper}>
      {editing === fountain?.id ? (
        <form className={styles.forms}>
          <h2 className={styles.head}>Редактирование фонтана</h2>
          <div className={styles.inputs}>
            <label>Название</label>
            <Input
              className={styles.inputs}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Название"
            />
            <label>Описание</label>
            <Textarea
              className={styles.inputs}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание"
            />
            <label>Дополнительное описание</label>
            <Textarea
              className={styles.inputs}
              type="text"
              name="techDescription"
              value={formData.techDescription}
              onChange={handleChange}
              placeholder="Дополнительное описание"
            />
            <p>Координаты</p>
            <div className={styles.coordinates}>
              <label>Широта</label>
              <Input
                className={styles.inputs}
                type="text"
                name="coordinateX"
                value={formData.coordinateX}
                onChange={handleChange}
                placeholder="Координаты Х"
              />
              <label>Долгота</label>
              <Input
                className={styles.inputs}
                type="text"
                name="coordinateY"
                value={formData.coordinateY}
                onChange={handleChange}
                placeholder="Координаты Y"
              />
            </div>
            <label>Город</label>
            <Input
              className={styles.inputs}
              type="text"
              name="nameCity"
              value={formData.nameCity}
              onChange={handleChange}
              placeholder="Город"
            />
            <label>Место установки</label>
            <Input
              className={styles.inputs}
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="Место установки"
            />
            <label>Вид объекта</label>
            <Input
              className={styles.inputs}
              type="text"
              name="titleView"
              value={formData.titleView}
              onChange={handleChange}
              placeholder="Вид объекта"
            />
            <label>Типы фонтана</label>
            <Input
              className={styles.inputs}
              type="text"
              name="nameType"
              placeholder="Типы фонтана"
              value={formData.nameType}
              onChange={handleChange}
            />
          </div>

          <FormControl>
            <FormLabel htmlFor="file-upload"></FormLabel>
            <Input
              className={styles.inputs}
              onChange={handleImageChange}
              type="file"
              multiple
              name="images"
              accept="image/*"
              display="none"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Box
                style={{
                  borderWidth: '1px',
                  borderRadius: '5px',
                  padding: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                {isImageLoaded ? (
                  <div className={styles.container}>
                    {imagePreview?.map((preview, index) => (
                      <Image
                        className={styles.photo}
                        src={preview}
                        alt="Preview"
                        objectFit="cover"
                        width={350}
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  'Загрузить изображение'
                )}
              </Box>
            </label>
          </FormControl>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <Button
              onClick={() => handleSave(fountain.id)}
              size="lg"
              colorScheme="cyan"
              width="150px"
            >
              Сохранить
            </Button>
          </div>
          {error && <p style={{ color: 'ed' }}>{error}</p>}
        </form>
      ) : (
        <Card
          width="80%"
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
          margin="10px"
        >
          <Stack>
            <CardBody>
              <div className={styles.container}>
                <div className={styles.images}>
                  {fountain.photos &&
                    Array.isArray(fountain.photos) &&
                    fountain.photos.map((photo, index) => (
                      <Image
                        className={styles.photo}
                        src={
                          photo.image.includes('/')
                            ? photo.image
                            : `http://localhost:3200/img/${photo.image}`
                        }
                        alt="Your photo"
                        borderRadius="lg"
                        key={index}
                      />
                    ))}
                </div>
                <div className={styles.info}>
                  <Heading size="lg" className={styles.head}>
                    {fountain?.title}
                  </Heading>
                  <Text py="2">{fountain?.description}</Text>
                  <Text>{fountain?.techDescription}</Text>
                  <div className={styles.coordinates}>
                    <Text>Координаты</Text>
                    <Text>Широта: {fountain?.coordinateX}</Text>
                    <Text>Долгота: {fountain?.coordinateY}</Text>
                  </div>
                  <Text>Город: {fountain?.City?.nameCity}</Text>
                  <Text>Вид работы: {fountain?.View?.titleView}</Text>
                  <div className={styles.coordinates}>
                    <Text>Типы фонтана:</Text>
                    {fountain?.types?.map((el) => (
                      <Text>{el?.nameType}</Text>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
            <div className={styles.btns}>
              <Button
                onClick={() => handleEdit(fountain)}
                colorScheme="teal"
                variant="outline"
                margin="0px 30px 10px 10px"
              >
                Редактировать
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                marginBottom="10px"
                onClick={deleteHandler}
              >
                Удалить
              </Button>
            </div>
          </Stack>
        </Card>
      )}
    </div>
  );
}
