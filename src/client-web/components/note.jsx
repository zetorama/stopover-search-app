import React from 'react'

export const Note = ({ ctx = 'light', title, children }) => (
  <div className={`alert alert-${ctx}`} role='note'>
    {title && (
      <h4 className='alert-heading'>{title}</h4>
    )}
    {children}
  </div>
)

export default Note
