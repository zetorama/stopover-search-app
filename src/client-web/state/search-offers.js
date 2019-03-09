
export const initState = (initial = {}) => ({
  search: {},
  searchSubmitted: null,

  offers: null,
  offersErrors: null,
  isOffersLoading: false,

  ...initial,
})

export const reducer = (state, { type, payload = {} }) => {
  console.debug('%cDISPATCHED', 'color: grey', type, payload)

  switch (type) {
    case 'search-change':
      return {
        ...state,
        search: { ...state.search, ...payload },
      }
    case 'search-submit':
      return {
        ...state,
        searchSubmitted: { ...state.search, ...payload },
      }
    case 'offers-load':
      return {
        ...state,
        isOffersLoading: true,
      }
    case 'offers-fail':
      return {
        ...state,
        offersErrors: payload,
        isOffersLoading: false,
        offers: null,
      }
    case 'offers-done':
      return {
        ...state,
        offers: payload,
        isOffersLoading: false,
        offersErrors: null,
      }
    case 'reset':
      return initState(payload)
    default:
      throw new Error(`Unknown action "${type}"`)
  }
}

export default initState
