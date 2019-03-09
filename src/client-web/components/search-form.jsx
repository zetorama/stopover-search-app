import React from 'react'

let id = Math.random()

export const SearchForm = ({ cityCode, onSearch, htmlId = ++id }) => (
  <form className='form-row' role='search' onSubmit={onSearch}>
    <div className='form-group col-md-2'>
      <label htmlFor={`cityCode-${htmlId}`} className='sr-only'>City/Airport Code</label>
      <input
        defaultValue={cityCode}
        id={`cityCode-${htmlId}`}
        type='text'
        name='cityCode'
        className='form-control'
        placeholder='JFK'
        pattern='[A-Za-z]{3}'
        title='City/Airport Code'
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
          defaultValue={new Date().toISOString().split('T')[0]}
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

export default SearchForm
