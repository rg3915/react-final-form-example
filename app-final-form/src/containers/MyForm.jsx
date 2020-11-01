import React, { useState, useEffect, Fragment } from 'react'
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
  const [motivos, setMotivos] = useState([])
  const [motivo, setMotivo] = useState('')
  const [alimentacaoDe, setAlimentacaoDe] = useState([])
  const [alimentacaoPara, setAlimentacaoPara] = useState([])
  const [periodos, setPeriodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/motivos')
      .then(({ data }) => {
        setMotivos(data)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/alimentacao')
      .then(({ data }) => {
        setAlimentacaoDe(data)
        setAlimentacaoPara(data)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/periodo')
      .then(({ data }) => {
        setPeriodos(data)
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

  const trocarRefeicao = (periodoChecado, change, formValues) => {
    const motivo = motivos.find(d => d.uuid == formValues.motivo)

    if (motivo.nome === 'Refeição por lanche') {
      console.log(motivo.nome);
      change('MANHA.alimentacao_de', 'r01l22')
      change('MANHA.alimentacao_para', 'l03r44')
      change('TARDE.alimentacao_de', 'r01l22')
      change('TARDE.alimentacao_para', 'l03r44')
    }

  }

  return (
    <Container>
      <Row>
        <Col>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, values, form }) => (
              <form onSubmit={handleSubmit}>
                <h2>Simple Default Input</h2>
                <div>
                  <Field
                    name="motivo"
                    component="select"
                  >
                    {motivos.map(item => 
                      <option key={item.uuid} value={item.uuid}>{ item.nome }</option>
                    )}
                  </Field>

                  <p>motivo: { motivo }</p>

                  {periodos.map((periodo) => {
                    return (
                      <Fragment key={periodo.uuid}>
                        <Field
                          name={periodo.nome}
                          component="input"
                          type="checkbox"
                        >
                        </Field>
                        <OnChange name={periodo.nome}>
                          {(valueCheckboxPeriodo, previous) => {
                            trocarRefeicao(valueCheckboxPeriodo, form.change, values)
                          }}
                        </OnChange>
                        {periodo.nome}

                        <Field
                          name={`${periodo.nome}.alimentacao_de`}
                          component="select"
                        >
                          {alimentacaoDe.map(item => 
                            <option key={item.uuid} value={item.uuid}>{ item.nome }</option>
                          )}
                        </Field>

                        <Field
                          name={`${periodo.nome}.alimentacao_para`}
                          component="select"
                        >
                          {alimentacaoPara.map(item => 
                            <option key={item.uuid} value={item.uuid}>{ item.nome }</option>
                          )}
                        </Field>
                        <br/>
                      </Fragment>
                    )
                  })}

                </div>

                <Button type="submit" variant="primary">Salvar</Button>
              </form>
            )}
          />
        </Col>
      </Row>
    </Container>
  )
}