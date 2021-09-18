import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import CardProject from 'components/Cards/CardProject'

test('render component', () => {
  
  const card = render( <CardProject project={null} /> )

  console.log(card)

})