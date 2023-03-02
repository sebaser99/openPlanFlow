import { UIState } from ".";

type UIActionType = 
| {type: 'UI - Open Sidebar'}
| {type: 'UI - Close Sidebar'}
| {type: 'UI - Set Adding Entry', payload: boolean}
| {type: 'UI - Set Dragging Entry', payload: boolean}



export const UIReducer = (state: UIState, action: UIActionType): UIState => {
    switch(action.type){
        case 'UI - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false
            }
        case "UI - Set Adding Entry":
            return {
                ...state,
                isAddingEntry: action.payload
            }
        case "UI - Set Dragging Entry":
        return {
            ...state,
            isDraggingEntry: action.payload
        }
        default:
            return state;
    }
}