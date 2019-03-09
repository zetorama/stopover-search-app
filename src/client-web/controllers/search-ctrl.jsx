import React, { useReducer, useCallback } from 'react'
import Welcome from '../components/Welcome'
import SearchForm from '../components/search-form'
import SearchResult from '../components/search-result'

import { initState, reducer } from '../state/search-offers'

export const SearchCtrl = () => {
  const [state, dispatch] = useReducer(reducer, undefined, initState)

  const onSearchChange = useCallback((_ev, key, value) => dispatch({
    type: 'search-change',
    payload: { [key]: value },
  }), [dispatch])

  const onSearchSubmit = useCallback((ev, payload) => {
    ev.preventDefault()
    dispatch({ type: 'search-submit', payload })
    // TODO: fetch offers
  }, [dispatch])

  return (
    <>
      <SearchForm
        {...state.search}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
      {!state.searchSubmitted
        ? <Welcome />
        : <SearchResult
            isLoading={state.isOffersLoading}
            errors={state.offersErrors}
            offers={state.offers}
          />
      }
    </>
  )
}

export default SearchCtrl
