import React from 'react'

const actionTypes = {toggle_index: 'toggle_index'}

function accordionReducer(openIndices:[], action) {
  switch (action.type) {
    case actionTypes.toggle_index: {
      const closing = openIndices.includes(action.index);
      return closing
        ? openIndices.filter((i) => i !== action.index)
        : [...openIndices, action.index]
    }
    default: {
      throw new Error(`Unhandled type in accordionReducer: ${action.type}`)
    }
  }
}

function useAccordion({reducer = accordionReducer} = {}) {
  const [openIndices, dispatch] = React.useReducer(reducer, [0])
  const toggleIndex = (index) =>
    dispatch({type: actionTypes.toggle_index, index})
  return {openIndices, toggleIndex}
}

function combineReducers(...reducers) {
  return (state, action) => {
    for (const reducer of reducers) {
      const result = reducer(state, action)
      if (result) return result
    }
  }
}
function preventCloseReducer(openIndices, action) {
  if (action.type === actionTypes.toggle_index) {
    const closing = openIndices.includes(action.index)
    const isLast = openIndices.length < 2
    if (closing && isLast) {
      return openIndices
    }
  }
}

function singleReducer(openIndices, action) {
  if (action.type === actionTypes.toggle_index) {
    const closing = openIndices.includes(action.index)
    if (!closing) {
      return [action.index]
    }
  }
}
export function useTabs({reducer = () => {}} = {}) {
  return useAccordion({
    reducer: combineReducers(
      reducer,
      preventCloseReducer,
      singleReducer,
      accordionReducer,
    ),
  })
}