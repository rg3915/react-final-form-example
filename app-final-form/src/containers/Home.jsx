import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';

import TextInput from '../components/TextInput'
import SelectField from '../components/SelectField'


export default Register => {
  const [weekday, setWeekday] = useState([])
  const [dia, setDia] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/weekdays')
      .then(({ data }) => {
        setWeekday(data)
      })
  }, [])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const onSubmit = async values => {
    await sleep(300)
    console.table(values);
  }

  const validate = () => {
    //code here
  }

  const retornaDiaSemana = value => {
    // value é o dia
    const diaSemana = weekday.find(d => d.value == value)
    setDia(diaSemana.text)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <h2>Simple Default Input</h2>
                <div>
                  <Field name="firstName" component="input" placeholder="First Name" />

                  <br/>
                  <br/>

                  <Field
                    name="weekday"
                    component="select"
                  >
                    {weekday.map(item => 
                      <option key={item.value} value={item.value}>{ item.text }</option>
                    )}
                  </Field>
                  <OnChange name="weekday">
                    {(value, previous) => {
                      retornaDiaSemana(value)
                    }}
                  </OnChange>

                  <p>Dia da semana: { dia }</p>
                </div>

                <h2>Custom Input Component</h2>

                <TextInput name="name" placeholder="Name" />
                <TextInput name="phrase" placeholder="Type a phrase" />
                <TextInput name="email" type="email" label="email" placeholder="E-mail" />
                <TextInput name="comment" type="textarea" placeholder="Type a comment..." />

                <SelectField name="customWeekday">
                  {weekday.map(item => 
                    <option key={item.value} value={item.value}>{ item.text }</option>
                  )}
                </SelectField>

                <Button type="submit" variant="primary">Salvar</Button>
              </form>
            )}
          />
        </Col>
      </Row>
    </Container>
  )
}