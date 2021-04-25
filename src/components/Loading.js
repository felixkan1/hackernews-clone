import React from "react"
import PropTypes from 'prop-types'


const styles = {
  content:{
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}


export default class Loading extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      content: this.props.text
    }
  }

  //Loading ... animation
  componentDidMount() {
    const { speed, text } = this.props

    this.interval = window.setInterval(() => {
      this.state.content === text + '...'?
      this.setState({content: text}):
      this.setState(({content}) => ({content: content + '.'}))
    }, speed)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render(){
    const {content} = this.state

    return(
    <h1 style={styles.content} >{content}</h1>
    )
  }
}

Loading.propTypes = {
  text:PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
