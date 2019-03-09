import React, { useCallback } from 'react'

const NOOP = () => { }
const TOMORROW = new Date(Date.now() + 24 * 36e5).toISOString().split('T')[0]
let id = Math.random()

export const SearchForm = ({
  cityCode = '',
  checkInDate = TOMORROW,
  checkOutDate = '',
  onChange = NOOP,
  onSubmit = NOOP,
  htmlId = ++id,
}) => {
  const onCityCodeChange = useCallback(ev => onChange(ev, 'cityCode', ev.target.value), [onChange])
  const onCheckInDateChange = useCallback(ev => onChange(ev, 'checkInDate', ev.target.value), [onChange])
  const onCheckOutDateChange = useCallback(ev => onChange(ev, 'checkOutDate', ev.target.value), [onChange])
  const onFormSubmit = useCallback(ev => onSubmit(ev, { cityCode, checkInDate, checkOutDate }), [onSubmit])

  return (
    <form className='form-row' role='search' onSubmit={onFormSubmit}>
      <div className='form-group col-md-2'>
        <label htmlFor={`cityCode-${htmlId}`} className='sr-only'>City/Airport Code</label>
        <input
          value={cityCode}
          onChange={onCityCodeChange}
          id={`cityCode-${htmlId}`}
          type='text'
          name='cityCode'
          className='form-control'
          placeholder='XYZ'
          maxLength='3'
          pattern='[A-Za-z]{3}'
          title='City/Airport Code (XYZ)'
          required
        />
      </div>
      <div className='form-group col-md-4'>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <label htmlFor={`checkInDate-${htmlId}`} className='input-group-text'>
              From
            </label>
          </div>
          <input
            value={checkInDate}
            onChange={onCheckInDateChange}
            id={`checkInDate-${htmlId}`}
            type='text'
            name='checkInDate'
            className='form-control'
            placeholder='YYYY-MM-DD'
            maxLength='10'
            pattern='\d{4}-\d{2}-\d{2}'
            title='Check In Date (YYYY-MM-DD)'
          />
        </div>
      </div>
      <div className='form-group col-md-4'>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <label htmlFor={`checkOutDate-${htmlId}`} className='input-group-text'>
              To
            </label>
          </div>
          <input
            value={checkOutDate}
            onChange={onCheckOutDateChange}
            id={`checkOutDate-${htmlId}`}
            type='text'
            name='checkOutDate'
            className='form-control'
            placeholder='YYYY-MM-DD'
            maxLength='10'
            pattern='\d{4}-\d{2}-\d{2}'
            title='Check Out Date (YYYY-MM-DD)'
          />
        </div>
      </div>
      <div className='col-md-2 mb-3'>
        <button type='submit' className='btn btn-success btn-block'>Search</button>
      </div>
    </form>
  )
}

export default SearchForm
