import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { getItem } from '../utils/api'
import Item from './StoryItem'
import { Link } from 'react-router-dom'


function CommentsList ({comments}){ 
  //filter for dead comments
  console.log(comments)
  comments = comments.filter(comment => !comment.dead && !comment.deleted)
  //extract the information you need for each comment
  
  
  return(
    <ul className='comments'>
      {/* map over each comments and display it */}
      {comments.map(comment => {
        const {by, time, text} = comment

        let date = new Date(time*1000)
        date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  
        return(
          <li className='comment' key={comment.id}>
            <div className='comment-author'>
              <span>by <Link
                to = {{
                  pathname: '/user',
                  search: `?id=${by}`
                }}      
              >
              {by}
              </Link></span>
              <span> on {date}</span>
            </div>
            <div dangerouslySetInnerHTML = {{__html:text}}>
            
            </div>


          </li>
        )
      })}
    </ul>
  )

}




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
      id: null,
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
          href: url,
          id:id
        })

        //turn descendants(comment number) into comments
        Promise.all(kids.map(getItem))
          .then(comments => {
            this.setState({
              comments:comments
            })
          })


      })
  }

  render(){
    
    const {title, username, time, numComments, href, id, comments} = this.state
   

    return(
    <React.Fragment>
    {/* Post title */}
    <div className = 'comment-posts'>
      <Item 
        key={href}
        title={title}
        username={username}
        time={time}
        comments={numComments}
        href={href}
        postID={id}
      />
      {/* Comments */}
      {comments && <CommentsList comments={comments}/>}
    </div>
        
    </React.Fragment>  
    )
  }



}