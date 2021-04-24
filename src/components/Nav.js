import React from 'react'
import PropTypes from 'prop-types'
export default function Nav({selected, onUpdateCategory}) {
  
  const categories = ['Top', 'New'];

  return (
    <nav className= 'row space-between'>
      <ul className='row nav'>
        {categories.map((category) => (
          <li key={category} className='nav-link'>
            <button 
            className='btn-clear'
            style ={category === selected ? {color:'rgb(187, 46, 31)'} : null}
            onClick={() => onUpdateCategory(category)}
            >
              {category}
            </button>            
          </li>
        ))}
      </ul>
      <button
      style ={{fontSize:30}}
      className='btn-clear nav-link'
    >
      💡
    </button>
    </nav>
  )
}  

Nav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateCategory: PropTypes.func.isRequired
}