import React from 'react'
import OrderCard from './OrderCard'

export default function ListOfOrders({orders, setOrders,}) {
  return (
    <div>
       {orders.length
        ? orders.map((el) => (
            <OrderCard key={el.id} order={el} setOrders={setOrders}  />
          ))
        : <h2>Заказов в этом статусе нет</h2>}
    </div>
  )
}
