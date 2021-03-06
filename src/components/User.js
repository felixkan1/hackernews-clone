import React from 'react';
import { getUser, getItem } from '../utils/api'
import { StoryList } from './Stories'
import queryString from 'query-string'
import Loading from './Loading'



function getStories(posts){
  return posts.map(post =>{
    return getItem(post.id)
  })

}
export default class User extends React.Component{


  constructor(props){
    super(props)

    this.state={
      created: null,
      user: null,
      karma:null,
      about: null, 
      submitted: null,
      error: null,
      loading: true
    }
  }

  
 

  //parse user using component did mount
  componentDidMount() {
    const user = queryString.parse(this.props.location.search).id

    this.setState({
      user:user
    })

    //get posts
    getUser(user)
      .then(res => {
        const{created, id, karma, about, submitted} = res
        const topSubmitted = submitted.slice(0,30)

        //convert unix time to date time
        let date = new Date(created*1000)
        date = `${date.toLocaleDateString()}, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
        

        this.setState({
          created:date,
          user: id,
          karma:karma,
          about: about,
        })
       
        //get all of the users posts
        Promise.all(topSubmitted.map(getItem))
          //filter by story
          .then(posts => {
              posts = posts.filter( post => (post.type === "story" ))
              //posts is an array of objects of ther users posts
              
              Promise.all(getStories(posts))
                .then(story => this.setState({
                  submitted: story,
                  loading: false
                }))
            })



      })

  }


  render(){
    const {created, user, karma, about, submitted,loading} = this.state

    return(
    
    <React.Fragment>
    {loading && <Loading/>}
     {!loading &&
     <div className ='userpage'>
        <div>
          <h1>{user}</h1>
          <div>
            joined {created} has <strong>{karma}</strong> karma
          </div>
          <br></br>
          <div dangerouslySetInnerHTML={{__html:about}}></div>
        </div>
        <h2>Posts</h2>
        {submitted && <StoryList stories = {submitted}/>}
     </div>
       
     }
    </React.Fragment>
  
    )
  }

}