import { useReducer, useCallback } from 'react'

export const wrapDispatch = (dispatch) => async (action) => {
  return typeof action === 'function'
  ? action(dispatch)
  : dispatch(await action)
}

export function useThunkReducer(reducer, initialArg, init) {
  const [state, _dispatch] = useReducer(reducer, initialArg, init)

  const dispatch = useCallback(wrapDispatch(_dispatch), [_dispatch])
  return [state, dispatch]
}

export default useThunkReducer
