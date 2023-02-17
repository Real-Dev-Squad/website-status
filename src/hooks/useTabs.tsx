import React, { useReducer } from 'react';


const ACTION_TYPES = { toggle_Tab: 'toggle_Tab' }

function tabReducer(openTabs: number[], action: { current_index: number, type: string }) {
  switch (action.type) {
    case ACTION_TYPES.toggle_Tab: {
      const closing = openTabs.includes(action.current_index);
      return closing
        ? openTabs.filter((i: number) => i !== action.current_index)
        : [...openTabs, action.current_index]
    }
    default: {
      throw new Error(`Unhandled type in tabReducer: ${action.type}`)
    }
  }
}

function preventCloseReducer(openTabs: number[], action: { current_index: number, type: string }) {
  if (action.type === ACTION_TYPES.toggle_Tab) {
    const closing = openTabs.includes(action.current_index)
    const isLast = openTabs.length < 2
    if (closing && isLast) {
      return openTabs
    }
  }
}

function singleReducer(openTabs: number[], action: { current_index: number, type: string }) {
  if (action.type === ACTION_TYPES.toggle_Tab) {
    const closing = openTabs.includes(action.current_index)
    if (!closing) {
      return [action.current_index]
    }
  }
}

function combineReducers(...reducers: any) {
  return (state: number[], action: { current_index: number, type: string }) => {
    for (const reducer of reducers) {
      const result = reducer(state, action)
      if (result) return result
    }
  }
}

function useTab({ reducer = tabReducer } = {}) {
  const [openTabs, dispatch] = useReducer(reducer, [0])
  const toggleTab = (current_index: number) =>
    dispatch({ type: ACTION_TYPES.toggle_Tab, current_index })
  return { openTabs, toggleTab }
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