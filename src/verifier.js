import request from 'superagent'
import apiUrl from './apiUrl'

function verifyAnswer (question, answer, token, letter) {
  if (letter === 't') {
    // console.log(apiUrl(`/api/v1/questions/${question}/answers/${answer}`), 'true')
    request
      .patch(apiUrl(`/api/v1/questions/${question}/answers/${answer}`))
      .set('Authorization', 'Bearer ' + token)
      .send(
        {
          'verify_answer': 'true'
        }
      )
      .catch((error) => {
        console.log('Verification error', error.status, error.text)
      })
  } else if (letter === 'f') {
    // console.log(apiUrl(`/api/v1/questions/${question}/answers/${answer}`), 'false')
    request
      .patch(apiUrl(`/api/v1/questions/${question}/answers/${answer}`))
      .set('Authorization', 'Bearer ' + token)
      .send(
        {
          'verify_answer': 'false'
        }
      )
      .catch((error) => {
        console.log('Verification error', error.status, error.text)
      })
  } else { return null }
}

export default verifyAnswer
