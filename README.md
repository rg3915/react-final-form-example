# react-final-form-example

Learning react-final-form

https://final-form.org/react

https://gist.github.com/rg3915/02996d64153cce080c1ea0aa824a2d6b

https://www.youtube.com/watch?v=417q1H3g5Ug

## Rodando o projeto

```
git clone https://github.com/rg3915/react-final-form-example.git
cd react-final-form-example
npm install
npm run serve
```


## json-server

```
npm install -g json-server
```

```
cat << EOF > db.json
{
  "weekdays": [
    { "value": 1, "text": "Domingo" },
    { "value": 2, "text": "Segunda" },
    { "value": 3, "text": "Terça" },
    { "value": 4, "text": "Quarta" },
    { "value": 5, "text": "Quinta" },
    { "value": 6, "text": "Sexta" },
    { "value": 7, "text": "Sábado" }
  ]
}
EOF
```

Inicie o Json Server

```
json-server --watch db.json
```


## React Final Form

```
create-react-app app-final-form
cd app-final-form

npm install --save final-form react-final-form
npm install --save axios bootstrap react-bootstrap
```

```
cd src
mkdir containers
touch containers/Home.jsx
```

```js
cat << EOF > containers/Home.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Field } from 'react-final-form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  console.log(values);
}

const validate = () => {
  //code here
}

export default Register => {

  const [weekday, setWeekday] = useState([])
  

  useEffect(() => {
    axios.get('http://localhost:3000/weekdays')
      .then(({ data }) => {
        setWeekday(data)
      })
  }, [])

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

                  <Field name="weekday" component="select">
                    {weekday.map(item => 
                      <option key={item.value} value={item.value}>{ item.text }</option>
                    )}
                  </Field>
                </div>

                <h2>Reusable Input Component</h2>

                <Button type="submit" variant="primary">Salvar</Button>
              </form>
            )}
          />
        </Col>
      </Row>
    </Container>
  )
}
EOF
```

## Custom Fields

```
mkdir components
touch components/TextInput.js
touch components/SelectField.js
```

## React Final Form Listeners

https://github.com/final-form/react-final-form-listeners

```
npm install --save react-final-form-listeners
```

