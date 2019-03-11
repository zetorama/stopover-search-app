import React, { Fragment } from 'react'

export const Contact = ({ phone } = {}) => (
  <>
    {'☎️'}{phone ? (phone[0] === '+' ? '' : '+') + phone.replace(/\//g, '-') : 'n/a'}
  </>
)

export const Address = ({ lines, cityName, countryCode, postalCode }) => (
  <>
    {'🏨'}{lines.map((line, key) => (<Fragment key={key}>{line}<br /></Fragment>))}
    {cityName} ({countryCode}) {postalCode}
  </>
)

export const RoomType = ({ category, beds, bedType }) => (
  <>
    {category}
    {beds > 0 && (
      <>
        {' '}
        <br className='d-lg-none' />
        {beds + ' ' + bedType + ' bed' + (beds > 1 ? 's' : '')}
      </>
    )}
  </>
)

export const Room = ({ totalPrice, currency, roomType }) => (
  <>
    {totalPrice && (
      <>
        <span className='badge badge-success'>
          {currency}{' '}
          {totalPrice}
        </span>
        {' '}
      </>
    )}
    <RoomType {...roomType} />
  </>
)

export const Hotel = ({ name, address, contact, offers, isAvailable }) => (
  <div className='card'>
    <div className='card-header'>
      <span title={isAvailable ? 'Available' : 'Not available'}>
        {isAvailable ? '✅' : '⛔️'}
      </span>
      <strong>{name}</strong>
  </div>
    <ul className='list-group list-group-flush'>
      {offers.map(offer => (
        <li className='list-group-item' key={offer.id}>
          <Room {...offer} />
        </li>
      ))}
      <li className='list-group-item' title='Contact information'>
        <Contact {...contact} />
      </li>
      <li className='list-group-item' title='Address'>
        <Address {...address} />
      </li>
    </ul>
  </div>
)

export const HotelOffers = ({ offers }) => (
  <div className='card-group mb-3'>
    {offers.map(hotel => <Hotel {...hotel} key={hotel.id} />)}
  </div>
)

// NOTE: add 'prop-types' pkg or better switch to TS
HotelOffers.propTypes = {
  offers: (props, name) => {
    if (!Array.isArray(props[name]) || !props[name].length) {
      return new Error('Property `offers` must be a filled array')
    }
  }
}

export default HotelOffers
