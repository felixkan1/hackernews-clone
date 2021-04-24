import React from 'react'
import { getStories } from '../utils/api'
import PropTypes from 'prop-types'
import Item from './StoryItem'
import Nav from './Nav'

export function StoryList ({ stories }) {

  return(
    <ul className = 'posts'>
    {stories.map((story) =>{
      const {by, descendants, time, title, url, id} = story
      
      return(
          <Item
            key={url}
            title={title}
            username={by}
            time={time}
            comments={descendants}
            href={url}
            postID={id}
          />
      )
    })}
  </ul>
 
 
  )
}
 
StoryList.propTypes ={
  stories: PropTypes.array.isRequired
}


export default class Stories extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      selectedCategory: 'Top',
      stories:{},
      error: null
    }

    this.updateCategory = this.updateCategory.bind(this)
  }
  componentDidMount(){
    this.updateCategory(this.state.selectedCategory)
  }

  //pass this to nav as an onclick function on the buttons
  updateCategory (selection) {
    this.setState({
      selectedCategory:selection
    })
    //fetch stories using api
 
      getStories(selection)
        .then(res => Promise.all(res))
        .then(data => {
          this.setState(({stories}) => ({
            stories:{
              ...stories,
              [selection]: data
            }
          }))
        })
        .catch(error => {
          console.warn("Error fetching stories", error)

          this.setState({
            error:'there was an error fetching stories'
          })
        }) 
       
                

  }

  //loading screen

  render() {
    const {selectedCategory, stories, error } = this.state

    return (
      <React.Fragment>
        <Nav
          selected={selectedCategory}
          onUpdateCategory={this.updateCategory}
        />
    
        {/* need to check if stories exist bc of async */}
        {stories[selectedCategory] && <StoryList stories = {stories[selectedCategory]}/>}
        
      </React.Fragment>
    )
  }
}



