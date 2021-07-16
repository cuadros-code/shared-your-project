import AuthContext from './auth/AuthContext'
import theme from './colorTheme/themeContext'
import { ThemeProvider } from '@material-ui/core'

const CombineContext = ( {children} ) => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContext>
          { children }        
        </AuthContext>
      </ThemeProvider>
    </>
  )
}

export default CombineContext
