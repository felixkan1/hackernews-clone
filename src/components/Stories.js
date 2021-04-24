import React from 'react'
import { getStories } from '../utils/api'


function Nav({selected, onUpdateCategory}) {
  
  const categories = ['Top', 'New'];

  return (
    <nav className= 'row space-between'>
      <ul className='row nav'>
        {categories.map((category) => (
          <li key={category} className='nav-link'>
            <button 
            className='btn-clear'
            style ={category === selected ? {color:'red'} : null}
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
    
    //     <li className='nav-link'>
    //       <button className='btn-clear'>
    //         Top
    //       </button>
    //     </li>
    //     <li className='nav-link'>
    //       <button 
    //       className='btn-clear'
          
    //       >
    //         New
    //       </button>
    //       </li>
    //   </ul>
    //   <button
    //   style ={{fontSize:30}}
    //   className='btn-clear nav-link'
    // >
    //   💡
    // </button>
   


//Story List - function
// input: stories (array), output: list of 30 stories




//class component: stories 


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
    const {selectedCategory, error } = this.state

    return (
      <React.Fragment>
        <Nav
          selected={selectedCategory}
          onUpdateCategory={this.updateCategory}
        />
      </React.Fragment>
    )
  }



}



