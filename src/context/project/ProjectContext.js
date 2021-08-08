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
  }

  const [ projectState, dispatch] = useReducer(ProjectReducer, initialState)

  // Create a New Project
  const createProject = async ( projectData, userId ) => {
    
    dispatch({type: projectTypes.InitAction})
    try {
      const newRef = storage
          .ref('project')
          .child(projectData.image.name)

      await newRef.put(projectData.image)    
      const urlImage = await newRef.getDownloadURL()

      const newProject = await firestore
                                .collection(collection.projects)
                                .add({
                                  ...projectData,
                                  image: urlImage,
                                  userId,
                                  visible: true,
                                  votes: 0,
                                  create: new Date().getTime()
                                })

      dispatch({
        type: projectTypes.SaveProject,
        payload: {
          id: newProject.id,
          image: urlImage,
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
      .where('userId', '==', userId).onSnapshot( (querySnap) => {

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
  const deleteProject = async ( idProject ) => {

    dispatch({type: projectTypes.InitAction})
    try {
      await firestore
            .collection(collection.projects)
            .doc(idProject)
            .delete()

      dispatch({
        type   : projectTypes.DeleteProject,
        payload: idProject
      })
      
    } catch (error) {
      alertError({message: 'Error al eliminar proyecto.'})
      dispatch({type: projectTypes.ProjectError})
    }
  }

  // On Select Project In Table
  const seeMyProject = ( idProject ) => {
    dispatch({
      type   : projectTypes.ActivateMyProject,
      payload: idProject
    })
  }

  // Get Last Projects
  const getLastProjects = async () => {    
    try {
      
      firestore
      .collection(collection.projects)
      .where('visible', '==', true)
      .orderBy('create')
      .limit(20)
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
  

  return (
    <ProjectContext.Provider
      value={{
        projectState,
        createProject,
        getProjectsById,
        seeMyProject,
        deleteProject,
        getLastProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectState
