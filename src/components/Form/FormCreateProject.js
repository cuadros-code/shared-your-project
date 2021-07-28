import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import useForm from '../../hooks/useForm'
import { ContentInput } from '../../pages/LoginPage'
import placeholder from '../../assets/placeholder.png'
import { AuthContext } from '../../context/auth/AuthContext'
import { ProjectContext } from '../../context/project/ProjectContext'
import { Button, CircularProgress, FormControlLabel, Switch, TextField, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'

const FormCreateProject = ({title = 'Publicar nuevo proyecto', update = false}) => {

  const { id } = useParams()
  const { projectState: { loading, activateMyProject }, 
          createProject, 
          seeMyProject,
          deleteProject } = useContext(ProjectContext)
  const { authState: { user } } = useContext(AuthContext)

  const [visible, setVisibleProject] = useState(true)
  const [imageAvatar, setImageAvatar] = useState('')
  const [image, setImage] = useState(null)

  const { valueForm, onChange, setValueForm } = useForm({
    projectName       : '',
    projectLink       : '',
    projectRepository : '',
    projectDescription: '',
    votes             : 0,
  })

  const {
    projectName,
    projectLink,
    projectRepository,
    projectDescription,
    votes
  } = valueForm

  useEffect(() => {
    if(id){
      seeMyProject(id)
    }
    if(activateMyProject){
      setValueForm(activateMyProject)
      setImageAvatar(activateMyProject.image)
      setVisibleProject(activateMyProject.visible)
    }
    if(!update) {
      setValueForm({})
      setImageAvatar('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, activateMyProject])
  
  const onChangeImage = (e) => {
    const file = e.target.files[0]
    if(!file) return
    setImage(file)
    const objectUrl = URL.createObjectURL(file)
    setImageAvatar(objectUrl)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const projectData = {
      image,
      ...valueForm
    }
    createProject(
      projectData,
      user.uid
    )
  }


  const onDeleteProject = () => {
    deleteProject(id)
  }

  return (
    <>
     <Form onSubmit={onSubmit}>
          <Typography
            variant="h5" 
            className="title" 
            color="primary"
          >
            {title}
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

          {
            update &&
            <FormControlLabel
                control={
                <Switch
                  checked={visible}
                  onChange={() => setVisibleProject(!visible)}
                  color="primary" 
                />}
                style={{marginBottom: '20px', display: 'flex'}}
                label="Público"
                labelPlacement="start"
            />
          }
          
          <ContentInput>
            <TextField 
              fullWidth
              label="Nombre del proyecto"
              name="projectName"
              onChange={onChange}
              value={projectName}
              variant="outlined"
              type="text"
            />
          </ContentInput>
          <ContentInput>
            <TextField 
              fullWidth
              label="Link del repositorio"
              name="projectRepository"
              onChange={onChange}
              value={projectRepository}
              variant="outlined"
              type="url"
            />
          </ContentInput>
          <ContentInput>
            <TextField 
              fullWidth
              label="Link del proyecto"
              name="projectLink"
              onChange={onChange}
              value={projectLink}
              variant="outlined"
              type="url"
            />
          </ContentInput>
          <ContentInput>
            <TextField 
              multiline
              fullWidth
              rows="3"
              label="Descripción del proyecto"
              name="projectDescription"
              onChange={onChange}
              value={projectDescription}
              variant="outlined"
              type="text"
            />
          </ContentInput>

          {
            update &&
            <>
              <ContentInput>
                <TextField 
                  disabled
                  fullWidth
                  label="Número de votos"
                  name="votes"
                  value={votes}
                  variant="outlined"
                  type="text"
                />
              </ContentInput>
      
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                onClick={onDeleteProject}
                style={{marginBottom: '15px'}}
              >
                Eliminar proyecto
              </Button>
            </>
          }
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            { loading 
              ? <CircularProgress color="secondary" />
              : update ? 'Actualizar proyecto'  : 'Publicar proyecto' 
            }
          </Button>

        </Form> 
    </>
  )
}

export default FormCreateProject

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