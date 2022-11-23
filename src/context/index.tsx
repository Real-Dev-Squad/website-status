import { createContext, ReactNode, useContext, FC, useState } from 'react'
import { useRouter } from 'next/router';

interface Props {
    children?: ReactNode;
}

export type ContextType = {
    state: { isEditMode: boolean };
    actions: { onEditRoute: () => void }
}
const AppContext = createContext<ContextType | null>(null)

const AppWrapperContext: FC<Props> = ({ children }) => {
    const router = useRouter()
    const { query } = router;
    const { edit: editQuery } = query;
    const isEditMode = editQuery === 'true';
    const onEditRoute = () => {
        router.push({ query: 'edit=true' }, undefined, { shallow: true }); 
    }
    return (
        <AppContext.Provider value={{
            state: {
                isEditMode
            },
            actions: {
                onEditRoute
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
    return context || {}
}
export default AppWrapperContext