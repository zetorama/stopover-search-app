import React from 'react'
import { mount } from 'enzyme'
import Comp from './search-result'

import offersData from '../../__mock__/hotel-offers.json'

describe('search-result comp', () => {
  test('renders empty result by default', () => {
    const res = mount(<Comp />)
    expect(res).toMatchSnapshot()
  })

  test('renders empty result when offers are empty', () => {
    const res = mount(<Comp offers={[]} />)
    expect(res).toMatchSnapshot()
  })

  test('renders hotel offers', () => {
    const res = mount(<Comp offers={offersData} />)
    expect(res).toMatchSnapshot()
  })
})
