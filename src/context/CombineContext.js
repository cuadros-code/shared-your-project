import React from 'react'
import AuthContext from './auth/AuthContext'

const CombineContext = ( {children} ) => {

  return (
    <>
    <AuthContext>
      { children }        
    </AuthContext>
    </>
  )
}

export default CombineContext
