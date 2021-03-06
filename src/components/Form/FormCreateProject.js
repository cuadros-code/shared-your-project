import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import useForm from '../../hooks/useForm'
import { ContentInput } from '../../pages/LoginPage'
import placeholder from '../../assets/placeholder.png'
import { AuthContext } from '../../context/auth/AuthContext'
import { ProjectContext } from '../../context/project/ProjectContext'
import { Button, CircularProgress, FormControlLabel, Switch, TextField, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import {useDropzone} from 'react-dropzone';

const FormCreateProject = ({title = 'Publicar nuevo proyecto', update = false}) => {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    maxFiles: 3
  });

  const { id } = useParams()

  const { projectState: { loading, activateMyProject }, 
          createProject, 
          seeMyProject,
          deleteProject } = useContext(ProjectContext)

  const { authState: { user } } = useContext(AuthContext)

  const [visible, setVisibleProject] = useState(true)

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
      setVisibleProject(activateMyProject.visible)
    }
    if(!update) {
      setValueForm({})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, activateMyProject])
  

  const onSubmit = (e) => {
    e.preventDefault()
    const projectData = {
      images: acceptedFiles,
      ...valueForm
    }

    // console.log(acceptedFiles);

    createProject(
     projectData,
      user.uid
    ) 
  }


  const onDeleteProject = () => {
    deleteProject(id)
  }

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

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

          <section className="container">
            <UploadFiles {...getRootProps({className: 'dropzone'})}>
              <input  {...getInputProps()} />
              <p>Arrastre los archivos o haga click para seleccionar los archivos</p>
            </UploadFiles>
            <aside>
              <h4>Archivos</h4>
              <ul>{files}</ul>
            </aside>
          </section>

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
                label="P??blico"
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
              label="Descripci??n del proyecto"
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
                  label="N??mero de votos"
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

const UploadFiles = styled.div`
  border-style: dotted;
  border-color: #e1e1e1;
  font-size: 1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`