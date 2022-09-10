import { createContext, ReactNode, useContext, FC, useState } from 'react'

interface Props {
  children?: ReactNode;
}

export type ContextType = {
  state: { isAltKeyPressed: boolean };
  actions: { setIsAltKeyPressed: (type: boolean) => void }
}
const KeyboardContext = createContext<ContextType | null>(null)

const KeyboardWrapperContext: FC<Props> = ({ children }) => {
  const [isAltKeyPressed, setIsAltKeyPressed] = useState(false)

  return (
    <KeyboardContext.Provider value={{
      state: {
        isAltKeyPressed
      },
      actions: {
        setIsAltKeyPressed
      }
    }}>
      {children}
    </KeyboardContext.Provider>
  )
}

export const useKeyboardContext = () => {
  const context = useContext(KeyboardContext) as ContextType
  if (context === undefined) {
    throw new Error('useAppContext must be used within a CountProvider')
  }
  return context || {}
}
export default KeyboardWrapperContext
