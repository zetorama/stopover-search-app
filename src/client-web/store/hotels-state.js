
export const initState = (initial = {}) => ({
  search: {},
  searchSubmitted: null,

  offers: null,
  offersErrors: null,
  loadingCounter: 0,

  ...initial,
})

export const reducer = (state, { type, payload = {} }) => {
  // console.debug('%cDISPATCHED', 'color: grey', type, payload)

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
    case 'offers-loading-mark':
      return {
        ...state,
        loadingCounter: state.loadingCounter + 1,
      }
    case 'offers-loading-drop':
      return !state.loadingCounter ? state : {
        ...state,
        loadingCounter: state.loadingCounter - 1,
      }
    case 'offers-fail':
      return {
        ...state,
        offersErrors: payload,
        offers: null,
      }
    case 'offers-succeed':
      return {
        ...state,
        offers: payload,
        offersErrors: null,
      }
    case 'reset':
      return initState(payload)
    default:
      throw new Error(`Unknown action "${type}"`)
  }
}

export default initState
