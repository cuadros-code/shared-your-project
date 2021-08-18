import styled from 'styled-components'
import svg from 'assets/profile.svg'
import FormCreateProject from 'components/Form/FormCreateProject'

const CreateProject = () => {
  
  return (
    <Content>
      <ContentForm>
        <FormCreateProject/>        
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
  max-width: 800px;
  backdrop-filter: blur(60px);
  box-shadow: 0px 0px 25px rgba(0,0,0,0.198);
  border-radius: 10px;
  @media( max-width: 1000px ){
    width: 95%;
    height: auto;
    padding: 25px;
  }
`