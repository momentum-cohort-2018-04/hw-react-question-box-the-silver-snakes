import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import PostAQuestion from '../PostQuestion'
import '../App.css'
import Questions from '../Questions'
// import IndividualQuestionAndAnswers from '../IndividualQuestionAndAnswers'
import PostAnswer from '../PostAnswer'
import Login from '../Login'

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

storiesOf('Questions', module)
  .add('simpleRender', () => <Questions />)

// storiesOf('IndividualQuestionsAndAnswers', module)
//   .add('simpleRender', () => <IndividualQuestionAndAnswers />)
storiesOf('BaseLogin', module)
  .add('simpleRender', () => <Login />)

storiesOf('PostAnswer', module)
  .add('simpleRender', () => <PostAnswer />)
