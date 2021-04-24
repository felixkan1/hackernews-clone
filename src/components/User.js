import React from 'react';
import { getUser } from '../utils/api'
import queryString from 'query-string'
export default class User extends React.Component{


  constructor(props){
    super(props)

    this.state={
      user: null,
      error:null
    }
  }

  //parse user using component did mount
  componentDidMount() {
    const user = queryString.parse(this.props.location.search).id

    
    this.setState({
      user:user
    })


  }


  render(){
    const {user} = this.state

    return(
      <h1>{user}</h1>
    )
  }

}