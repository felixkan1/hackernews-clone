import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../context/theme'



export default function Item ({title, username, time, comments, href}){

  if(!comments)comments = 0


  //convert time to MM/DD/YY, HH:MM (AM/PM)
  let date = new Date(time*1000)
  date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  
 

  return (
   <li className ='post' >
     <a className= 'link' href={`${href}`}>{title}</a>
     <div>
      <span>by <a className="username" href ={`${href}`}>{username}</a></span>
      <span> {date} </span>
      <span><a className='comments' href='123'>  {comments} </a>comments</span>

     </div>

   </li>
  )


}

Item.propTypes ={
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  comments: PropTypes.number,
  href: PropTypes.string.isRequired
}