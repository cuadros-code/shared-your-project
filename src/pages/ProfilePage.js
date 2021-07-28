import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/auth/AuthContext"
import { ContentInput } from "./LoginPage"
import svg from '../assets/profile.svg'
import styled from "styled-components"
import { Button,  CircularProgress,  FormControlLabel,  Switch,  TextField, Typography } from "@material-ui/core"
import useForm from "../hooks/useForm"

const ProfilePage = () => {

  const { authState:{ user, loading }, updateDataProfile, updateAvatar } = useContext(AuthContext)
  const [imageAvatar, setImageAvatar] = useState('')
  const [image, setImage] = useState(null)
  const [searchJob, setSearchJob] = useState(false)

  const { valueForm, setValueForm, onChange } = useForm({
    displayName  : '',
    age          : '',
    numberPhone  : '',
    urlLinkedin  : '',
    urlRepository: '',
    urlPage      : ''
  })
  const { displayName, 
          age, 
          numberPhone, 
          urlLinkedin, 
          urlRepository, 
          urlPage } = valueForm

  const onSubmit = (e) => {
    e.preventDefault()
    updateDataProfile({ 
      uid        : user.uid,
      dataProfile: {...valueForm, searchJob} 
    })

    if(image){
      updateAvatar({ 
        uid  : user.uid,
        image: image,
      })
    }

  }

  const onChangeImage = (e) => {
    const file = e.target.files[0]
    if(!file) return
    setImage(file)
    const objectUrl = URL.createObjectURL(file)
    setImageAvatar(objectUrl)
  }

  useEffect(() => {
    if(user){
      setValueForm(user)
      setSearchJob(user.searchJob || false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <ContentProfile>
        <Form onSubmit={onSubmit}>
        <Card>
          <ContentAvatar>
            <ImageAvatar src={imageAvatar ? imageAvatar : user.photoURL} alt="avatar"/>
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
              name="displayName"
              value={displayName || ''}
              onChange={onChange}
              fullWidth
            />
          </ContentInput>
          <ContentInput>  
            <TextField 
              label="Edad"
              variant="outlined"
              fullWidth
              name="age"
              value={age || ''}
              onChange={onChange}
              type="number"
            />
          </ContentInput>
          <ContentInput>  
            <TextField 
              label="Telefono"
              variant="outlined"
              name="numberPhone"
              value={numberPhone || ''}
              onChange={onChange}
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
                checked={searchJob}
                onChange={() => setSearchJob(!searchJob)}
                color="primary" 
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
                name="urlLinkedin"
                value={urlLinkedin || ''}
                onChange={onChange}
                type="url"
                fullWidth
              />
            </ContentInput>
            <ContentInput>  
              <TextField 
                label="Link repositorio"
                variant="outlined"
                name="urlRepository"
                value={urlRepository || ''}
                onChange={onChange}
                type="url"
                fullWidth
              />
            </ContentInput>
            <ContentInput>  
              <TextField 
                label="Link portafolio"
                variant="outlined"
                name="urlPage"
                value={urlPage || ''}
                onChange={onChange}
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
              { loading ? <CircularProgress color="secondary" />: 'Guardar Información' }
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
  border-radius: 15px;
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
  border-radius: 5px;
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