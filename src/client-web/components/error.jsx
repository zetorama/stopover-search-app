import React from 'react'
import Note from './note'

export const Error = ({ errors }) => (
  <Note ctx='danger' title='Oops! Some error occured…'>
    {errors.map(({ code, title, details }, id) => (
      <p key={id} title={details}>
        {code > 0 ? <b>[{code}]</b> : ''}
        {' '}
        {title}
      </p>
    ))}
  </Note>
)

export default Error
