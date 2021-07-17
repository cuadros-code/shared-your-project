import { Redirect, Route } from 'react-router-dom'
import { routes } from '../constants/routes'

const PublicRoute = ({component: Component, isAuth, ...restProps}) => {
  return (
    <Route 
      {...restProps}
      component={
        (props) => (
          (!isAuth )
          ? <Component {...props}/> 
          : <Redirect to={routes.profile} />
      )}
    />
  )
}

export default PublicRoute

