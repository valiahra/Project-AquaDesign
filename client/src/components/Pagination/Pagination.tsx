import React from 'react'


export default function Paginationn({fountainsPerPage, totalFoutains, paginate}) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalFoutains/fountainsPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <div style={{marginTop:'1%',justifyContent:'center'}}>
      <ul className='pagination'>
        {pageNumbers.map(number => (
            <li className='page-item' key={number} >
                <a href='#' className='page-link' onClick={() => paginate(number)}>{number}</a>
            </li>
        ))}
      </ul>
    </div>
  )
}
// justify-content: center;
// align-items: center;