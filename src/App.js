import React from 'react';
import './App.css';
import Stories from './components/Stories'
import User from './components/User'
import Post from './components/Post'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route} from 'react-router-dom'


class App extends React.Component {
  render() {
      return (
    
        <Router>
          <Nav/>
          <React.Fragment>
            <Route exact path='/' component={Stories}/> 
            <Route path='/new' component={Stories}/> 
            <Route path='/user' component={User}/>
            <Route path='/post' component={Post} />
          </React.Fragment>
        </Router>
      )
    }
  }

export default App;
