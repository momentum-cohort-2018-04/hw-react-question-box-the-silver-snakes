import React, {Component} from 'react'
// import request from 'superagent'
import Foundation, {MediaObject, MediaObjectSection, Thumbnail} from 'react-foundation'
import db from './db'

class Questions extends Component {
  constructor (props) {
    super()
    this.state = {
      token: window.localStorage.token,
      questions: db
    }
  }

  componentDidMount () {
    this.getQuestions()
  }

  getQuestions () {
    this.setState({question: db})
    // request
  //     .get('api/v1/questions')
  //     .set('Authorization', 'Bearer ' + this.state.token)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         this.setState({questions: db})
  //         // this.setState({questions: response.questions})
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.status)
  //     })
  }

  render () {
    console.log(this.state.questions)
    const fuck = this.state.questions.map((entry, index) => {
      const id = entry.id
      const title = entry.title
      const content = entry.content
      const image = entry.images
      const user = entry.user
      // console.log(id, title, content, image, user)
      return (
        <div className='media-object-stack-example' key={index} id={id}>
          <MediaObject stackForSmall>
            <MediaObjectSection isMiddle>
              {image && <Thumbnail src={image} className='better' />}
            </MediaObjectSection>
            <MediaObjectSection isMain>
              <h3>{title}</h3>
              <h5>User Number {user}</h5>
              <p>{content}</p>
            </MediaObjectSection>
          </MediaObject>
        </div>)
    })
    return (
      <div className='main'>
        <div className='title'><h1>Free For All~</h1></div>
        <div className='button'>Add Question goes here</div>
        {fuck}
      </div>
    )
  }
}

export default Questions
