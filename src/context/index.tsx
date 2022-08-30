import { createContext, ReactNode, useContext, FC, useState } from 'react'
import { useRouter } from 'next/router';

interface Props {
    children?: ReactNode;
}

export type ContextType = {
    state: { toggleEditButton: boolean };
    actions: { handleToggleButton: () => void }
}
const AppContext = createContext<ContextType | null>(null)

const AppWrapperContext: FC<Props> = ({ children }) => {
    const router = useRouter()
    const [toggleEditButton, setToggleEditButton] = useState(false);
    const handleToggleButton = () => {
        setToggleEditButton(prev => {
            const updatedState = !prev;
            if (updatedState) {
                router.replace('/?edit=true')
            } else {
                router.replace('/')
            }
            return updatedState
        })
    }
    return (
        <AppContext.Provider value={{
            state: {
                toggleEditButton
            },
            actions: {
                handleToggleButton
            }
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext) as ContextType
    if (context===undefined) {
        throw new Error('useAppContext must be used within a CountProvider')
    }
    return context
}
export default AppWrapperContext
