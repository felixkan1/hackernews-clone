import React from 'react'


function Nav() {
  
  return (
    <nav className= 'row space-between'>
      <ul className='row nav'>
        <li className='nav-link'>
          <button className='btn-clear'>
            Top
          </button>
        </li>
        <li className='nav-link'>
          <button className='btn-clear'>
            New
          </button>
          </li>
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

//Story List - function
// input: stories (array), output: list of 30 stories




//class component: stories 


export default class Stories extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      selectedStories: 'Top',
      error: null
    }
  }

  //pass this to nav as an onclick function on the buttons
  updateSelectedStories (selection) {
    this.setState({
      selectedStories:selection
    })
  }

  //get the stories using api.js



  //loading screen

  render() {
    return (
      <React.Fragment>
        <Nav/>
      </React.Fragment>
    )
  }



}



