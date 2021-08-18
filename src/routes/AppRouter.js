import { lazy, Suspense, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import DrawerLeft from 'components/Drawer/Drawer'
import { routes } from 'constants/routes'
import { AuthContext } from 'context/auth/AuthContext'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const HomePage = lazy(() => import('pages/HomePage'))
const LoginPage = lazy(() => import('pages/LoginPage'))
const ProfilePage = lazy(() => import('pages/ProfilePage'))
const RegisterPage = lazy(() => import('pages/RegisterPage'))
const CreateProject = lazy(() => import('pages/CreateProject'))
const UpdateProject = lazy(() => import('pages/UpdateProject'))
const DashboardPage = lazy(() => import('pages/DashboardPage'))
const ResetPasswordPage = lazy(() => import('pages/ResetPasswordPage'))

const AppRouter = () => {

  const { authState:{ isAuth }, getCurrentUser } = useContext(AuthContext)

  useEffect(() => {
    getCurrentUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Suspense fallback={null} >
        <DrawerLeft />
        <Switch>

          <Route 
            exact
            path={routes.home}
            component={HomePage}
          />
          <PublicRoute
            exact
            path={routes.login}
            isAuth={isAuth}
            component={LoginPage} 
          />
          <PublicRoute
            exact
            path={routes.register}
            isAuth={isAuth}
            component={RegisterPage} 
          />
          <PublicRoute
            exact
            path={routes.resetPassword}
            isAuth={isAuth}
            component={ResetPasswordPage} 
          />
          <PrivateRoute
            exact
            path={routes.profile}
            isAuth={isAuth}
            component={ProfilePage}
          />
          <PrivateRoute
            exact
            path={routes.dashboard}
            isAuth={isAuth}
            component={DashboardPage}
          />
          <PrivateRoute
            exact
            path={routes.createProject}
            isAuth={isAuth}
            component={CreateProject}
          />
          <PrivateRoute
            exact
            path={routes.updateProject}
            isAuth={isAuth}
            component={UpdateProject}
          />
          <Redirect to="home" />
        </Switch>
        
      </Suspense>
    </Router>
  )
}

export default AppRouter

