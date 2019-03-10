import React, { useEffect, useCallback } from 'react'
import Spiner from '../components/spiner'
import Welcome from '../components/welcome'
import Error from '../components/error'
import SearchForm from '../components/search-form'
import SearchResult from '../components/search-result'

import { useThunkReducer } from '../utils/useThunkReducer'
import { useActionsCreator } from '../utils/useActionsCreator'
import { initState, reducer } from '../store/hotels-state'
import { changeSearch, submitSearch, searchOffers } from '../store/hotels-actions'

export const SearchCtrl = () => {
  const [state, dispatch] = useThunkReducer(reducer, undefined, initState)
  const actions = useActionsCreator(dispatch, { changeSearch, submitSearch, searchOffers })

  const onSearchChange = useCallback(
    (_ev, key, value) => actions.changeSearch(key, value),
    [actions.changeSearch],
  )
  const onSearchSubmit = useCallback(
    (ev, filter) => (ev.preventDefault(), actions.submitSearch(filter)),
    [actions.submitSearch],
  )

  useEffect(() => {
    if (state.searchSubmitted) {
      actions.searchOffers(state.searchSubmitted)
    }
    // TODO: cancel request
    // return () => actions.cancelSearch()
  }, [state.searchSubmitted])

  window.sss = state
  window.ddd = dispatch

  return (
    <>
      <SearchForm
        {...state.search}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
      <Results {...state} />
    </>
  )
}

export const Results = ({ isOffersLoading, offers, offersErrors }) => isOffersLoading
  ? <Spiner />
  : offersErrors
    ? <Error errors={offersErrors} />
    : offers
      ? <SearchResult offers={offers} />
      : <Welcome />


export default SearchCtrl
