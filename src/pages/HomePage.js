import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import CardProject from 'components/Cards/CardProject'
import { ProjectContext } from 'context/project/ProjectContext'

const HomePage = () => {

  const { projectState:{ lastProjects }, getLastProjects } = useContext(ProjectContext)

  useEffect(() => {
    getLastProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Content>
        <div>
          <h2>Más votados</h2>
          <ContainerCard >
            {
              lastProjects.map(item => (
                <CardProject project={item} key={item.id} />
                ))
            }
          </ContainerCard>
        </div>

        <div>
          <h2>Últimas noticias</h2>
          <ContainerCard >
            {
              lastProjects.map(item => (
                <CardProject project={item} key={item.id} />
                ))
            }
          </ContainerCard>
        </div>
      </Content>      
    </Container>
  )
}

export default HomePage

const Container = styled.div`
  padding: 20px 120px;
  @media( max-width: 1150px ){
    padding: 20px 70px;
  }
  @media( max-width: 850px ){
    padding: 20px 30px;
  }
`
const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 20px;
  @media( max-width: 650px ){
    grid-template-columns: 1fr;
  }
`
const ContainerCard = styled.div`
  box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
  border-radius: 5px;
`