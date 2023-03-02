import { Entry } from '@/interfaces';
import { EntriesState } from '.';

type EntriesActionType = 
 | {type: '[Entries] new_entry', payload: Entry}
 | {type: '[Entries] update_entry', payload: Entry}


export const entriesReducer = (state: EntriesState, action: EntriesActionType):EntriesState => {
  switch(action.type){
   case '[Entries] new_entry':
     return {
       ...state,
       entries: [...state.entries, action.payload]
     }
  case '[Entries] update_entry':
  return {
    ...state,
    entries: state.entries.map(entry =>{
      if(entry._id === action.payload._id){
        entry.status = action.payload.status
        entry.description = action.payload.description
      }
      return entry
    })
  }
   default:
   return state
  }
}