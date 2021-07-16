import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'

const LoginPage = () => {
  return (
    <Container>
      <Form>
        <Input 
          label="Correo electronico"
          variant="outlined"
          type="email"
        />
        <Input 
          label="Contraseña"
          variant="outlined"
          type="password"
        />
        <Button
          variant="contained"
          color="secondary"
        >
          Iniciar sesión
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

export default LoginPage

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Form = styled.form`
  display: flex;
  min-width: 350px;
  z-index: 9999;
  min-height: 320px;
  justify-content: space-around;
  flex-direction: column;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0,0,0,0.2);
`

export const Input = styled(TextField)`
`
