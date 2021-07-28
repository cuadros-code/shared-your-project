import { lazy, Suspense, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../constants/routes'
import PublicRoute from './PublicRoute'
import { AuthContext } from '../context/auth/AuthContext'
import PrivateRoute from './PrivateRoute'
import DrawerLeft from '../components/Drawer/Drawer'

const HomePage = lazy(() => import('../pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'))
const CreateProject = lazy(() => import('../pages/CreateProject'))
const UpdateProject = lazy(() => import('../pages/UpdateProject'))

const AppRouter = () => {

  const { authState:{ isAuth }, getCurrentUser } = useContext(AuthContext)

  useEffect(() => {
    getCurrentUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>} >
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

