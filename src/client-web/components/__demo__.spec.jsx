import React from 'react'
import { shallow } from 'enzyme'
import Comp from './__demo__'

describe('__demo__ comp', () => {
  test('renders all components', () => {
    const res = shallow(<Comp />)
    expect(res).toMatchSnapshot()
  })
})
