import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../context/theme'
const activeStyle ={
  color:'rgb(187,46,31)'
}



export default function Nav() {
  
  const categories = ['Top', 'New'];

  return (
    <ThemeConsumer>
      {({theme, toggleTheme}) =>(
          <nav className= 'row space-between'>
            <ul className='row nav'>
              <li>
                <NavLink
                to='/'
                className='nav-link'
                exact
                activeStyle={activeStyle}
                >

                Top
                </NavLink>
              </li>
              <li>
                <NavLink
                to='/new'
                className='nav-link'
                activeStyle={activeStyle}
                >

                New
                </NavLink>
              </li>

              </ul>
            <button
            style ={{fontSize:30}}
            className='btn-clear nav-link'
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦' : '💡'}      
          </button>
          </nav>
      )}
    </ThemeConsumer>
  )
}  

Nav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateCategory: PropTypes.func.isRequired
}