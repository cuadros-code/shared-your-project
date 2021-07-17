import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { routes } from '../constants/routes'
import { Container, Form, ImgGoogle, LinkTo , ContentInput, Content, Alert} from './LoginPage'
import { Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import { AuthContext } from '../context/auth/AuthContext'

const RegisterPage = () => {

  const { register, handleSubmit, formState:{errors}, reset } = useForm()

  const { authState:{ loading }, registerNewUser, loginWithGoogle } = useContext(AuthContext)

  const onSubmit = (data) => {
    registerNewUser(data)
    reset()
  }
  

  return (
    <Content>
      <Container>
          <Form onSubmit={ handleSubmit( onSubmit ) } >
            <Typography 
              variant="h5" 
              className="title" 
              color="primary"
            >
              Crear una cuenta
            </Typography>
            
            <ContentInput>
              <TextField 
                fullWidth
                label="Nombre completo"
                variant="outlined"
                type="text"
                error={ Boolean(errors.fullName)}
                {...register('fullName', {required: true}) }
              />
              {errors.fullName && <Alert>Este campo es obligatorio</Alert>}
            </ContentInput>
            
            <ContentInput>
              <TextField 
                fullWidth
                label="Correo electronico"
                variant="outlined"
                type="email"
                error={ Boolean(errors.email)}
                {...register('email', {required: true, pattern: /^\S+@\S+\.\S+$/ }) }
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
            
            <ContentInput>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={ loading }
                >
                { loading ? <CircularProgress />: 'Crear cuenta' }
              </Button>
            </ContentInput>

            <ContentInput>
                <ImgGoogle 
                  onClick={ loginWithGoogle }
                  src="https://img.icons8.com/color/48/000000/google-logo.png" 
                />
            </ContentInput>

            <div>
              Ya tines una cuenta? <LinkTo to={routes.login} >inicia sesión</LinkTo>
            </div>
          </Form>
      </Container>
    </Content>
  )
}

export default RegisterPage
