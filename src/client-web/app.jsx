import React from 'react'
import Page from './components/page-layout'
import Header from './components/page-header'
import Spiner from './components/spiner'
import SearchForm from './components/search-form'
import SearchResult from './components/search-result'
import Welcome from './components/Welcome'

import offers from './__mock__/hotel-offers.json'

export const App = () => (
  <Page>
    <Header />
    <SearchForm />
    <Welcome />
    <Spiner />
    <SearchResult />
    <SearchResult offers={offers} />
  </Page>
)

export default App
