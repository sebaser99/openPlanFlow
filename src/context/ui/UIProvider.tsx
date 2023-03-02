import { FC, useReducer } from 'react';
import { UIContext, UIReducer } from '.';


export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingEntry: boolean;
}


interface Props {
    children: JSX.Element;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false, 
    isAddingEntry: false,
    isDraggingEntry: false
}



export const UIProvider: FC<Props> = ({children})=>{
    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)
    const openSideMenu = ()=> {
        dispatch({type: 'UI - Open Sidebar'})
    }
    const closeSideMenu = ()=> {
        dispatch({type: 'UI - Close Sidebar'})
    }
    const setAddingEntry = (isAdding : boolean)=> {
        dispatch({type: 'UI - Set Adding Entry', payload: isAdding})
    }
    const setDraggingEntry = (isDragging : boolean)=> {
        dispatch({type: 'UI - Set Dragging Entry', payload: isDragging})
    }
    return (
    <UIContext.Provider value={{
        ...state,

        //Methods
        openSideMenu,
        closeSideMenu,
       setAddingEntry,
       setDraggingEntry
    }}>
        {children}
    </UIContext.Provider>)}