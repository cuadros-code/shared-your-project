import AuthState from './auth/AuthContext'
import theme from './colorTheme/themeContext'
import { ThemeProvider } from '@material-ui/core'
import ProjectState from './project/ProjectContext'

const CombineContext = ( {children} ) => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthState>
          <ProjectState>
            { children }        
          </ProjectState>
        </AuthState>
      </ThemeProvider>
    </>
  )
}

export default CombineContext
