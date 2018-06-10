import React, {Component} from 'react'
import request from 'superagent'
import {MediaObject, MediaObjectSection, Thumbnail, Button} from 'react-foundation'
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom'
import moment from 'moment'
import db from './db'

import './foundation.css'
import PostQuestion from './PostQuestion'

class Questions extends Component {
  constructor (props) {
    super()
    this.state = {
      token: window.localStorage.token ? window.localStorage.token : 'm',
      questions: db,
      cancelSubmit: false
    }
    // this.getQuestions()
  }

  getQuestions () {
    request
      .get('localhost:3000/api/v1/questions')
      .then((response) => {
        console.log('first response', response)
        if (response.status === 200) {
          console.log(response)
          this.setState({questions: response.questions})
          console.log(response.questions)
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
      const image = entry.image
      const user = entry.userName
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
              <p className='text-right question-info' id={userid}><small>asked by user</small> {user}</p>
              {long && <p className='question-content'>{shortForm} ...</p>}
              {!long && <p className='question-content'>{content}</p>}
            </MediaObjectSection>
          </MediaObject>
        </div>)
    })
    return (
      <div className='main'>

        <Route exact path='/' render={() =>

          <React.Fragment>
            <div className='title'><h1>Free For All~</h1></div>
            <div className='text-center'>
              {this.state.token && <Link to='/add'><Button className='button'>Add Question</Button></Link>}
              {!this.state.token && 'Login to be able to ask Questions'}</div>
            <div className='questionsAll'>{questionList}</div>
          </React.Fragment>
        } />
        <Route path='/add' render={({history}) => <PostQuestion history={history} />} />
      </div>
    )
  }
}

export default Questions
