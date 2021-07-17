import { Redirect, Route } from 'react-router-dom'
import { routes } from '../constants/routes'

const PrivateRoute = ({component: Component, isAuth, ...restProps}) => {
  return (
    <Route 
      {...restProps}
      component={
        (props) => (
          (isAuth) 
          ? <Component {...props}/> 
          : <Redirect to={routes.login} />
     )}
    />
  )
}

export default PrivateRoute

