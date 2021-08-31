import { useContext, useState } from "react";
import styled from "styled-components"
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { ProjectContext } from "../../context/project/ProjectContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { useHistory } from "react-router-dom";
import ProductDetail from "../Modals/ProductDetail";

const CardProject = ({project}) => {

  const history = useHistory()

  const [actualProject, setActualProject] = useState(null)
  const { addVote } = useContext(ProjectContext)
  const [modal, setModal] = useState(false)
  const { authState:{ user } } = useContext(AuthContext)

  const onAddVote = () => {
    if(!user) return history.push('login')

    if(project.user_votes.includes(user.uid)){
      const votes = project.user_votes.filter( userId => userId !== user.uid )
      addVote(project.id, votes, project.votes, true )
      return;
    }
    const votes = [...project.user_votes, user.uid] 
    addVote(project.id, votes, project.votes )
  }

  const onClickOnProject = () => {
    setModal(true)
    setActualProject(project)
  }

  return (
    <>
      <CardContent>
        <LayoutCard
          onClick={onClickOnProject}
        >
          <CardImage loading="lazy" src={project?.image[0]} alt={project?.projectName} />
          <CardInfo style={{ flex: 1 }}>
            <h3>{project.projectName}</h3>
            <Description>{project.projectDescription}</Description>

          </CardInfo>

        </LayoutCard>
        <ButtonVotes
          hasVoted={project.user_votes.includes(user?.uid)}
          onClick={onAddVote}
        >
          <HowToVoteIcon />
          {project.votes}
        </ButtonVotes>
      </CardContent>
      <ProductDetail 
        isOpen={ modal }
        setModal={ setModal }
        project={ actualProject }
      />
    </>
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

const Description = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const CardImage = styled.img`
  object-fit: cover;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
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
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${ props => props.hasVoted ? '#e3555d' : '#e1e1e1'};
  cursor: pointer;
  font-size: 1rem;
  background-color: white;
  transition: ease 0.18s;
  color: ${ props => props.hasVoted ? '#e3555d' : 'black'};

  :hover{
    background-color: whitesmoke;
  }

  :active{
    background-color: #d6ede6;
  }

`