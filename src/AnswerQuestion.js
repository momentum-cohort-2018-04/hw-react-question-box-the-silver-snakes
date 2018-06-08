import React, { Component } from 'react'
import './App.css'
import request from 'superagent'
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class AnswerQuestion extends Component {
  constructor (props) {
    super()
    this.state = {
      userId: this.props.user_id,
      questionId: this.props.id,
      questionTitle: this.props.title,
      questionContent: this.props.content,
      questionCreateDate: this.props.created_at, // Need to transform into normal date form
      questionImage: this.props.image,
      token: window.localStorage.token,
    }
  }
}

export default AnswerQuestion
