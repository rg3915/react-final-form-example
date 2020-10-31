import React from 'react'
import { Form, Field } from 'react-final-form'
import Container from 'react-bootstrap/Container';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  console.log(values);
}

const validate = () => {
  //code here
}

export default Register => {
  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2>Simple Default Input</h2>
            <div>
              <label>First Name</label>
              <Field name="firstName" component="input" placeholder="First Name" />
            </div>

            <h2>Reusable Input Component</h2>

            <button type="submit">Submit</button>
          </form>
        )
        }
      />
    </Container>
  )
}