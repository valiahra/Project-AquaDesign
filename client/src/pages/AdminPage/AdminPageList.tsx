import React from 'react'
import AdminPageCard from './AdminPageCard'


export default function AdminPageList({fountains, setFountains}) {
  return (
    <div>
       {fountains.length
        ? fountains.map((el) => (
            <AdminPageCard key={el.id} fountain={el} setFountains={setFountains}  />
          ))
        : null}
    </div>
  )
}
