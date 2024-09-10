import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './AuthForm.module.css';
import {
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAuthUser } from '../../redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
  WarningIcon,
} from '@chakra-ui/icons';
import InputMask from 'react-input-mask';
import { User } from '../../types/statesTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
// const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

type Inputs = {
  username: string;
  email: string;
  password: string;
  phone: string;
};

type AuthFormProps = {
  title: string;
  type: 'signin' | 'signup';
};

const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const validatePassword = (password: string) => {
  const re = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

const validatePhone = (phone: string) => {
  const re = /^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return re.test(phone);
};

export default function AuthForm({ title, type }: AuthFormProps) {
  const [inputs, setInputs] = useState<Inputs>({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const userId = useSelector((state: RootState) => state.userSlice.user.id);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (type === 'signup') {
      if (!inputs.username) {
        setErrors((prev) => ({
          ...prev,
          username: 'Имя пользователя обязательно',
        }));
        hasError = true;
      } else {
        setErrors((prev) => ({ ...prev, username: '' }));
      }
    }

    if (!validateEmail(inputs.email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Некорректный email. Формат: example@example.com',
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }

    if (!validatePassword(inputs.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Некорректный пароль. Формат: не менее 8 символов, содержит буквы и цифры',
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }

    if (type === 'signup' && !validatePhone(inputs.phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Некорректный номер телефона. Формат: +X (XXX) XXX-XX-XX',
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
    if (hasError) {
      console.log('Ошибка валидации:', errors);
      return;
    }

    try {
      const result = await dispatch(fetchAuthUser({ inputs, type }));
      const unwrappedResult = unwrapResult(result);
      setAccessToken(unwrappedResult.accessToken);
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, email: 'Ошибка авторизации' }));
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      {/* <h4 className={styles.head}>{title}</h4> */}
      <div className={styles.inputs}>
        {type === 'signin' && (
          <>
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="email"
              name="email"
              value={inputs?.email}
              placeholder="Электронная почта"
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            <InputGroup>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={inputs?.password}
                placeholder="Пароль"
              />
              <InputRightElement>
                <Button
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <div style={{ color: 'red' }}>{errors.password}</div>
            )}
          </>
        )}
        {type === 'signup' && (
          <>
            <InputGroup>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="username"
                value={inputs?.username}
                placeholder="Имя пользователя"
              />
              {errors.username && (
                <div style={{ color: 'red' }}>{errors.username}</div>
              )}
            </InputGroup>
            <InputGroup>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                title={errors.email || 'Формат: example@example.com'}
                value={inputs?.email}
                placeholder="Электронная почта"
                isInvalid={errors.email !== ''}
                errorBorderColor="red.500"
              />
              {errors.email !== '' && (
                <InputRightElement>
                  <WarningIcon color="red.500" />
                </InputRightElement>
              )}
            </InputGroup>
            {/* {errors.email && <div style={{ color: "ed" }}>{errors.email}</div>} */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input
                as={InputMask}
                mask="+9 (999) 999-99-99"
                onChange={changeHandler}
                name="phone"
                value={inputs.phone}
                type="tel"
                placeholder="Номер телефона"
              />
            </InputGroup>
            <InputGroup>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type={showPassword ? 'text' : 'password'}
                name="password"
                title={
                  errors.password ||
                  'Формат: не менее 8 символов, содержит буквы и цифры'
                }
                value={inputs?.password}
                placeholder="Пароль"
                isInvalid={errors.password !== ''}
                errorBorderColor="red.500"
              />
              <InputRightElement>
                <Button
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {/* {errors.password && (
              <div style={{ color: "ed" }}>{errors.password}</div>
            )} */}
          </>
        )}
      </div>
      <div className={styles.btns}>
        {type === 'signin' && (
          <Button type="submit" colorScheme="teal">
            Вход
          </Button>
        )}
        {type === 'signup' && (
          <Button type="submit" colorScheme="teal">
            Регистрация
          </Button>
        )}
      </div>
    </form>
  );
}
