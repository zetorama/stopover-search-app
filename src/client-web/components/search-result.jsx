import React from 'react'
import Note from './note'
import HotelOffers from './hotel-offers'

export const EmptyResult = () => (<Note ctx='warning' title='Cannot find any offers'>
  <p>Please, try to adjust your search criteria.</p>
</Note>)

export const SearchResult = ({ offers }) => Array.isArray(offers) && offers.length
  ? <HotelOffers offers={offers} />
  : <EmptyResult />

export default SearchResult
