import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import { useAppSelector } from '../../redux/hooks';
import InputMask from 'react-input-mask';
import styles from './ApplicationForm.module.css';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import AuthForm from '../AuthForm/AuthForm';

export default function ApplicationForm({ onClose }) {
  const { user } = useAppSelector((store) => store.userSlice);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    typeFountain: '',
    comment: '',
    budget: '',
    square: '',
  });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen } = useDisclosure();
  const [authType, setAuthType] = useState('signin');

  const changeHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
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

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName) newErrors.firstName = 'Пожалуйста, заполните имя';
    if (!form.lastName) newErrors.lastName = 'Пожалуйста, заполните фамилию';
    if (!form.email) newErrors.email = 'Пожалуйста, заполните email';
    if (!form.phone) newErrors.phone = 'Пожалуйста, заполните телефон';
    if (!form.city) newErrors.city = 'Пожалуйста, заполните город';
    if (!form.typeFountain)
      newErrors.typeFountain = 'Пожалуйста, заполните тип фонтана';
    if (!form.comment) newErrors.comment = 'Пожалуйста, заполните комментарий';
    if (!form.budget) newErrors.budget = 'Пожалуйста, заполните бюджет';
    if (!form.square) newErrors.square = 'Пожалуйста, заполните площадь';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
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
        `${import.meta.env.VITE_API}/orders/createOrder`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
  
      if (response.status === 200) {
        setForm({
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
          city: '',
          typeFountain: '',
          comment: '',
          budget: '',
          square: '',
        });
        setImage(null);
        setImagePreview(null);
        setIsImageLoaded(false);
        onClose();
      }
    } catch (error) {
      console.error('Ошибка:', error);
      if (error.response.status === 401) {
        onOpen();
      } else {
        toast({
          title: 'Ошибка',
          description: 'Чтобы отправить заявку, зарегистрируйтесь или войдите',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <h4>Форма заявки</h4>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <Input
          className={styles.inputs}
          onChange={changeHandler}
          value={form?.firstName}
          name="firstName"
          placeholder="Имя"
          isInvalid={!!errors.firstName}
        />
        {errors.firstName && (
          <div className={styles.error}>{errors.firstName}</div>
        )}
        <Input
          className={styles.inputs}
          onChange={changeHandler}
          name="lastName"
          value={form?.lastName}
          placeholder="Фамилия"
          isInvalid={!!errors.lastName}
        />
        {errors.lastName && (
          <div className={styles.error}>{errors.lastName}</div>
        )}
        <Input
          className={styles.inputs}
          onChange={changeHandler}
          name="email"
          value={form?.email}
          placeholder="Email"
          isInvalid={!!errors.email}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
        <Input
          className={styles.inputs}
          onChange={changeHandler}
          as={InputMask}
          mask="+9 (999) 999-99-99"
          name="phone"
          value={form?.phone}
          placeholder="Телефон"
          isInvalid={!!errors.phone}
        />
        {errors.phone && <div className={styles.error}>{errors.phone}</div>}
        <Input
          className={styles.inputs}
          onChange={changeHandler}
          name="city"
          value={form?.city}
          placeholder="Город проведения работ"
          isInvalid={!!errors.city}
        />
        {errors.city && <div className={styles.error}>{errors.city}</div>}
        <Input
          className={styles.inputs}
          onChange={changeHandler}
          name="typeFountain"
          placeholder="Тип фонтана"
          isInvalid={!!errors.typeFountain}
        />
        {errors.typeFountain && (
          <div className={styles.error}>{errors.typeFountain}</div>
        )}
      
        <Input
          className={styles.inputs}
          onChange={changeHandler}
          name="budget"
          value={form?.budget}
          placeholder="Бюджет"
          isInvalid={!!errors.budget}
        />
        {errors.budget && <div className={styles.error}>{errors.budget}</div>}
        <Input
          className={styles.inputs}
          onChange={changeHandler}
          name="square"
          value={form?.square}
          placeholder="Занимаемая площадь"
          isInvalid={!!errors.square}
        />
        {errors.square && <div className={styles.error}>{errors.square}</div>}
         <Textarea
          className={styles.inputs}
          onChange={changeHandler}
          name="comment"
          value={form?.comment}
          placeholder="Комментарий"
          isInvalid={!!errors.comment}
        />
        {errors.comment && <div className={styles.error}>{errors.comment}</div>}
         <br />
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
                <div>
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
          <Button 
          // onClick={onClose} 
          type="submit" 
          size="lg" 
          style={{ 
            backgroundColor: 'white', 
            color: '#337ab7', 
            border: '2px solid #337ab7', 
            marginRight: '20px' 
          }}
          _hover={{
            backgroundColor: '#337ab7',
            color: 'white',
          }}
          _active={{
            backgroundColor: '#286090',
            color: 'white',
            borderColor: '#286090',
          }}
          >
            Отправить
          </Button>
        </div>
      </form>
    </>
  );
}
