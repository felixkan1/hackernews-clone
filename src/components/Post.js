import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { getItem } from '../utils/api'
import Item from './StoryItem'

export default class Post extends React.Component{
  
  constructor(props){
    super(props)

    this.state = {
      title: null,
      username: null,
      time: null,
      numComments: null,
      comments: null,
      href: null,
      id: null
    }
  }


  componentDidMount(){
    const post = queryString.parse(this.props.location.search).id
    this.setState({postId:post})

    

    getItem(post)
      .then(post => {
        const {by, descendants, kids, time, title, url, id} = post

      
        this.setState({
          title: title,
          username: by,
          time: time,
          numComments: descendants,
          comments: kids,
          href: url,
          id:id
        })

      })
  }

  render(){
    
    const {title, username, time, numComments, href, id} = this.state
   

    return(
    <React.Fragment>

    <div className = 'post'>
      <Item 
        key={href}
        title={title}
        username={username}
        time={time}
        comments={numComments}
        href={href}
        postID={id}
      />
    </div>
        
    </React.Fragment>  
    )
  }



}