import React, {Component} from 'react'
// import request from 'superagent'
import db from './db'

class Questions extends Component {
  constructor (props) {
    super()
    this.state = {
      token: window.localStorage.token,
      question: db
    }
  }

  componentDidMount () {
    this.getQuestions()
  }

  getQuestions () {
    this.setState({question: db})
    // request
  //     .get('api/v1/questions')
  //     .head(`Bearer ${this.state.token}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         this.setState({question: db})
  //         // this.setState({question: response.questions})
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.status)
  //     })
  }

  render () {
    console.log(this.state.question)
    const fuck = this.state.question.map((entry, index) => {
      const id = entry.id
      const title = entry.title
      const content = entry.content
      const image = entry.images
      const user = entry.user
      // console.log(id, title, content, image, user)
      return (
        <div className='preview_question red' key={index} id={id}>
          <div className='question_title yellow'>
            <h2>{title}</h2>
          </div>
          <div className='question_user green'>User Number {user}</div>
          <div className='question-split blue '>
            <div className='question_content purple'>
              <p>{content}</p>
            </div>
            {image && <div className='question_image purple'><img src={image} /></div>}
          </div>

        </div>)
    })
    return (
      <div className='main'>
        <div className='title'><h1>Free For All~</h1></div>
        <div className='button'>Add Question goes here</div>
        <div className='archive'>{fuck}</div>
      </div>
    )
  }
}

export default Questions
