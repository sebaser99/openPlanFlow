import { createContext } from 'react';

interface ContextProps {
     sidemenuOpen : boolean;
     isAddingEntry: boolean;
     isDraggingEntry: boolean;
     openSideMenu: () => void; 
     closeSideMenu: () => void;
     setAddingEntry: (payload: boolean) => void;
     setDraggingEntry: (isDragging: boolean) => void;
     


}

export const UIContext = createContext({} as ContextProps)