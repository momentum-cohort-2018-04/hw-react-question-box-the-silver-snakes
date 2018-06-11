import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Button, Welcome } from '@storybook/react/demo'

import PostAQuestion from '../PostQuestion'
import '../App.css'
import Questions from '../Questions'
import IndividualQuestionAndAnswers from '../IndividualQuestionAndAnswers'
import PostAnswer from '../PostAnswer'
import Login from '../Login'
import Register from '../Register'
// import dbOne from '../dbOne'
import dbAll from '../db-allQ'
import LastQuestion from '../LastQuestion'
// import UserQuestions from './UserQuestions'

const fakeHistory = {
  push: (url) => console.log('pushed', url),
  goBack: () => console.log('go back'),
  location: {
    pathname: '/questions/12'
  }
}

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role='img' aria-label='so cool'>
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('PostQuestion', module)
  .add('with text', () => <PostAQuestion history={fakeHistory} />)

storiesOf('PostAnswer', module)
  .add('simpleRender', () => <PostAnswer questionId='2' history={fakeHistory} />)

storiesOf('Questions', module)
  .add('simpleRender', () => <Questions />)

storiesOf('IndividualQuestionsAndAnswers', module)
  .add('simpleRender', () => <IndividualQuestionAndAnswers history={fakeHistory} questions={dbAll.questions} />)

storiesOf('BaseLogin', module)
  .add('simpleRender', () => <Login />)

storiesOf('Register', module)
  .add('simpleRender', () => <Register />)

storiesOf('LastQuestion', module)
  .add('simpleRender', () => <LastQuestion questionid='1' />)

// storiesOf('UserQuestions', module)
//   .add('simpleRender', () => <UserQuestions userid='1' />)
