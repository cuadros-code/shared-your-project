import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Container, Form, Input } from './LoginPage'

const RegisterPage = () => {
  return (
    <Container>
      <Form>
        <Input 
          label="Nombre completo"
          required
          variant="outlined"
          type="text"
        />
        <Input 
          label="Correo electronico"
          required
          variant="outlined"
          type="email"
        />
        <Input 
          label="Contraseña"
          required
          variant="outlined"
          type="password"
        />
        <Button
          variant="contained"
          color="secondary"
        >
          Registrarse
        </Button>
        <Button
          variant="contained"
          color="primary"
        >
          Google
        </Button>
      </Form>
    </Container>
  )
}

export default RegisterPage
