import { createContext, useReducer } from "react"
import ProjectReducer from "./ProjectReducer"

export const ProjectContext = createContext()

const ProjectState = ({children}) => {

  const initialState = {
    projectsUser: null
  }

  const [ projectState, dispatch] = useReducer(ProjectReducer, initialState)
  
  return (
    <ProjectContext.Provider
      value={{
        projectState
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectState
