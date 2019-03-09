import React from 'react'
import Note from './note'
import HotelOffers from './hotel-offers'
import Spiner from './spiner'

export const ErrorResult = ({ errors }) => (
  <Note ctx='danger' title='Oops! Some error happened…'>
    {errors.map(({ code, title, details }, id) => (
      <p key={id} title={details}>
        {code > 0 ? <b>{code}:</b> : ''}
        {' '}
        {title}
      </p>
    ))}
  </Note>
)

export const EmptyResult = () => (
  <Note ctx='warning' title='Cannot find any offers'>
    <p>Please, try to adjust your search criteria.</p>
  </Note>
)

export const SearchResult = ({ isLoading, errors, offers }) => {
  if (isLoading) {
    return <Spiner />
  }

  if (errors) {
    return <ErrorResult errors={errors} />
  }

  return Array.isArray(offers) && offers.length
    ? <HotelOffers offers={offers} />
    : <EmptyResult />
}

export default SearchResult
