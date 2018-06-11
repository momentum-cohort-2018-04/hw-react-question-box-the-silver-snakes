import React, {Component} from 'react'
import request from 'superagent'
import {MediaObject, MediaObjectSection, Thumbnail, Button} from 'react-foundation'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import moment from 'moment'
import apiUrl from './apiUrl'

import './foundation.css'
import './App.css'

class Questions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      questions: []
    }
  }
  componentDidMount () {
    this.getQuestions()
  }
  getQuestions () {
    request
      .get(apiUrl('/api/v1/questions'))
      .then((response) => {
        // console.log('first response', response)
        if (response.status === 200) {
          this.setState({questions: response.body.questions})
        }
      })
      .catch((error) => {
        console.log('get Questions error', error.status)
      })
  }

  render () {
    const questionList = this.state.questions.map((entry, index) => {
      const userid = entry.userID
      const updated = moment(entry.updated_at).fromNow()
      const created = moment(entry.created_at).format('MMM Do YYYY')
      const title = entry.title
      const content = entry.content
      let image = entry.image
      if (image === 'image') {
        image = 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI3OTQ0fQ&s=1c03ebe02c8706d5cabccd3657f80559'
      }
      const user = entry.username
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
              <Link to={`questions/${id}`}>
                {image && <Thumbnail className='question-preview-img' src={image} alt='unknown' />}
              </Link>
            </MediaObjectSection>

            <MediaObjectSection isMiddle>
              <h5 className='question-title'>{title}</h5>
              <p id={userid} className='text-left question-info'>Posted by<strong> {user} </strong> on <strong>{created}</strong>, last updated<strong> {updated}</strong></p>
              {long && <p className='question-content'>{shortForm} ...</p>}
              {!long && <p className='question-content'>{content}</p>}
            </MediaObjectSection>
          </MediaObject>
        </div>)
    })
    return (
      <div className='main'>
        <div className='title'><h1>What is This <img className='title-logo' src='https://tinyurl.com/yb7ek22r' alt='logo' /></h1></div>
        <div className='text-center'>
          {this.state.token && <Link to='/add'><Button className='button ask-button'>Ask A Question</Button></Link>}
          {!this.state.token && 'Login to ask and answer questions'}</div>
        <div className='questionsAll'>{questionList}</div>
      </div>
    )
  }
}

export default Questions
