import { useReducer, useCallback } from 'react'

export const wrapDispatch = (origDispatch) => async function dispatch(action) {
  console.debug('%cDISPATCHING', 'color:grey', action.type ? [action.type, action.payload] : action)

  return typeof action === 'function'
    ? action(dispatch)
    : origDispatch(await action)
}

export function useThunkReducer(reducer, initialArg, init) {
  const [state, origDispatch] = useReducer(reducer, initialArg, init)

  const dispatch = useCallback(wrapDispatch(origDispatch), [origDispatch])
  return [state, dispatch]
}

export default useThunkReducer
