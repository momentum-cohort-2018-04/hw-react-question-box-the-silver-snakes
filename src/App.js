import React, { Component } from 'react'
import './App.css'
import Questions from './Questions'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
          <Questions />
        </p>
      </div>
    )
  }
}

export default App
