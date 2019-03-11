import React from 'react'
import { mount } from 'enzyme'
import Comp from './hotel-offers'

import offersData from '../../__mock__/hotel-offers.json'

describe('hotel-offers comp', () => {
  test('renders hotel offers', () => {
    const res = mount(<Comp offers={offersData} />)
    expect(res).toMatchSnapshot()
  })
})
