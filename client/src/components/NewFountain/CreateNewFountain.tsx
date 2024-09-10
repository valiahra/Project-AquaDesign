import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Textarea,
} from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import { useAppSelector } from '../../redux/hooks';
import styles from './CreateNewFountain.module.css';

export default function CreateNewFountain({
  fountains,
  setFountains,
  onClose,
}) {
  const { user } = useAppSelector((store) => store.userSlice);
  const [inputs, setInputs] = useState({
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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState(null);

  const inputsHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(inputs).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('user', user.id);
    if (image) {
      image.forEach((file) => {
        formData.append('images', file);
      });
    }
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/fountainsAdmin/newFountain`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.status === 200) {
        const newFountain = response.data;
        newFountain.photos = image?.map((file) => ({
          image: URL.createObjectURL(file),
        }));
        setFountains((prevFountains) => [newFountain, ...prevFountains]);
        setInputs({
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
        setImage(null);
        setImagePreview(null);
        setIsImageLoaded(false);
      } else {
        setError('Ошибка при создании фонтана');
      }
    } catch (error) {
      setError('Ошибка при создании фонтана');
    }
  };

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <Input
        className={styles.inputs}
        onChange={inputsHandler}
        name="title"
        placeholder="Название"
        value={inputs.title}
      />
      <Textarea
        className={styles.inputs}
        onChange={inputsHandler}
        name="description"
        placeholder="Описание"
        value={inputs.description}
      />
      <Textarea
        className={styles.inputs}
        onChange={inputsHandler}
        name="techDescription"
        placeholder="Дополнительное описание"
        value={inputs.techDescription}
      />
      <Input
        className={styles.inputs}
        onChange={inputsHandler}
        name="coordinateX"
        placeholder="Широта"
        value={inputs.coordinateX}
      />

      <Input
        className={styles.inputs}
        onChange={inputsHandler}
        name="coordinateY"
        placeholder="Долгота"
        value={inputs.coordinateY}
      />

      <Input
        className={styles.inputs}
        onChange={inputsHandler}
        name="nameCity"
        placeholder="Город"
        value={inputs.nameCity}
      />
      <Input
        className={styles.inputs}
        onChange={inputsHandler}
        name="place"
        placeholder="Место установки"
        value={inputs.place}
      />
      <Input
        className={styles.inputs}
        onChange={inputsHandler}
        name="titleView"
        placeholder="Проект или реальный фонтан"
        value={inputs.titleView}
      />
      <Input
        className={styles.inputs}
        onChange={inputsHandler}
        name="nameType"
        placeholder="Типы фонтана"
        value={
          inputs.nameType.slice(0, 1).toUpperCase() +
          inputs.nameType.slice(1).toLowerCase()
        }
      />
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
      <Button onClick={onClose} type="submit" size="lg" colorScheme="cyan">
        Добавить
      </Button>
      </div>
      {/* {error && <p style={{ color: 'ed' }}>{error}</p>} */}
    </form>
  );
}
