import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component, isAuth, ...restProps}) => {
  return (
    <Route 
      {...restProps}
      render={
        (props) => (
          (isAuth) 
          ? <Component {...props}/> 
          : <Redirect to="/login"/>
     )}
    />
  )
}

export default PrivateRoute

