import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { routes } from '../constants/routes'
import PublicRoute from './PublicRoute'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const AppBar = lazy(() => import('../components/AppBar/AppBar'))

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>} >
        <AppBar />
        <Switch>
          <PublicRoute
            exact
            path={routes.login}
            isAuth={false}
            component={LoginPage} 
          />
          <PublicRoute
            exact
            path={routes.register}
            isAuth={false}
            component={RegisterPage} 
          />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default AppRouter

