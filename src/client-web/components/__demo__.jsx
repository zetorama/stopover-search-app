import React from 'react'
import Page from './page-layout'
import Header from './page-header'
import Spiner from './spiner'
import SearchForm from './search-form'
import SearchResult from './search-result'
import Welcome from './welcome'
import Note from './note'
import Error from './error'

import offers from '../../__mock__/hotel-offers.json'

export const Demo = () => (
  <Page>
    <Header />
    <hr />
    <SearchForm />
    <hr />
    <Welcome />
    <hr />
    <Spiner />
    <hr />
    <SearchResult />
    <hr />
    <SearchResult offers={offers} />
    <hr />
    <Error errors={[{code: '007', title: 'Mission aborted, James'}]} />
    <hr />
    <Note ctx='success'>That's all folks!</Note>
  </Page>
)

export default Demo
