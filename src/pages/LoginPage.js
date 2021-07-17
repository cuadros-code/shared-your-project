import { useContext } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core'
import { routes } from '../constants/routes'
import { primary } from '../config/colors'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'

const LoginPage = () => {

  const { register, reset, handleSubmit, formState: { errors } } = useForm()
  
  const { authState:{ loading }, 
          loginWithEmailAndPassword, 
          loginWithGoogle } = useContext(AuthContext)

  const onSubmit = (data) => {
    loginWithEmailAndPassword(data)
    reset()
  }
  

  return (
    <Content>
      <Container>
          <Form onSubmit={ handleSubmit( onSubmit ) } >
            <Typography variant="h5" className="title" >Ingrese a su cuenta</Typography>
            <ContentInput>
              <TextField 
                fullWidth
                label="Correo electronico"
                variant="outlined"
                type="email"
                error={ Boolean(errors.email)}
                {...register('email', {required: true, pattern: /^\S+@\S+\.\S+$/}) }
              />
              {errors.email && <Alert>Este campo es obligatorio</Alert>}
            </ContentInput>
            <ContentInput>
              <TextField 
                fullWidth
                label="Contraseña"
                variant="outlined"
                type="password"
                error={ Boolean(errors.password)}
                {...register('password', {required: true}) }
                />
                {errors.password && <Alert>Este campo es obligatorio</Alert>}
            </ContentInput>
            <LinkTo >Olvidaste tu contraseña?</LinkTo>
            <ContentInput>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={ loading }
              >
                { loading ? <CircularProgress />: 'Iniciar sesión' }
              </Button>
            </ContentInput>
            <ContentInput>
                <ImgGoogle 
                  src="https://img.icons8.com/color/48/000000/google-logo.png" 
                  onClick={ loginWithGoogle }
                />
            </ContentInput>
            <div>
              No tienes una cuenta? <LinkTo to={routes.register} >crea una</LinkTo>
            </div>
          </Form>
      </Container>
    </Content>
  )
}

export default LoginPage

export const Content = styled.div`
  background-color: whitesmoke;
`

export const LinkTo = styled(Link)`
  margin-bottom: 15px;
  color: ${primary};
`

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ImgGoogle = styled.img`
  width: 30px;
  border-radius: 50px;
  cursor: pointer;
  padding: 10px;
  box-shadow: 0px 0px 7px rgba(0,0,0,0.3);
  :hover{
    background-color: #e1e1e1;
  }
`

export const Form = styled.form`
  display: flex;
  min-width: 350px;
  min-height: 30px;
  background-color: white;
  flex-direction: column;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 12px rgba(0,0,0,0.2);
`

export const ContentInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`
export const Alert = styled.span`
  color: red;
`