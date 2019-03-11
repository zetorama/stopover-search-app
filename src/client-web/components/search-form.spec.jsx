import React from 'react'
import { mount } from 'enzyme'
import Comp from './search-form'

describe('search-form comp', () => {
  test('renders with all defaults props', () => {
    const res = mount(<Comp htmlId='1' />)
    expect(res).toMatchSnapshot()
  })

  test('renders with all passed props', () => {
    const props = {
      cityCode: 'XXX',
      checkInDate: '1111',
      checkOutDate: '2222',
    }
    const res = mount(<Comp htmlId='1' {...props} />)
    expect(res).toMatchSnapshot()
  })

  test('handles submit', () => {
    const onSubmit = jest.fn()
    const props = {
      onSubmit,
      cityCode: 'YYY',
      checkInDate: '1111',
      checkOutDate: '2222',
    }
    const res = mount(<Comp htmlId='1' {...props} />)

    // https://github.com/airbnb/enzyme/issues/308
    // res.find('button').at(0).simulate('click')
    res.find('form').simulate('submit')

    expect(onSubmit).toHaveBeenCalled()
  })
})
