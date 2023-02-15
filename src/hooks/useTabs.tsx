import React, { useReducer } from 'react';


const actionTypes = { toggle_index: 'toggle_index' }

function tabReducer(openIndices: number[], action: { index: number, type: string }) {
  switch (action.type) {
    case actionTypes.toggle_index: {
      const closing = openIndices.includes(action.index);
      return closing
        ? openIndices.filter((i: number) => i !== action.index)
        : [...openIndices, action.index]
    }
    default: {
      throw new Error(`Unhandled type in tabReducer: ${action.type}`)
    }
  }
}

function preventCloseReducer(openIndices: number[], action: { index: number, type: string }) {
  if (action.type === actionTypes.toggle_index) {
    const closing = openIndices.includes(action.index)
    const isLast = openIndices.length < 2
    if (closing && isLast) {
      return openIndices
    }
  }
}

function singleReducer(openIndices: number[], action: { index: number, type: string }) {
  if (action.type === actionTypes.toggle_index) {
    const closing = openIndices.includes(action.index)
    if (!closing) {
      return [action.index]
    }
  }
}

function combineReducers(...reducers: any) {
  return (state: number[], action: { index: number, type: string }) => {
    console.log(`${state} state , ${action} action`)
    for (const reducer of reducers) {
      const result = reducer(state, action)
      if (result) return result
    }
  }
}

function useTab({ reducer = tabReducer } = {}) {
  const [openIndices, dispatch] = useReducer(reducer, [0])
  const toggleIndex = (index: number) =>
    dispatch({ type: actionTypes.toggle_index, index })
  return { openIndices, toggleIndex }
}

export function useTabs({ reducer = () => { } } = {}) {
  return useTab({
    reducer: combineReducers(
      reducer,
      preventCloseReducer,
      singleReducer,
      tabReducer,
    ),
  })
}