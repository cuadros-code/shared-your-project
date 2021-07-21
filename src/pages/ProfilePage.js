import styled from "styled-components"
import { Button,  FormControlLabel,  Switch,  TextField, Typography } from "@material-ui/core"
import { ContentInput } from "./LoginPage"
import svg from '../assets/profile.svg'
import { useForm } from "react-hook-form"
import { useState } from "react"

const ProfilePage = () => {

  const [imageAvatar, setImageAvatar] = useState('')
  const { register, handleSubmit, formState: { errors },  } = useForm()


  const onSubmit = (data) => {
    console.log(data)
  }

  const onChangeImage = (e) => {
    const file = e.target.files[0]
    if(!file) return
    const objectUrl = URL.createObjectURL(file)
    setImageAvatar(objectUrl)
  }

  return (
    <Container>
      <ContentProfile>
        <Form onSubmit={ handleSubmit( onSubmit ) }>
        <Card>
          <ContentAvatar>
            <ImageAvatar src={imageAvatar ? imageAvatar: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'} alt="avatar"/>
            <ButtonImage color="primary" variant="outlined">
              <InputImage 
                onChange={onChangeImage}
                type="file" 
              />
              Cambiar imagen
            </ButtonImage>
          </ContentAvatar>
          <ContentInput>
            <TextField 
              label="Nombre completo"
              variant="outlined"
              {...register('fullName', {required: true}) }
              fullWidth
            />
          </ContentInput>
          <ContentInput>  
            <TextField 
              label="Edad"
              variant="outlined"
              fullWidth
              {...register('age') }
              type="number"
            />
          </ContentInput>
          <ContentInput>  
            <TextField 
              label="Telefono"
              variant="outlined"
              {...register('numberPhone') }
              type="number"
              fullWidth
            />
          </ContentInput>
        </Card>
        <div style={{display: 'grid', gridTemplateColumns: '1fr', rowGap: '1rem'}}>
          <Card style={{display:'flex', justifyContent: 'center'}}>
            <FormControlLabel
              control={
              <Switch
                {...register("showAge")} 
                color="primary" 
                name="searchJob"
              />}
              label="Buscando trabajo"
              labelPlacement="start"
            />
          </Card>
          <Card>
            <Typography 
              variant="h6" 
              color="primary" 
              style={{fontWeight:'bold', margin: '15px 15px'}}
            >
              Perfil profesional
            </Typography>
            <ContentInput>  
              <TextField 
                label="Link linkedin"
                variant="outlined"
                {...register('urlLinkedin') }
                type="url"
                fullWidth
              />
            </ContentInput>
            <ContentInput>  
              <TextField 
                label="Link repositorio"
                variant="outlined"
                {...register('urlRepository') }
                type="url"
                fullWidth
              />
            </ContentInput>
            <ContentInput>  
              <TextField 
                label="Link portafolio"
                variant="outlined"
                {...register('urlPage') }
                type="url"
                fullWidth
              />
            </ContentInput>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Guardar Información
            </Button>
          </Card>
         
        </div>
        </Form>
      </ContentProfile>
    </Container>
  )
}

export default ProfilePage



const Container = styled.div`
  height: 100vh;
  background-image: url(${svg});
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  padding-bottom: 15px;
  justify-content: center;
  align-items: center;
  @media( max-width: 1000px ){
    height: 100%;
    margin-top: 70px;
  }
`
const ContentProfile = styled.div`
  width: 70%;
  padding: 40px;
  height: auto;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 25px rgba(0,0,0,0.198);
  border-radius: 35px;
  @media( max-width: 1000px ){
    width: 95%;
    height: auto;
    padding: 25px;
  }
`
const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3rem;

  @media( max-width: 800px ){
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 1rem;
    margin: auto;
    height: auto;
  }
`

const Card = styled.div`
  background: white;
  border-radius: 35px;
  box-shadow: 0px 0px 25px rgba(0,0,0,0.1);
  padding: 15px 50px;
  @media(max-width: 450px){
    padding: 15px 25px;
  }

`

const ImageAvatar = styled.img`
  width: 130px;
  height: 130px;
  margin-bottom: 15px;
  border-radius: 100px;
`

const ButtonImage = styled(Button)`
  position: relative;
  overflow: hidden;
  text-align:center;
  font-size:0.9rem;
  display:inline;
`

const InputImage = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`
const ContentAvatar = styled.div`
  display: flex;
  margin-bottom: 35px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`