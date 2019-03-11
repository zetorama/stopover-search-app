import { fetchTopOffers } from '../services/hotels'

export const changeSearch = (key, value) => ({
  type: 'search-change',
  payload: { [key]: value },
})

export const submitSearch = ({ cityCode, checkInDate, checkOutDate }) => ({
  type: 'search-submit',
  payload: { cityCode, checkInDate, checkOutDate },
})

export const markLoadingOffers = () => ({
  type: 'offers-loading-mark',
})

export const dropLoadingOffers = () => ({
  type: 'offers-loading-drop',
})

export const failOffers = (errors) => ({
  type: 'offers-fail',
  payload: errors,
})

export const succeedOffers = (offers) => ({
  type: 'offers-succeed',
  payload: offers,
})

export const searchOffers = (filter, params) =>
  async function(dispatch) {
    await dispatch(markLoadingOffers())
    try {
      const [offers] = await fetchTopOffers(filter, params)
      dispatch(succeedOffers(offers))
    } catch (err) {
      if (err.name !== 'AbortError') {
        dispatch(failOffers(err.errors))
      }
    } finally {
      await dispatch(dropLoadingOffers())
    }
  }
