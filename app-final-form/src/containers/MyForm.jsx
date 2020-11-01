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

  const atualizaRefeicao = (valueMotivo, change, formValues) => {
    const motivo = motivos.find(d => d.uuid == valueMotivo)
    const refeicao = alimentacaoDe.find(v => v.nome === 'Refeição')
    const lanche = alimentacaoDe.find(v => v.nome === 'Lanche')

    for (let periodo of periodos) {
      if (formValues[periodo.nome]) {
        if (motivo.nome === 'Refeição por lanche') {
          change(`${periodo.nome}.alimentacao_de`, refeicao.uuid)
          change(`${periodo.nome}.alimentacao_para`, lanche.uuid)
        }
        if (motivo.nome === 'Lanche por refeição') {
          change(`${periodo.nome}.alimentacao_de`, lanche.uuid)
          change(`${periodo.nome}.alimentacao_para`, refeicao.uuid)
        }
      }
    }

  }

  const trocarRefeicao = (periodoChecado, periodoNome, change, formValues) => {
    if (!periodoChecado) return

    const motivo = motivos.find(d => d.uuid == formValues.motivo)
    const refeicao = alimentacaoDe.find(v => v.nome === 'Refeição')
    const lanche = alimentacaoDe.find(v => v.nome === 'Lanche')

    if (!motivo) return

    if (motivo.nome === 'Refeição por lanche') {
      change(`${periodoNome}.alimentacao_de`, refeicao.uuid)
      change(`${periodoNome}.alimentacao_para`, lanche.uuid)
    }
    if (motivo.nome === 'Lanche por refeição') {
      change(`${periodoNome}.alimentacao_de`, lanche.uuid)
      change(`${periodoNome}.alimentacao_para`, refeicao.uuid)
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
                  <OnChange name="motivo">
                    {(valueMotivo) => {
                      atualizaRefeicao(valueMotivo, form.change, values)
                    }}
                  </OnChange>

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
                            trocarRefeicao(valueCheckboxPeriodo, periodo.nome, form.change, values)
                          }}
                        </OnChange>
                        {periodo.nome}

                        <Field
                          name={`${periodo.nome}.alimentacao_de`}
                          component="select"
                          disabled={false}
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