import { useCallback } from 'react'

export const useActionsCreator = (dispatch, actions) =>
  Object.keys(actions).reduce((all, key) => {
    const cb = typeof actions[key] === 'function'
      ? (...args) => dispatch(actions[key](...args))
      : () => dispatch(actions[key])

    return Object.assign(all, { [key]: useCallback(cb, [dispatch]) })
  }, {})

export default useActionsCreator
