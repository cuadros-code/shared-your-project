import { useState } from 'react'
import styled from 'styled-components'
import svg from '../assets/profile.svg'
import placeholder from '../assets/placeholder.png'
import { ContentInput } from './LoginPage'
import { Button, TextField, Typography } from '@material-ui/core'


const CreateProject = () => {

  const [imageAvatar, setImageAvatar] = useState('')
  const [image, setImage] = useState(null)

  const onChangeImage = (e) => {
    const file = e.target.files[0]
    if(!file) return
    setImage(file)
    const objectUrl = URL.createObjectURL(file)
    setImageAvatar(objectUrl)
  }

  return (
    <Content>
      <ContentForm>
        <Form>
          <Typography
            variant="h5" 
            className="title" 
            color="primary"
          >
            Publicar nuevo proyecto
          </Typography>

          <ContentAvatar>
            <ImageAvatar src={imageAvatar ? imageAvatar: placeholder} alt="avatar"/>
            <ButtonImage color="primary" variant="outlined">
              <InputImage 
                onChange={onChangeImage}
                type="file" 
              />
              Imagen de presentación
            </ButtonImage>
          </ContentAvatar>
          
          <ContentInput>
            <TextField 
              fullWidth
              label="Nombre del proyecto"
              variant="outlined"
              type="text"
            />
          </ContentInput>
          <ContentInput>
            <TextField 
              fullWidth
              label="Link del repositorio"
              variant="outlined"
              type="url"
            />
          </ContentInput>
          <ContentInput>
            <TextField 
              fullWidth
              label="Link del proyecto"
              variant="outlined"
              type="url"
            />
          </ContentInput>
          <ContentInput>
            <TextField 
              multiline
              fullWidth
              label="Descripción del proyecto"
              variant="outlined"
              type="text"
            />
          </ContentInput>

          <Button
            color="primary"
            variant="contained"
            fullWidth
          >
            Publicar proyecto
          </Button>

        </Form>
      </ContentForm>
    </Content>
  )
}

export default CreateProject

const Content = styled.div`
  height: 100%;
  background-image: url(${svg});
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  @media( max-width: 800px ){
    height: auto;
  }
`

const ContentForm = styled.div`
  width: 70%;
  padding: 10px 40px 40px 40px;
  margin: 30px 0px 30px 0px;
  height: auto;
  backdrop-filter: blur(50px);
  box-shadow: 0px 0px 25px rgba(0,0,0,0.198);
  border-radius: 35px;
  @media( max-width: 1000px ){
    width: 95%;
    height: auto;
    padding: 25px;
  }
`

const Form = styled.form`
  width: 100%;
  height: 100%;
`
const ImageAvatar = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
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