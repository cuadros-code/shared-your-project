import styled from "styled-components"
import { Button,  FormControlLabel,  Switch,  TextField, Typography } from "@material-ui/core"
import { ContentInput } from "./LoginPage"
import svg from '../assets/profile.svg'

const ProfilePage = () => {
  return (
    <Container>
      <ContentProfile>
        <Card>
          <ContentAvatar>
            <ImageAvatar src="http://via.placeholder.com/700x500" alt="avatar"/>
            <ButtonImage color="primary" variant="outlined">
              <InputImage type="file" />
              Cambiar imagen
            </ButtonImage>
          </ContentAvatar>
          <ContentInput>
            <TextField 
              label="Nombre completo"
              variant="outlined"
              fullWidth
            />
          </ContentInput>
          <ContentInput>  
            <TextField 
              label="Edad"
              variant="outlined"
              fullWidth
              type="number"
            />
          </ContentInput>
          <ContentInput>  
            <TextField 
              label="Telefono"
              variant="outlined"
              fullWidth
              type="number"
            />
          </ContentInput>
        </Card>
        <div style={{display: 'grid', gridTemplateColumns: '1fr', rowGap: '1rem'}}>
          <Card style={{display:'flex', justifyContent: 'center'}}>
            <FormControlLabel
              value="start"
              control={<Switch color="primary" />}
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
                type="url"
                fullWidth
              />
            </ContentInput>
            <ContentInput>  
              <TextField 
                label="Link repositorio"
                variant="outlined"
                type="url"
                fullWidth
              />
            </ContentInput>
            <ContentInput>  
              <TextField 
                label="Link portafolio"
                variant="outlined"
                type="url"
                fullWidth
              />
            </ContentInput>
            <Button
              color="primary"
              variant="contained"
              fullWidth
            >
              Guardar Información
            </Button>
          </Card>
         
        </div>

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
  @media( max-width: 800px ){
    height: auto;
    margin-top: 70px;
  }
`
const ContentProfile = styled.div`
  width: 70%;
  padding: 40px;
  height: 90%;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 25px rgba(0,0,0,0.198);
  border-radius: 35px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3rem;

  @media( max-width: 800px ){
    width: 95%;
    margin-top: -50px;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 1rem;
    height: auto;
    padding: 25px;
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