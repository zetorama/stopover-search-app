import React from 'react'
import { render } from 'react-dom'

const App = () => <h1>The cheapest stopover</h1>

const rootEl = document.getElementById('app')

render(<App />, rootEl)

if (module.hot) {
  module.hot.accept()
}
