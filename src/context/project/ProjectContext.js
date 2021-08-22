import { createContext, useReducer } from "react"
import alertError from "../../components/Alerts/AlertError"
import alertSuccess from "../../components/Alerts/AlertSuccess"
import { firestore, storage } from "../../config/firebase"
import { collection } from "../../constants/collectionsFirebase"
import ProjectReducer from "./ProjectReducer"
import { projectTypes } from "./projectTypesReducer"

export const ProjectContext = createContext()

const ProjectState = ({children}) => {

  const initialState = {
    lastProjects     : [],
    projectsUser     : [],
    loading		       : false,
    projectError     : false,
    activateMyProject: null,
    seeProject       : null,
    limitLastProjects: 10,
  }

  const [ projectState, dispatch] = useReducer(ProjectReducer, initialState)

  // Create a New Project
  const createProject = async ( projectData, userId ) => {
    
    dispatch({type: projectTypes.InitAction})
    try {

      const { images, ...restValues } = projectData

      const dataImages = images.map( async (file) => {
        const newRef = storage
                      .ref('project')
                      .child(file.name)
                      
        await newRef.put(file)
        return newRef.getDownloadURL()
      })

      const resultImages = await Promise.all( 
        dataImages.map( async (newRef) => {
          const arrayImages = await newRef
          return arrayImages
        })
      )

      const newProject = await firestore
                                .collection(collection.projects)
                                .add({
                                  ...restValues,
                                  image: resultImages,
                                  userId,
                                  visible: true,
                                  votes: 0,
                                  user_votes: [],
                                  create: new Date().getTime()
                                })

      dispatch({
        type: projectTypes.SaveProject,
        payload: {
          id: newProject.id,
          image: resultImages,
          ...projectData
        }
      })    
      alertSuccess({message: 'Proyecto publicado'})
    } catch (error) {
      console.log(error);
      dispatch({type: projectTypes.ProjectError})
      alertError({message: 'Error al guardar el proyecto.'})
    }
  }

  // Get All Projects By User
  const getProjectsById = async ( userId ) => {

    dispatch({type: projectTypes.InitAction})
    try {

      firestore.collection(collection.projects)
      .where('userId', '==', userId)
      .orderBy('create')
      .onSnapshot( (querySnap) => {
        let projectArray = []
        
        querySnap.forEach( (project) => {
          projectArray.push({
            id: project.id,
            ...project.data()
          })
        })
        dispatch({
          type: projectTypes.GetProjectsByUser,
          payload: projectArray
        })
      })
      

    } catch (error) {
      dispatch({type: projectTypes.ProjectError})
    }
  }

  // Delete a Project
  const deleteProject = async ( projectId ) => {

    dispatch({type: projectTypes.InitAction})
    try {
      await firestore
            .collection(collection.projects)
            .doc(projectId)
            .delete()

      dispatch({
        type   : projectTypes.DeleteProject,
        payload: projectId
      })
      
    } catch (error) {
      alertError({message: 'Error al eliminar proyecto.'})
      dispatch({type: projectTypes.ProjectError})
    }
  }

  // On Select Project In Table
  const seeMyProject = ( projectId ) => {
    dispatch({
      type   : projectTypes.ActivateMyProject,
      payload: projectId
    })
  }

  // Get Last Projects
  const getLastProjects = async () => {    
    try {
      
      firestore
      .collection(collection.projects)
      .where('visible', '==', true)
      .orderBy('votes', 'desc')
      .limit(projectState.limitLastProjects)
      .onSnapshot( (querySnap) => {
        
        let projects = []

        querySnap.docs.forEach( project =>  {
          projects.push({
            id: project.id,
            ...project.data()
          })
        })

        dispatch({
          type: projectTypes.GetLastProjects,
          payload: projects
        })

      })


    } catch (error) {
      console.log(error)
      alertError({message: ''})
      dispatch({type: projectTypes.ProjectError})
    }
  }

  // When user voted a product
  const addVote = async ( projectId , votes , numberVotes, removeVote = false ) => {
    try {

      await firestore.collection(collection.projects)
                      .doc(projectId)
                      .update({
                        votes: (removeVote) ? numberVotes - 1 : numberVotes + 1,
                        user_votes: votes
                      })
    } catch (error) {
      console.log(error)
      alertError({message: 'Error al registrar voto.'})
      dispatch({type: projectTypes.ProjectError})
    }
  }

  // When user cliked on project 
  const activatedProject = async ( projectId ) => {

    dispatch({type: projectTypes.InitAction})
    try {
      firestore
        .collection(collection.projects)
        .doc(projectId)
        .onSnapshot((querySnap) => {
          
          let project = {
            id: querySnap.id,
            ...querySnap.data()
          }

         dispatch({
           type: projectTypes.SeeProject,
           payload: project
         })
        })

    } catch (error) {
      console.log(error)
      alertError({message: 'Error al obtener información'})
    }
  }

  // When use closed modal
  const cleanActivatedProject = () => {
    dispatch({ type: projectTypes.CleanSeeProject })
  }
  

  return (
    <ProjectContext.Provider
      value={{
        projectState,
        createProject,
        getProjectsById,
        seeMyProject,
        deleteProject,
        getLastProjects,
        addVote,
        activatedProject,
        cleanActivatedProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectState
