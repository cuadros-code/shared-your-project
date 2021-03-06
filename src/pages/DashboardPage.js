import { useContext, useEffect } from "react"
import styled from "styled-components"
import { Button, CircularProgress, Typography } from "@material-ui/core"
import svg from '../assets/profile.svg'
import TableComponent from "../components/Table/Table"
import { AuthContext } from "../context/auth/AuthContext"
import { ProjectContext } from "../context/project/ProjectContext"
import emptyProject from '../assets/empty.svg'
import { useHistory } from "react-router"

const DashboardPage = () => {

  const history = useHistory()
  const { projectState: { projectsUser, loading }, getProjectsById } = useContext(ProjectContext)
  const { authState: { user } } = useContext(AuthContext)

  useEffect(() => {
    if(user) getProjectsById( user.uid )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Content>
      <ContentDashboard>
        <div>
          <Typography variant="h5" style={{fontWeight: 'bold'}}>Mis Proyectos</Typography>
          <CardTable className="first">
            {
              loading
              ?
                <CircularProgress color="secondary"/>
              :
              projectsUser.length > 0
              ?
              <TableComponent 
                projects={ projectsUser }
              />
              :
              <div style={{position: 'relative'}}>
                <ImageEmpty src={emptyProject} alt="sin publicar" />
                <AddProject
                  color="primary"
                  variant="outlined"
                  onClick={ () => history.push('/create-project') }
                >
                  Agregar proyecto
                </AddProject>
              </div>
            
            }
          </CardTable>
        </div>
        
        <Grid>
          <div>
            <Typography variant="h5" style={{fontWeight: 'bold'}}>Favoritos</Typography>
            <Card>
            </Card>
          </div>
          <div>
            <Typography variant="h5" style={{fontWeight: 'bold'}}>Amigos</Typography>
            <Card>
            </Card>
          </div>
        </Grid>

      </ContentDashboard> 
    </Content>
  )
}

export default DashboardPage

const Content = styled.div`
  height: 100vh;
  padding: 25px 10px;
  background-image: url(${svg});
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: contain;
  @media( max-width: 800px ){
    height: 100%;
    background-size: cover;
  }
`

const ContentDashboard = styled.div`
  width: 95%;
  column-gap: 2rem;
  margin: auto;
  display: grid;
  min-height: 500px;
  grid-template-columns: 2fr 1fr;
  @media( max-width: 800px ){
    grid-template-columns: 1fr;
    row-gap: 3rem;
    padding: 10px 0px 20px 0px;
  }
`

const ImageEmpty = styled.img`
  width: 500px;
`
const AddProject = styled(Button)`
  position: absolute;
  width: 150px;
  height: 50px;
  left: 52%;
  top: 50%;
`

const Card = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 100%;
  margin: auto;
  box-shadow: 0px 0px 25px rgba(0,0,0,0.418);
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  
  @media( max-width: 800px ){
    .first{
      min-height: 300px;
    }
    min-height: 200px;
  }
`
const CardTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  
  @media( max-width: 800px ){
    .first{
      min-height: 300px;
    }
    min-height: 200px;
  }
`

const Grid = styled.div`
  display: grid;
  row-gap: 3rem;
`
