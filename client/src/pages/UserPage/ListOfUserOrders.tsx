import React from 'react'
import UserOrderCard from './UserOrderCard'

export default function ListOfUserOrders({userOrders, setUserOrders}) {
  return (
    <div>
       {userOrders.length
        ? userOrders.map((el) => (
            <UserOrderCard key={el.id} userOrder={el} setUserOrders={setUserOrders} userOrders={userOrders} />
          ))
        : null}
    </div>
  )
}
