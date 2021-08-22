import { projectTypes } from "./projectTypesReducer"

const ProjectReducer = (state, action) => {
  
  //   lastProjects     : [],
  //   projectsUser     : [],
  //   loading		       : false,
  //   projectError     : false,
  //   activateMyProject: null,
  //   seeProject       : null,
  //   limitLastProjects: 10,

  switch (action.type) {
    
    case projectTypes.InitAction:
      return {
        ...state,
        loading: true,
      }
      
    case projectTypes.SaveProject:
      return {
        ...state,
        loading     : false,
        projectError: false,
        projectsUser: [action.payload, ...state?.projectsUser],
      }
    case projectTypes.GetProjectsByUser:
      return {
        ...state,
        loading		  : false,
        projectError: false,
        projectsUser: action.payload,
      }
    case projectTypes.GetLastProjects:
      return {
        ...state,
        loading		  : false,
        lastProjects: action.payload,
      }
    case projectTypes.ActivateMyProject:
      return {
        ...state,
        activateMyProject: ( action.payload ? state.projectsUser.find( (project) => project.id === action.payload ) : {}),
      }
    case projectTypes.DeleteProject:
      return {
        ...state,
        loading     : false,
        projectsUser: state.projectsUser.filter( (project) => project.id !== action.payload )
      }
    
    case projectTypes.SeeProject:
      return { 
        ...state,
        loading   : false,
        seeProject: action.payload
      }

    case projectTypes.CleanSeeProject:
      return {
        ...state,
        seeProject: null
      }
    case projectTypes.ProjectError:
      return {
        ...state,
        loading     : false,
        projectError: true
      }

    default:
      return state
  }

}

export default ProjectReducer