import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../context/theme'
import { Link } from 'react-router-dom'


export default function Item ({title, username, time, comments, href, postID}){

  if(!comments)comments = 0


  //convert time to MM/DD/YY, HH:MM (AM/PM)
  let date = new Date(time*1000)
  date = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`

  
 

  return (

    <ThemeConsumer>
      {({theme, toggleTheme}) => (
      <li className ='post' >
          <a className = {`link-${theme}`} href={`${href}`}>{title}</a>
          {/* Post meta info */}
          <div className ={`meta-info-${theme}`}>
            
            <span>by <Link
              to={{
                pathname:'/user',
                search: `?id=${username}`
              }}
            >
            
            <button className="btn-clear">{username}</button>
            </Link>
            
            </span>
            <span> {date} with  </span>
            <span>
            <Link
              to={{
                pathname:'/post',
                search: `?id=${postID}`
              }}
            >
            
            <button className="username btn-clear">{comments} </button>
            </Link>
            &nbsp;comments
            </span>

          </div>

      </li>
      )}
    </ThemeConsumer>
  )
}

Item.propTypes ={
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  comments: PropTypes.number,
  href: PropTypes.string.isRequired
}