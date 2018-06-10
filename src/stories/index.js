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
// import LastQuestion from './LastQuestion'
// import UserQuestions from './UserQuestions'

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
  .add('with text', () => <PostAQuestion />)

storiesOf('PostAnswer', module)
  .add('simpleRender', () => <PostAnswer questionId='2' />)

storiesOf('Questions', module)
  .add('simpleRender', () => <Questions />)

storiesOf('IndividualQuestionsAndAnswers', module)
  .add('simpleRender', () => <IndividualQuestionAndAnswers user_id='24' id='4' title='AHHHHH' content='AKSJDHAKJSHDKA' created_at='05 18 2009' image='' />)

storiesOf('BaseLogin', module)
  .add('simpleRender', () => <Login />)

storiesOf('Register', module)
  .add('simpleRender', () => <Register />)

// storiesOf('LastQuestion', module)
//   .add('simpleRender', () => <LastQuestion questionid='1' />)

// storiesOf('UserQuestions', module)
//   .add('simpleRender', () => <UserQuestions userid='1' />)
