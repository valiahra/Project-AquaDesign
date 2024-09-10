import { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { fetchLogoutUser } from '../../redux/thunkActions';
import ApplicModalNavBar from '../../components/ApplicationForm/ApplicModalNavBar';

import MenuComponent from '../../components/Menu/MenuComponent';

import ModalSignin from '../../components/AuthForm/ModalSignin';
import ModalSignup from '../../components/AuthForm/ModalSignup';


export default function Navbar() {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    await dispatch(fetchLogoutUser());
    setAccessToken('');
  };

  return (
    <div className={styles.wrapper}>
    <div className={styles.left}>
      <Link to="/">На главную</Link>
      <Link to="/aboutUs" className={styles.fake__link}>О компании</Link>
      <Link to="/services" className={styles.fake__link}>Услуги</Link>
      <Link to="/contacts" className={styles.fake__link}>Контакты</Link>
      <div className={styles.modalOrder}>
   <ApplicModalNavBar />
      </div>
   
    </div>
    <div className={styles.right}>
      {user?.username ? (
        <div className={styles.userMenu}>
          {user?.isManager ? (
            <div>
              <Link to="/manager">Менеджер</Link>
              <Link to="/chat">Вопросы пользователей</Link>
            </div>
          ) : user?.isAdmin ? (
            <Link to="/admin">Администратор</Link>
          ) : (
            <Link to="/user">Личный кабинет</Link>
          )}
         <Link to='/'><p className={styles.fake__link} onClick={logoutHandler}>
            Выйти
          </p></Link> 
        </div>
      ) : (
        <div className={styles.authMenu}>
          <div className={styles.modalLink}>
            <ModalSignin />
          </div>
          <div className={styles.modalLink}>
            <ModalSignup />
          </div>
        </div>
      )}
      <MenuComponent />
    </div>
  </div>
  );
}
