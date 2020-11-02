import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Form, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';


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
    axios.get('http://localhost:3000/alimentacao')
      .then(({ data }) => {
        setAlimentacaoDe(data)
        setAlimentacaoPara(data)
      })
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

  const mudaRefeicao = (motivoNome, periodoNome, change, refeicao, lanche) => {
    if (motivoNome === 'Refeição por lanche') {
      change(`${periodoNome}.alimentacao_de`, refeicao.uuid)
      change(`${periodoNome}.alimentacao_para`, lanche.uuid)
    }
    else if (motivoNome === 'Lanche por refeição') {
      change(`${periodoNome}.alimentacao_de`, lanche.uuid)
      change(`${periodoNome}.alimentacao_para`, refeicao.uuid)
    }
  }

  const onChangeMotivo = (uuidMotivo, change, formValues) => {
    const motivo = motivos.find(d => d.uuid === uuidMotivo)
    const refeicao = alimentacaoDe.find(v => v.nome === 'Refeição')
    const lanche = alimentacaoDe.find(v => v.nome === 'Lanche')

    for (let periodo of periodos) {
      const periodoChecado = formValues[periodo.nome]
      if (periodoChecado) {
        mudaRefeicao(motivo.nome, periodo.nome, change, refeicao, lanche)
      }
    }

  }

  const onChangeCheckboxPeriodo = (periodoChecado, periodoNome, change, formValues) => {

    if (!periodoChecado) return

    const motivo = motivos.find(d => d.uuid === formValues.motivo)

    if (!motivo) return

    const refeicao = alimentacaoDe.find(v => v.nome === 'Refeição')
    const lanche = alimentacaoDe.find(v => v.nome === 'Lanche')

    mudaRefeicao(motivo.nome, periodoNome, change, refeicao, lanche)
  }

  const deveDesabilitarSeletorDeAlimentacao = (periodoNome, formValues) => {
    const periodoChecado = formValues[periodoNome]
    if (!periodoChecado) return true

    const motivoSelecionado = motivos.find(d => d.uuid === formValues.motivo)

    if (motivoSelecionado === undefined) return false

    if (
      motivoSelecionado.nome === 'Refeição por lanche' ||
      motivoSelecionado.nome === 'Lanche por refeição'
    ) {
      return true
    }
    return false
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
                <pre style={{color: "white"}}>{JSON.stringify(values, null, 4)}</pre>
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
                      onChangeMotivo(valueMotivo, form.change, values)
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
                            onChangeCheckboxPeriodo(valueCheckboxPeriodo, periodo.nome, form.change, values)
                          }}
                        </OnChange>
                        {periodo.nome}

                        <Field
                          name={`${periodo.nome}.alimentacao_de`}
                          component="select"
                          disabled={deveDesabilitarSeletorDeAlimentacao(periodo.nome, values)}
                        >
                          {alimentacaoDe.map(item => 
                            <option key={item.uuid} value={item.uuid}>{ item.nome }</option>
                          )}
                        </Field>

                        <Field
                          name={`${periodo.nome}.alimentacao_para`}
                          component="select"
                          disabled={deveDesabilitarSeletorDeAlimentacao(periodo.nome, values)}
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