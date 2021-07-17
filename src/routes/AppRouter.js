import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { routes } from '../constants/routes'
import PublicRoute from './PublicRoute'
import { AuthContext } from '../context/auth/AuthContext'
import PrivateRoute from './PrivateRoute'

const AppBar = lazy(() => import('../components/AppBar/AppBar'))

const HomePage = lazy(() => import('../pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'))

const AppRouter = () => {

  const { authState:{ isAuth }, getCurrentUser } = useContext(AuthContext)

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>} >
        <AppBar />
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

        </Switch>
      </Suspense>
    </Router>
  )
}

export default AppRouter

