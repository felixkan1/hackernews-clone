import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { getItem } from '../utils/api'
import Item from './StoryItem'
import { ThemeConsumer } from '../context/theme'
import { Link } from 'react-router-dom'


function CommentsList ({comments}){ 
  //filter for dead comments
  comments = comments.filter(comment => !comment.dead && !comment.deleted)
  //extract the information you need for each comment
  
  
  return(

    <ThemeConsumer>
      {({theme}) => (

          <ul className='comments'>
            {/* map over each comments and display it */}
            {comments.map(comment => {
              const {by, time, text} = comment

              let date = new Date(time*1000)
              date = `${date.toLocaleDateString()}, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`

        
              return(
                <li className='comment' key={comment.id}>
                  <div className={`meta-info-${theme}`}>
                    <span>by <Link
                      to = {{
                        pathname: '/user',
                        search: `?id=${by}`
                      }}      
                    >
                      <button className="username btn-clear">{by}</button>
                    </Link></span>
                    <span> on {date}</span>
                  </div>
                  <div dangerouslySetInnerHTML = {{__html:text}}>
                  
                  </div>


                </li>
              )
            })}
          </ul>
      )}
    </ThemeConsumer>
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
        let {by, descendants, kids, time, title, url, id} = post

        this.setState({
          title: title,
          username: by,
          time: time,
          numComments: descendants,
          href: url,
          id:id
        })
        if(!kids) kids = []
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
    <ThemeConsumer>
      {({theme}) => (

      <div className = 'comment-posts'>
        <div className='commentPG-title'>
          {/* Post title */}
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
        {/* Comments */}
        {comments && <CommentsList comments={comments}/>}
      </div>

      )}
    </ThemeConsumer>

    )
  }
}