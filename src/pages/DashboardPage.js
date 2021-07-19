import { Typography } from "@material-ui/core"
import styled from "styled-components"
import svg from '../assets/profile.svg'


const DashboardPage = () => {
  return (
    <Content>
      <ContentDashboard>
        <div>
          <Typography variant="h5" style={{fontWeight: 'bold'}}>Mis Proyectos</Typography>
          <Card className="first">


          </Card>
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
const Card = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 100%;
  margin: auto;
  box-shadow: 0px 0px 25px rgba(0,0,0,0.118);
  border-radius: 25px;
  background-color: white;
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