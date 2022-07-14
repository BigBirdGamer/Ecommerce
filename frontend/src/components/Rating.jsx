import React from 'react'

function Rating({value,text}) {
  return (
    <div className='rating'>
        <span>{text ? text : ''}</span>
    </div>
  )
}

export default Rating