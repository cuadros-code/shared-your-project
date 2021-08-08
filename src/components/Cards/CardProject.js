import styled from "styled-components"
import HowToVoteIcon from '@material-ui/icons/HowToVote';

const CardProject = ({project}) => {
  return (
    <CardContent>
      <LayoutCard>
        <CardImage loading="lazy" src={project.image} alt={project.projectName} />
        <CardInfo style={{ flex: 1 }}>
          <h3>{project.projectName}</h3>
          <p>{project.projectDescription}</p>

        </CardInfo>

        <ButtonVotes>
          <HowToVoteIcon />
          {project.votes}
        </ButtonVotes>
      </LayoutCard>
    </CardContent>
  )
}

export default CardProject

const CardContent = styled.div`
  background-color: white;
  height: 110px;
  display: flex;
  align-items: center;
  padding: 0px 10px 0px 10px;
  cursor: pointer;
  border-bottom: 1px;
  border-bottom-color: #e1e1e1;
  border-bottom-style: solid;
  transition: ease-in 0.2s;

  &:first-of-type{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:last-child{
    border-bottom: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  :hover{
    background-color: #e1e1e1;
  }
`
const LayoutCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const CardImage = styled.img`
  object-fit: cover;
  width: 80px;
  height: 80px;
  border-radius: 5px;
`
const CardInfo = styled.div`
  padding: 5px 5px;
  h3{
    margin: 0;
    padding: 0;
  }
  p{
    margin: 0;
    padding: 0;
  }
`

const ButtonVotes = styled.button`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: #e1e1e1;
  cursor: pointer;
  font-size: 1rem;
  background-color: white;

  :hover{
    background-color: whitesmoke;
  }
`