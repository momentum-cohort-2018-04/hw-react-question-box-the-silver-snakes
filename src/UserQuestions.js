import React, {Component} from 'react'
import request from 'superagent'
import {MediaObject, MediaObjectSection, Thumbnail} from 'react-foundation'
import moment from 'moment'
import apiUrl from './apiUrl'

import './foundation.css'
import './App.css'

class UserQuestions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : '',
      questions: [],
      id: window.localStorage.user ? window.localStorage.user : ''
    }
    this.getQuestions()
  }

  componentDidMount () {
    this.setState({
      token: window.localStorage.token ? window.localStorage.token : '',
      id: window.localStorage.user ? window.localStorage.user : ''
    })
  }

  getQuestions () {
    console.log(this.state.id)
    request
      .get(apiUrl(`/api/v1/users/${this.state.id}`))
      .set('Authorization', 'Bearer ' + this.state.token)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          this.setState({questions: response.body})
        }
      })
      .catch((error) => {
        console.log('get Questions error', error.status)
      })
  }

  renderQuestions () {
    const final = this.state.questions.map((entry, index) => {
      const updated = moment(entry.updated_at).fromNow()
      const created = moment(entry.created_at).format('MMM Do YYYY')
      const title = entry.title
      const content = entry.content
      let shortForm
      let long
      if (content.length > 300) {
        long = true
        shortForm = content.slice(0, 300)
      } else { long = false }

      let image = entry.image
      if (image === 'image' || !image) {
        image = 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI3OTQ0fQ&s=1c03ebe02c8706d5cabccd3657f80559'
      }

      const id = entry.id

      return (
        <div className='question-each' key={index} id={id}>
          <MediaObject stackForSmall>
            <MediaObjectSection isMiddle>
              {image && <Thumbnail className='question-preview-img' src={image} />}
            </MediaObjectSection>
            <MediaObjectSection isMiddle>
              <h5 className='question-title'>{title}</h5>
              <p className='text-left question-info'>Posted on <strong>{created}</strong>, last updated<strong> {updated}</strong></p>
              {/* <p className='text-right question-info' id={userid}><small>asked by user</small> {user}</p> */}
              {long && <p className='question-content'>{shortForm} ...</p>}
              {!long && <p className='question-content'>{content}</p>}
            </MediaObjectSection>
          </MediaObject>
        </div>)
    })
    console.log(final)
    console.log(this.state.questions)
    return final
  }

  render () {
    return (
      <div className='main'>
        <div className='title'><h1>Your Questions</h1></div>
        <div className='text-center'>
          <div className='questionsAll'>{this.state.questions && this.state.questions.length > 0 && this.renderQuestions()}</div>
        </div>
      </div>
    )
  }
}

export default UserQuestions
