import AuthState from './auth/AuthContext'
import theme from './colorTheme/themeContext'
import { ThemeProvider } from '@material-ui/core'

const CombineContext = ( {children} ) => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthState>
          { children }        
        </AuthState>
      </ThemeProvider>
    </>
  )
}

export default CombineContext
