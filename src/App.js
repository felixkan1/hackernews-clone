import React from 'react';
import './App.css';
import Stories from './components/Stories'
import User from './components/User'
import Post from './components/Post'
import Nav from './components/Nav'
import { ThemeProvider } from './context/theme'
import { BrowserRouter as Router, Route} from 'react-router-dom'


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      theme: 'light',

      toggleTheme: () => {
        this.setState(({theme}) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }

      

    }
  }


  render() {
      return (
    
        <Router>
          <ThemeProvider value={this.state}>
            <div className = {this.state.theme}>
              <div className = 'container'>
                <Nav/>
                <React.Fragment>
                  <Route exact path='/' component={Stories}/> 
                  <Route path='/new' component={Stories}/> 
                  <Route path='/user' component={User}/>
                  <Route path='/post' component={Post} />
                </React.Fragment>
              </div>
            </div>
          </ThemeProvider>
        </Router>
      )
    }
  }

export default App;
