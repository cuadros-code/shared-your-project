import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({component: Component, isAuth, ...restProps}) => {
  return (
    <Route 
      {...restProps}
      component={
        (props) => (
          (!isAuth )
          ? <Component {...props}/> 
          : <Redirect to="/profiles"/>
      )}
    />
  )
}

export default PublicRoute

