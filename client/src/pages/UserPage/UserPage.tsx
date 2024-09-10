import React, { useEffect, useState } from 'react';
import ListOfUserOrders from './ListOfUserOrders';
import axiosInstance from '../../axiosInstance';
import { useAppSelector } from '../../redux/hooks';
// import UserProfile from './UserProfile';

export default function UserPage() {
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useAppSelector((store) => store.userSlice);
  const userId = user.id;
  // console.log(userId)

  useEffect(() => {
    if (userId !== 0) {
      axiosInstance
        .get(`${import.meta.env.VITE_API}/orders/${userId}/userOrders`)
        .then((res) => {
          setUserOrders(res.data);
          //    console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  return (
    <div>
        <h2 style={{display:'flex', justifyContent:'center', margin:'30px', marginTop:'20px'}}>Профиль пользователя: {user.username} </h2>
        {/* <UserProfile/> */}
        {userOrders ? (<ListOfUserOrders userOrders={userOrders} setUserOrders={setUserOrders}/> ) : <h2>Ваша корзина заявок пуста</h2>}
      {/* <ListOfUserOrders userOrders={userOrders} setUserOrders={setUserOrders}/> */}
    </div>
  );
}
