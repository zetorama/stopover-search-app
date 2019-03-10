import { fetchOffers } from '../services/hotels'


export const changeSearch = (key, value) => ({
  type: 'search-change',
  payload: { [key]: value },
})

export const submitSearch = ({ cityCode, checkInDate, checkOutDate }) => ({
  type: 'search-submit',
  payload: { cityCode, checkInDate, checkOutDate },
})

export const loadOffers = () => ({
  type: 'offers-load',
})

export const failOffers = (errors) => ({
  type: 'offers-fail',
  payload: errors,
})

export const succeedOffers = (offers) => ({
  type: 'offers-succeed',
  payload: offers,
})

export const searchOffers = (filter) =>
  async function(dispatch) {
    await dispatch(loadOffers())
    try {
      const [offers] = await fetchOffers(filter)
      dispatch(succeedOffers(offers))
    } catch (err) {
      dispatch(failOffers(err.errors))
    }
  }
