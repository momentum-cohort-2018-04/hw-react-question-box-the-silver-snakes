import React, {Component} from 'react'
// import request from 'superagent'
import {MediaObject, MediaObjectSection, Thumbnail} from 'react-foundation'
import moment from 'moment'
import db from './db'
import './foundation.css'

class UserQuestions extends Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      questions: db,
      id: this.props.userid
    }
  }

  componentDidMount () {
    this.getQuestions()
  }

  getQuestions () {
    this.setState({question: db})
    // request
    //   .get(`localhost:3000/api/v1/users/${this.state.id}`)
    //   .set('Authorization', 'Bearer ' + this.state.token)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       // this.setState({questions: response.questions})
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('get Questions error', error.status)
    //   })
  }

  render () {
    console.log(this.state.questions)
    const questionList = this.state.questions.map((entry, index) => {
      const updated = moment(entry.updated_at).fromNow()
      const created = moment(entry.created_at).format('MMM Do YYYY')
      const title = entry.title
      const content = entry.content
      const image = entry.image
      const id = entry.id
      let shortForm
      let long
      if (content.length > 300) {
        long = true
        shortForm = content.slice(0, 300)
      } else { long = false }
      return (
        <div className='question-each' key={index} id={id}>
          <MediaObject stackForSmall>
            <MediaObjectSection isMiddle>
              {image && <Thumbnail className='question-preview-img' src={image} />}
            </MediaObjectSection>
            <MediaObjectSection isMiddle>
              <h5 className='question-title'>{title}</h5>
              <p className='text-left question-info'>Created {created} <small>Last updated: {updated}</small></p>
              {long && <p className='question-content'>{shortForm} ...</p>}
              {!long && <p className='question-content'>{content}</p>}
            </MediaObjectSection>
          </MediaObject>
        </div>)
    })
    return (
      <div className='main'>
        <div className='title'><h1>Your Questions</h1></div>
        <div className='text-center'>
          <div className='questionsAll'>{questionList}</div>
        </div>
      </div>
    )
  }
}

export default UserQuestions
