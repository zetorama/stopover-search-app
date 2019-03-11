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
    let abortToken = null
    if (state.searchSubmitted) {
      abortToken = new AbortController()
      actions.searchOffers(state.searchSubmitted, { signal: abortToken.signal })
    }
    return () => {
      if (abortToken) abortToken.abort()
    }
  }, [state.searchSubmitted])

  return (
    <>
      <SearchForm
        {...state.search}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
      <Content {...state} />
    </>
  )
}

export const Content = ({ loadingCounter, offers, offersErrors }) =>
  loadingCounter
    ? <Spiner />
    : offersErrors
      ? <Error errors={offersErrors} />
      : offers
        ? <SearchResult offers={offers} />
        : <Welcome />


export default SearchCtrl
