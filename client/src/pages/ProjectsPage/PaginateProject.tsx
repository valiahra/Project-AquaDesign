


export default function PaginationProject({fountainsPerPage, totalFoutains, paginate}) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalFoutains/fountainsPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <div style={{marginLeft:'50%', marginTop:'1%'}}>
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