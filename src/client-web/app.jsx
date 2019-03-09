import React from 'react'
import Page from './components/page-layout'
import Header from './components/page-header'
import SearchCtrl from './controllers/search-ctrl'

// import Demo from './components/__demo__'
// export const App = () => <Demo />
export const App = () => (
  <Page>
    <Header />
    <SearchCtrl />
  </Page>
)

export default App
