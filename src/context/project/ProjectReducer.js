import { projectTypes } from "./projectTypesReducer"

const ProjectReducer = (state, action) => {
  
  // projectsUser: null,
  // loading		: false,
  // projectError : false,

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
        projectsUser: action.payload,
        loading		: false,
        projectError : false,
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