import React from 'react'
import './page-layout.css'

export const PageLayout = ({ children }) => (
  <div className='page-outer'>
    <main className='container page'>
      {children}
    </main>
  </div>
)

export default PageLayout
